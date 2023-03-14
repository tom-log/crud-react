
# Projeto CRUD React(Frontend) + Flask(Backend)

Este projeto consiste em uma aplicação web que permite ao usuário visualizar usuários fictícios através da integração com a API https://fakestoreapi.com/. A aplicação é dividida em duas partes: o frontend, desenvolvido em React, e o backend, desenvolvido em Flask que faz integração com o React para criar, visualizar, atualizar e deletar usuários do banco de dados Sqlite3.

# Configuração do ambiente
Para executar a aplicação, é necessário ter o Node.js e o Python 3 instalados na sua máquina. É extremamente recomendável criar um ambiente virtual para instalar as dependências do Flask.

## Clonando o repositório

```bash
git clone git@github.com:weverton-sec/crud-react.git
```

```bash
cd crud-react/
cd backend/
python3 -m venv venv
source venv/bin/activate
pip install flask
pip install -r requirements.txt
export FLASK_APP=app.py
flask run

```
O backend irá iniciar um servidor local na porta 5000. (http://localhost:5000)

### Instalando e executando o React
Abra um novo terminal ou faça pelo vscode, siga os passos abaixo. (na janela do outro terminal estará rodando o backend na porta local: 5000)
```bash
cd front-end
npm install
npm start
```

O frontend irá iniciar um servidor local na porta 3000. (http://localhost:3000)
