export default async (context) => {
  context.log('JavaScript HTTP trigger function processed a request.');

  const data = {
    firstName: 'Artem',
    lastName: 'Matiushenko',
    group: 'IP-04',
    city: 'Kyiv',
  };

  context.res = {
    status: 200,
    body: data,
  };
};
