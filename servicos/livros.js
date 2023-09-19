const { json } = require("express");
const fs = require("fs");
const ARQUIVO_LIVROS = "livros.json";

function getTodosLivros() {
  return JSON.parse(fs.readFileSync(ARQUIVO_LIVROS));
}

function getLivroPorId(id) {
  const livros = getTodosLivros();
  return livros.filter((livro) => livro.id === id)[0];
}

function insereLivro(livro) {
  const livros = getTodosLivros();
  fs.writeFileSync(ARQUIVO_LIVROS, JSON.stringify([...livros, livro]));
}

function modificaLivro(id, modificacoes) {
  let livros = getTodosLivros();
  const indiceModificado = livros.findIndex((livro) => livro.id === id);

  const conteudoModificado = { ...livros[indiceModificado], ...modificacoes };

  livros[indiceModificado] = conteudoModificado;
  fs.writeFileSync(ARQUIVO_LIVROS, JSON.stringify(livros));
}

function apagaLivro(id) {
  let livros = getTodosLivros();
  const livrosFiltrados = livros.filter((livro) => livro.id !== id);
  fs.writeFileSync(ARQUIVO_LIVROS, JSON.stringify(livrosFiltrados));
}

module.exports = {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  modificaLivro,
  apagaLivro,
};
