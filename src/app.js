import express from "express";
import db from "./config/dbConnect.js"
import livros from "./models/Livro.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, 'Erro de conexao'))
db.once("open", ()=>{
    console.log('conexao com o banco feita com sucesso')
})

const app = express();

app.use(express.json())

routes(app);

app.get('/livros/:id', (req, res)=>{
    let index = buscaLivro(req.params.id);
    res.status(200)
    res.json(livros[index]);
})

//! POST
app.post('/livros', (req,res)=>{
  livros.push(req.body);
  res.status(201).send('Livro foi cadastrado com sucesso')
})

//! PUT
app.put('/livros/:id', (req, res)=>{
    let index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200)
    res.json(livros);
})

//! DELETE
app.delete('/livros/:id', (req, res)=>{
    //atribuicao por desestruturacao
    let {id} = req.params;
    let index = buscaLivro(id);
    livros.splice(index, 1)
    res.status(200)
    res.send(`Livro ${id} removido com sucesso`);
})

function buscaLivro(id){
    return livros.findIndex(livro => livro.id == id)
}

export default app