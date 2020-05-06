const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors()); 

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on("connection", socket => {
   socket.on('connectionRoom', box => {
      socket.join(box);
   })
});

mongoose.connect('mongodb+srv://nodeapi:nodeapi@cluster0-cobzm.mongodb.net/product?retryWrites=true&w=majority',
 {
    useUnifiedTopology: true,
    useNewUrlParser: true,
 }
);

app.use((req,res, next) => {
   req.io = io;

   return next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

//server.listen(process.env.PORT || 3001);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`);
});