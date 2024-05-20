const express= require('express');
const {mercadoLibre} = require('./services/MercadoLibre');
const { olimpica } = require('./services/olimpica');
const {alkosto} = require('./services/alkosto');
const { falabella } = require('./services/falabella');

const app=express();

//Archivos publicos
app.use(express.static('public'));

app.get('/',(req,res)=>{
    // renderizar un archivo html
    res.sendFile(__dirname+'/views/index.html');
});

app.get('/mercadoLibre',async(req,res)=>{
    const data=await mercadoLibre("Samsung S23");

    res.json(data);
});

app.get('/olimpica',async(req,res)=>{
    const data=await olimpica("Samsung S23");

    res.json(data);
});

app.get('/alkosto',async(req,res)=>{
    const data=await alkosto("Samsung S23");

    res.json(data);
});

app.get('/falabella',async(req,res)=>{
    const data=await falabella("Samsung S23");

    res.json(data);
});

// app.get('/mercadoLibre',async(req,res)=>{
//     const data=await mercadoLibre("Samsung S23");

//     res.json(data);
// });

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});