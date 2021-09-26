const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
//Database
connection
      .authenticate()
      .then(() => {
         console.log("Conexion OK from BD MySql")
      })
      .catch((msgErro) => {
         console.log(msgErro);
      })

// está dizendo para o Express como usar o EJS como View Engine
app.set('view engine','ejs');
app.use(express.static('public')); //aplicação aceita arquivos estaticos

//Body Parser
app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());

//Rotas
app.get("/", (req, res) => {
   Pergunta.findAll({ raw: true }).then(perguntas => {//SELECT * ALL FROM perguntas
      res.render("index", {
         perguntas: perguntas
      });
   });
});

app.get("/perguntar", (req, res) => {
   res.render("perguntar");
});

app.post("/salvarpergunta", (req,res) => {

   var titulo = req.body.titulo;
   var descricao = req.body.descricao;

   Pergunta.create({
      titulo: titulo,
      descricao: descricao
   }).then(() => {
      res.redirect("/");
   });
});

app.listen(3000, () => {console.log("Serves in Running!");});
