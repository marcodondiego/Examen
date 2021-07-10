const express = require('express');
const RutaSabritas = require('./rutas/RutaSabritas');

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/Sabritas',RutaSabritas);

module.exports = app;