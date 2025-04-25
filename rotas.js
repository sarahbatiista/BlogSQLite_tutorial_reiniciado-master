const express = require("express");

const PORT = 8000; //Porta TCP do servidor HTTP da aplicação

const app = express();

const index = "<a href='/sobre'>Sobre</a><a href='/info'>Info</a>";

const home = "Você está na página Home<br><a href='/'>Voltar</a>";

const sobre = "Você está na página Sobre<br><a href='/'>Voltar</a>";

const info = "Você está na página Info<br><a href='/'>Voltar</a>";

/*Método express.get necessita de dois parâmetros
Na ARROW FUNCTION, o primeiro são os dados do servidor (REQUISITION - 'req')
o segundo são os dados que serão enviados ao cliente (RESULT - 'res') */
app.get("/", (req, res) => {
  res.send(index);
});

app.get("/sobre", (req, res) => {
  res.send(sobre);
});

app.get("/info", (req, res) => {
  res.send(info);
});

//app.listen() deve ser o último comando da aplicação (app.js)
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta  ${PORT}!`);
});
