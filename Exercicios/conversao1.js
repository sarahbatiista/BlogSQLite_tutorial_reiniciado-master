let prompt = require("prompt-sync");
prompt = prompt();

let preco = parseFloat(prompt("Qual o preço do produto?: ")); // Solicita ao usuário o preço do produto e converte para float
let desconto = parseFloat(prompt("Qual o valor do desconto?: ")); // Solicita o valor do desconto e converte para float

function calcularDesconto(preco, desconto) {
  const resultado = preco - (preco * desconto) / 100; // Calcula o valor do produto com o desconto aplicado
  console.log("O valor com desconto é: ", resultado); // Exibe o resultado no console
}

calcularDesconto(preco, desconto); // Chama a função passando os valores de preco e desconto
