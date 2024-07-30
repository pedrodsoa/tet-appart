 const express = require("express");
 const app = express();
 const porta = 3000;
 const mysql = require("mysql2");
 const cors = require("cors");

  app.use(express.json());
  app.use(express.static("public"));
  app.use(cors());

const db = {
   host: '54.173.126.116',
   port: 3306,
   user: '00000000000',
   password: '00000000000',
   database: '00000000000',
 }

  const execSQLQuery = (sqlQry, id, res) => {

 const con = mysql.createConnection(db);
  con.query(sqlQry, id, (error, results, fields) =>{
   if(error)
     res.json(error);
    else
      res.status(200).json(results);
    
    })
  }


 app.get('/usuarios', (req, res) =>{
    const id = [];
   execSQLQuery("Select * from usuario", id, res)
 })

  app.post('/usuarios', (req, res) =>{
    const id = [req.body.nome, req.body.email ,req.body.senha];

    execSQLQuery("INSERT INTO usuario VALUES(null, ?, ?, ?)",id ,res)
  })

  app.post('/login', async (req, res) =>{
    const id = req.body.email;
    const sqlQry= "Select * from usuario where usu_email = ?;";
    const [result] =await resultSQLQuery(sqlQry, id);
      console.log(result)
    if(result != undefined){
      const senha = result.usu_senha;
      console.log(senha)
      console.log(req.body.senha)
      
      if(req.body.senha == senha)
      res.json({"mensagem":"logado", "id":result.usu_id});
    else 
      res.json({"mensagem":"Senha incorreta"});
    } else 
      res.json({"mensagem":"Usuario inexistente"});
          
  })


 app.get('/usuarios/:id', (req, res) =>{
    const id = [req.params.id];
   execSQLQuery("Select * from usuario WHERE usu_id = ?", id, res)
 })

  app.delete('/usuarios/:id', async(req, res) =>{
    const id = [req.params.id];
    const sqlQry = "DELETE from usuario where usu_id = ?;";
    const result = await resultSQLQuery(sqlQry, id);
  
    if(result.affectedRows == 1){
      return res.json({"mensagem":"deletado!"})
    } else {
      return res.json({"mensagem":"nao deletado"});
    }
    console.log(result);

  })

app.put('/usuarios/:id', async(req, res) =>{
    const id = [req.body.nome, req.body.email, req.body.senha, req.params.id]; 
    const sqlQry = "UPDATE usuario set usu_nome = ?, usu_email = ?, usu_senha = ? where usu_id = ?";
    const result = await resultSQLQuery(sqlQry, id);
     
    if(result.affectedRows == 1){
      return res.json({"mensagem":"atualizado!"})
    } else {
      return res.json({"mensagem":"nao atualizado"});
    }
  })

 app.listen(porta, () =>{ 
    console.log(`Escutando porta: ${porta}`);  
 });

async function resultSQLQuery(sqlQry, id){
  const con = await mysql.createConnection(db);
  let [result] = await con.promise().query(sqlQry, id);
  try{
    return result;
  } catch(err){
    console.log(err);
    throw err;
  }


}