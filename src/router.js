import helpers from './helpers.js';
import { parseXML, safeJSON } from './utils.js';

const contentTypeHandlers = {
  'text/plain': (text) => text,
  'text/html': (text) => text,
  'application/json': (json) => safeJSON(json, {}),
  'application/x-www-form-urlencoded': (data) =>
    Object.fromEntries(new URLSearchParams(data)),
  'application/xml': (data) => parseXML(data, {}),
};

class Router {
  constructor() {
    this.routes = new Map();
    this.get = this.add.bind(this, 'GET');
    this.post = this.add.bind(this, 'POST');
    this.patch = this.add.bind(this, 'PATCH');
    this.delete = this.add.bind(this, 'DELETE');
    this.options = this.add.bind(this, 'OPTIONS');
  }

  add(method, pathname, handler) {
    const prevRouteData = this.routes.get(pathname);
    this.routes.set(pathname, {
      ...prevRouteData,
      [method]: handler,
    });

    return this;
  }

  #getPathname(req) {
    const { pathname } = new URL(req.url || '/', `https://${req.headers.host}`);
    return pathname;
  }

  async #getRawRequestData(req) {
    let rawRequest = '';

    for await (const chunk of req) {
      rawRequest += chunk;
    }

    return rawRequest;
  }

  async #getProcessedRequestData(req) {
    let payload = {};

    if (req.headers['content-type']) {
      const contentType = req.headers['content-type'].split(';').shift();

      if (contentTypeHandlers[contentType]) {
        const rawRequestData = await this.#getRawRequestData(req);
        payload = contentTypeHandlers[contentType](rawRequestData);
      }
    }

    return payload;
  }

  async handle(req, res) {
    const pathname = this.#getPathname(req);
    const route = this.routes.get(pathname);
    const handler = route?.[req?.method];

    if (!handler) {
      this.handleNoMatch(req, res);
      return;
    }

    try {
      const payload = await this.#getProcessedRequestData(req);
      await handler(req, Object.assign(res, helpers), {
        pathname,
        payload,
      });
    } catch (err) {
      res.statusCode = 500;
      res.end(
        process.env.NODE_ENV !== 'production' ? err : '500 - Internal error'
      );
    }
  }

  handleNoMatch(req, res) {
    res.writeHead(404);
    res.end('404 - Not Found');
  }
}

export default Router;
