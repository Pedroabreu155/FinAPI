const express = require('express');
const { v4: uuidV4 } = require('uuid');

const app = express();
app.use(express.json());

const customers = [];

//Middleware

const verifyIfCPFAccountExists = (request, response, next) => {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ message: 'Customer not found!' });
  }

  request.customer = customer;

  return next();
};

const getBalance = (statement) => {
  const balance = statement.reduce((accumulator, operation) => {
    if (operation.type === 'credit') {
      return accumulator + operation.amount;
    } else {
      return accumulator - operation.amount;
    }
  }, 0);

  return balance;
};

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

app.get('/statement', verifyIfCPFAccountExists, (request, response) => {
  const { customer } = request;

  return response.json({
    statement: customer.statement,
  });
});

app.post('/deposit', verifyIfCPFAccountExists, (request, response) => {
  const { customer } = request;

  const { description, amount } = request.body;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit',
  };

  customer.statement.push(statementOperation);

  return response.status(201).json({ message: 'Operation succedded!' });
});

app.post('/withdraw', verifyIfCPFAccountExists, (request, response) => {
  const { amount } = request.body;

  const { customer } = request;

  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return response.status(400).json({ error: 'Insufficient funds!' });
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: 'debit',
  };

  customer.statement.push(statementOperation);

  return response.status(201).json({ message: 'Operation succedded!' });
});

app.get('/statement/:date', verifyIfCPFAccountExists, (request, response) => {
  const { customer } = request;

  const { date } = request.params;

  const formattedDate = new Date(date + ' 00:00');

  const statement = customer.statement.filter(
    (statement) =>
      statement.created_at.toDateString() ===
      new Date(formattedDate).toDateString()
  );

  return response.json({
    statement,
  });
});

app.listen(4000, () => console.log('Server is running! 🔥'));
