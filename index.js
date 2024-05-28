const dotenv = require('dotenv');
dotenv.config();
const express= require('express');
const morgan = require('morgan');
const cors= require('cors');
const {mercadoLibre} = require('./services/MercadoLibre');
const { olimpica } = require('./services/olimpica');
const {alkosto} = require('./services/alkosto');
const { falabella } = require('./services/falabella');
const { exito } = require('./services/exito');

const app=express();

app.set('port',process.env.PORT || 3000)

app.use(cors());
app.use(morgan('dev'));

//Archivos publicos
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/views/index.html');
});

app.get("/products/:product",async(req,res)=>{
    const product=req.params.product;
    const [pExito,pAlkosto,pOlimpica,pMercado,pFalabella]=await Promise.all([exito(product),alkosto(product),olimpica(product),mercadoLibre(product),falabella(product)]);
    const products=[...pExito,...pAlkosto,...pOlimpica,...pMercado,...pFalabella];
    res.json(products);
});

app.get('/mercadoLibre/:product',async(req,res)=>{
    const data=await mercadoLibre(req.params.product);

    res.json(data);
});

app.get('/olimpica/:product',async(req,res)=>{
    const data=await olimpica(req.params.product);

    res.json(data);
});

app.get('/exito/:product',async(req,res)=>{
    const data=await exito(req.params.product);

    res.json(data);
});

app.get('/alkosto/:product',async(req,res)=>{
    const data=await alkosto(req.params.product);

    res.json(data);
});

app.get('/falabella/:product',async(req,res)=>{
    const data=await falabella(req.params.product);

    res.json(data);
});

app.listen(app.get('port'),()=>{
    console.log(`Server is running on port ${app.get('port')}`);
});