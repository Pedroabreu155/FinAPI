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

  const id = uuidV4();

  customers.push({
    id,
    cpf,
    name,
    statement: [],
  });

  return response.status(201).send();
});

app.listen(3333, () => console.log('Server is running! 🔥'));
