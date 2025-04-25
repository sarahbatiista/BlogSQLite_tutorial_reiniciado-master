const express = require("express"); // importa lib do Express
const sqlite3 = require("sqlite3"); // Importa lib do sqlite3
const bodyParser = require("body-parser"); // Importa o body-parser

const PORT = 9000; // Porta TCP do servidor HTTP da aplicação

//Variáveis usadas no EJS (padrão)
let config = { titulo: "", rodape: "" };

const app = express(); // Instância para uso do Express

// Cria conexão com obanco de dados
const db = new sqlite3.Database("user.db"); // Instância para uso do Sqlite3, e usa o arquivo 'user.db'

db.serialize(() => {
  // Este método permite enviar comandos SQL em modo 'sequencial'
  db.run(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    username TEXT, password TEXT, email TEXT, celular TEXT, cpf TEXT, rg TEXT)`
  );
});

// __dirname é a variável interna do nodejs que guarda o caminho absoluto do projeto, no SO
// console.log(__dirname + "/static");

// Aqui será acrescentado uma rota "/static", para a pasta __dirname + "/static"
// O app.use é usado para acrescentar rotas novas para o Express gerenciar e pode usar
// Middleware para isto, que neste caso é o express.static, que gerencia rotas estáticas
app.use("/static", express.static(__dirname + "/static"));

// Middleware para processar as requisições do Body Parameters do cliente
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar EJS como o motor de visualização
app.set("view engine", "ejs");

const index =
  "<a href='/sobre'> Sobre </a><a href='/login'> Login </a><a href='/cadastro'> Cadastrar </a>";
const sobre = "sobre";
const login = 'Vc está na página "Login"<br><a href="/">Voltar</a>';
const cadastro = 'Vc está na página "Cadastro"<br><a href="/">Voltar</a>';

/* Método express.get necessita de dois parâmetros 
 Na ARROW FUNCTION, o primeiro são os dados do servidor (REQUISITION - 'req')
 o segundo, são os dados que serão enviados ao cliente (RESULT - 'res') */

app.get("/", (req, res) => {
  // Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:8000/
  // res.send(index);
  console.log("GET /index");

  config = { title: "Página inicial", rodape: "" };

  res.render("pages/index", config);
  // res.redirect("/cadastro"); // Redireciona para a ROTA cadastro
});

app.get("/usuarios", (req, res) => {
  const query = "SELECT * FROM users";
  db.all(query, (err, row) => {
    console.log(`GET /usuarios ${JSON.stringify(row)}`);
    // res.send("Lista de usuários");
    res.render("partials/usertable");
  });
});

// GET Cadastrooo
app.get("/cadastro", (req, res) => {
  console.log("GET /cadastro");
  // Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:8000/cadastro
  config = { title: "Você está na página cadastro", rodape: "" };
  res.render("pages/cadastro", config);
});

// POST do cadastro
app.post("/cadastro", (req, res) => {
  console.log("POST /cadastro");
  // Linha para depurar se esta vindo dados no req.body
  !req.body
    ? console.log(`Body vazio: ${req.body}`)
    : console.log(JSON.stringify(req.body));

  const { username, password, email, celular, cpf, rg } = req.body;
  // Colocar aqui as validações e inclusão no banco de dados do cadastro do usuário
  // 1. Validar dados do usuário
  // 2. saber se ele já existe no banco
  const query =
    "SELECT * FROM users WHERE email=? OR cpf=? OR rg=? OR username=?";
  db.get(query, [email, cpf, rg, username], (err, row) => {
    if (err) throw err;
    console.log(`LINHA RETORNADA do SELECT USER: ${JSON.stringify(row)}`);
    if (row) {
      // A variável 'row' irá retornar os dados do banco de dados,
      // executado através do SQL, variável query
      res.send("Usuário já cadastrado, refaça o cadastro");
    } else {
      // 3. Se usuário não existe no banco cadastrar
      const insertQuery =
        "INSERT INTO users (username, password, email, celular, cpf, rg) VALUES (?,?,?,?,?,?)";
      db.run(
        insertQuery,
        [username, password, email, celular, cpf, rg],
        (err) => {
          // Inserir a lógica do INSERT
          if (err) throw err;
          res.send("Usuário cadastrado, com sucesso");
        }
      );
    }
  });

  // res.send(
  //   `Bem-vindo usuário: ${req.body.username}, seu email é ${req.body.email}`
  // );
});

// Pregramação de rotas do método GET do HTTP 'app.get()'
app.get("/sobre", (req, res) => {
  console.log("GET /sobre");
  // Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:8000/sobre
  config = { title: "Saiba mais", rodape: "" };
  res.render("pages/sobre", config);
});

app.get("/login", (req, res) => {
  console.log("GET /login");
  // Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:8000/info
  config = { title: "Você está na página Login", rodape: "" };
  res.render("pages/login", config);
});

app.post("/login", (req, res) => {
  console.log("POST /login");
  res.send("Login ainda não implementado.");
});

app.get("/dashboard", (req, res) => {
  console.log("GET /dashboard");
  // Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:8000/info
  config = { title: "Você está na página Dashboard" };
  res.render("pages/dashboard", config);
});

// app.listen() deve ser o último comando da aplicação (app.js)
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta ${PORT}!`);
});
