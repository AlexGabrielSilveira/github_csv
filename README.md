## 1️⃣ Clone o projeto 

```bash
git clone https://github.com/AlexGabrielSilveira/github_csv.git
cd github_csv
```

## 2️⃣ Defina as variáveis de ambiente de acordo com o .env.example

## 3️⃣ Suba a aplicação
```bash
docker-compose build
docker-compose up
```

## 4️⃣ Acesse a aplicação
* Frontend: http://localhost:3001

* Backend API: http://localhost:3000

| Método | Rota                          | Descrição                        |
| ------ | ----------------------------- | -------------------------------- |
| GET    | `/api/github/:username/` | Busca um usuário |
| GET    | `/api/github/:username/repos` | Lista repositórios de um usuário |
| GET    | `/api/:username/export`                  | exporta os repositórios como CSV      |
| POST    | `/api/file/upload` | Salva os repositórios! |
