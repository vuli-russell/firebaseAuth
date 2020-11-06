let admin = require("firebase-admin");
let express = require("express");
let cors = require("cors");
let dotenv = require("dotenv");
let bodyParser = require("body-parser")

dotenv.config()

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_AUTH_CONFIG)),
  databaseURL: process.env.DATABASE_URL
});

const app = express();
app.use(cors());
app.use(bodyParser.json())

app.get("/users",(request,response) => {
  try{
    admin.auth().listUsers()
    .then((r) => {
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(r));
    })
    .catch(e => {console.log(e);response.end(`there was a booboo`)})

  }
  catch{
    response.end(`there was a booboo`)
  }
})

app.put("/password",(request,response) => {
  const uid = request.body.uid;
  const newPassword = request.body.newPassword

  try{
    admin.auth().updateUser(uid,{password : newPassword})
    .then((r) => {response.end(`${r.email} pw changed`)})
    .catch(e => {console.log(e);response.end(`there was a booboo`)})
  }
  catch{
    response.end(`there was a booboo`)
  }
}) 

app.listen(process.env.PORT || 8080)
