# FinAPI

API desenvolvida para aprender sobre Express e os conceitos de uma API no curso Ignite da Rocketseat

## Visão Geral:

A FinAPI tem como objetivo fornecer operações relacionadas a uma conta bancária onde você pode criar sua conta, editá-la, e manipular seu saldo e extrato por meio de requisições http!

## Requisitos funcionais

- Deve ser possível criar uma conta
- Deve ser possível buscar o extrato bancário do cliente
- Deve ser possível realizar um depósito
- Deve ser possível realizar um saque
- Deve ser possível buscar o extrato bancário do cliente por data
- Deve ser possível atualizar os dados do cliente na conta
- Deve ser possível obter dados do cliente
- Deve ser possível deletar uma conta

## Requisitos não funcionais

- Deve ser utilizado Nodejs
- Deve ser utilizado o framework Express
- Deve ser seguido o padrão REST na API

## Regras de negócio

- Não deve ser possível cadastrar uma conta com CPF já existente
- Não deve ser possível fazer depósito em uma conta não existente
- Não deve ser possível buscar o extrato em uma conta não existente
- Não deve ser possível fazer saque em uma conta não existente
- Não deve ser possível excluir uma conta não existente
- Não deve ser possível fazer saque quando o saldo for insuficiente
- Não deve ser possível cadastrar uma conta com CPF já existente

## Instalação 📦

Você precisa ter o git em sua máquina para poder clonar esse repositório.

Faça o clone, depois dentro do diretório raiz do projeto execute o comando no terminal:
`yarn` ou `npm install`

## Execução em ambiente de desenvolvimento ⚙️

Você precisa ter o node em sua máquina na versão 14 (14.0.0 >) para poder executar esse projeto localmente.

Para rodar o projeto execute o comando no terminal:
`yarn dev` ou `npm run dev`

Após isso a API estará funcionando na porta 3333 do seu computador, acesse por:
_http://localhost:3333_

### Bom código! 🔥
