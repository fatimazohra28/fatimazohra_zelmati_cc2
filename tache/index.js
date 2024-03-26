const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());


const authRouter = require('./route');


app.use('/tache', authRouter);


app.get('/', (req, res) => {
  res.send("Hello world");
});


app.listen(port, (error)=> {
  if(!error)
    console.log(`Ecoute dans le port ${port}`);
  else
    console.log(`Erreur de lancement`);
});