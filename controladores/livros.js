const {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  modificaLivro,
  apagaLivro,
} = require("../servicos/livros");

function getLivros(req, res) {
  try {
    const livros = getTodosLivros();
    res.send(livros);
  } catch (error) {
    res.status(500).send(`Erro ao buscar livros: ${error.message}`);
  }
}

function getLivro(req, res) {
  try {
    const id = req.params.id;
    if (id && Number(id)) {
      const livros = getLivroPorId(id);
      res.send(livros);
    } else {
      res.status(422).send("ID inválido");
    }
  } catch (error) {
    res.status(500).send(`Erro ao buscar livro: ${error.message}`);
  }
}

function postLivro(req, res) {
  try {
    const livroNovo = req.body;
    if (livroNovo.nome) {
      insereLivro(livroNovo);
      res.status(201).send("Livro criado com sucesso");
    } else {
      res.status(422).send("O campo nome é obrigatório");
    }
  } catch (error) {
    res.status(500).send(`Erro ao criar livro: ${error.message}`);
  }
}

function patchLivro(req, res) {
  try {
    const id = req.params.id;
    if (id && Number(id)) {
      const body = req.body;
      if (body.nome) {
        modificaLivro(id, body);
        res.send("Livro alterado com sucesso");
      } else {
        res.status(422).send("O campo nome é obrigatório");
      }
    } else {
      res.status(422).send("ID inválido");
    }
  } catch (error) {
    res.status(500).send(`Erro ao alterar livro: ${error.message}`);
  }
}

function deleteLivro(req, res) {
  try {
    const id = req.params.id;
    if (id && Number(id)) {
      apagaLivro(id);
      res.send("Livro deletado com sucesso");
    } else {
      res.status(422).send("ID inválido");
    }
  } catch (error) {
    res.status(500).send(`Erro ao deletar livro: ${error.message}`);
  }
}

module.exports = {
  getLivro,
  getLivros,
  postLivro,
  patchLivro,
  deleteLivro,
};
