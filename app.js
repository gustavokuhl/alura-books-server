const express = require("express");
const rotaLivro = require("./rotas/livros");

const app = express();

app.use(express.json());
app.use(rotaLivro);

const port = 3000;

app.listen(port, () => {
  console.log(`Escutando a porta ${port}`);
});
