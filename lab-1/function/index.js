'use strict';

module.exports = async (context) => {
  context.log('JavaScript HTTP trigger function processed a request.');

  const data = {
    name: 'Artem',
    group: 'IP-04',
  };

  context.res = {
    status: 200,
    body: data,
  };
};
