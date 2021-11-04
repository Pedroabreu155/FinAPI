const express = require('express');
const { v4: uuidV4 } = require('uuid');

const app = express();
app.use(express.json());

const customers = [];

app.get('/', (_, response) => {
  return response.json({ message: 'Hello World' });
});

app.post('/account', (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return response.status(400).json({ error: 'Customer already exists!' });
  }

  customers.push({
    id: uuidV4(),
    cpf,
    name,
    statement: [],
  });

  return response.status(201).send();
});

app.get('/statement/:cpf', (request, response) => {
  const { cpf } = request.params;

  const customer = customers.find((customer) => customer.cpf === cpf);

  return response.json({
    statement: customer.statement,
  });
});

app.listen(3333, () => console.log('Server is running! 🔥'));
