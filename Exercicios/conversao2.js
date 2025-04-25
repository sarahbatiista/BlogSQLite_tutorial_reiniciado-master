let prompt = require("prompt-sync");
prompt = prompt();

let celsius = parseFloat(prompt("Quantos graus celsius está agora?: ")); // Solicita a temperatura em Celsius e converte para float

const conversao = (celsius) => {
  // Define uma função de conversão de Celsius para Fahrenheit
  return (celsius * 9) / 5 + 32; // Fórmula para converter Celsius para Fahrenheit
};

console.log("O resultado da conversão é: ", conversao(celsius)); // Exibe o resultado da conversão no console
