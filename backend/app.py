from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import requests
import csv
import sqlite3


app = Flask(__name__)
CORS(app)

# Configura o banco de dados SQLite
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Cria uma instância do SQLAlchemy
db = SQLAlchemy(app)


# Salva os dados dos usuários em um arquivo CSV, Pode excluir essa rota caso não queira o arquivo csv.
@app.route("/save_users")
def save_users():
    response = requests.get("https://fakestoreapi.com/users")
    if response.status_code == 200:
        data = response.json()
        with open("users.csv", "w") as f:
            writer = csv.writer(f)
            writer.writerow(
                [
                    "id",
                    "username",
                    "email",
                    "address",
                    "phone",
                ]
            )
            for user in data:
                writer.writerow(
                    [
                        user["id"],
                        user["username"],
                        user["email"],
                        user["address"]["street"],
                        user["phone"],
                    ]
                )
        conn = sqlite3.connect("users.db")
        cur = conn.cursor()
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                username TEXT,
                email TEXT,
                address TEXT,
                phone TEXT,
                cpf_cnpj INTEGER,
                date_birth TEXT
            )
            """
        )
        # Inserir os dados dos usuários na tabela usando uma lista de tuplas
        users = [
            (
                user["id"],
                user["username"],
                user["email"],
                user["address"]["street"],
                user["phone"],
                user["cpf_cnpj"],
                user["date_birth"],
            )
            for user in data
        ]
        cur.executemany("INSERT INTO users VALUES (?,?,?,?,?,?,?)", users)
        conn.commit()
        conn.close()
        return "Os usuários foram salvos em users.csv e users.db"
    else:
        return f"Erro ao obter os usuários: {response.status_code}"


# Cria um novo usuário
@app.route("/users", methods=["POST"])
def create_user():
    user_data = request.get_json()
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO users (username, email, address, phone, cpf_cnpj, date_birth) VALUES (?, ?, ?, ?, ?, ?)",
        (
            user_data["username"],
            user_data["email"],
            user_data["address"],
            user_data["phone"],
            user_data["cpf_cnpj"],
            user_data["date_birth"],
        ),
    )
    conn.commit()
    user_id = cur.lastrowid
    conn.close()
    return jsonify({"id": user_id}), 201


# Retorna todos os usuários
@app.route("/users", methods=["GET"])
def get_users():
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute("SELECT * FROM users")
    users = cur.fetchall()
    conn.close()

    # Converter a lista de tuplas em uma lista de dicionários
    users_dict = [
        dict(zip(("id", "username", "email", "address", "phone", "cpf_cnpj", "date_birth"), user)) for user in users
    ]

    return jsonify(users_dict)


# Retorna um usuário específico
@app.route("/users/<int:id>")
def get_user_by_id(id):
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute("SELECT * FROM users WHERE id = ?", (id,))
    user = cur.fetchone()
    conn.close()
    user_dict = dict(zip(("id", "username", "email", "address", "phone", "cpf_cnpj", "date_birth"), user))

    return jsonify(user_dict)


# Atualiza um usuário existente
@app.route("/users/<int:id>", methods=["PUT"])
def update_user(id):
    user_data = request.get_json()
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute(
        "UPDATE users SET username=?, email=?, address=?, phone=?, cpf_cnpj=?, date_birth=? WHERE id=?",
        (
            user_data["username"],
            user_data["email"],
            user_data["address"],
            user_data["phone"],
            user_data["cpf_cnpj"],
            user_data["date_birth"],
            id,
        ),
    )
    conn.commit()
    conn.close()
    return "", 204


# Deleta um usuário existente
@app.route("/users/<int:id>", methods=["DELETE"])
def delete_user(id):
    conn = sqlite3.connect("users.db")
    cur = conn.cursor()
    cur.execute("DELETE FROM users WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return "", 204


# Inicia a aplicação Flask na porta 5000
if __name__ == "__main__":
    app.run(debug=True, port=5000)
