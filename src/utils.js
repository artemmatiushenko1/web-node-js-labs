import { XMLParser, XMLValidator } from 'fast-xml-parser';

export const safeJSON = (content, fallback) => {
  try {
    return JSON.parse(content);
  } catch {
    return fallback;
  }
};

export const parseXML = (content, fallback) => {
  try {
    const result = XMLValidator.validate(content);
    if (typeof result === 'boolean' && result) {
      return new XMLParser({ ignoreDeclaration: true }).parse(content);
    } else {
      throw new Error();
    }
  } catch {
    return fallback;
  }
};
