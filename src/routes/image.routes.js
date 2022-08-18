const express = require('express');
const router = express.Router();
//const { Router } = require('express');  otra forma de requerir un modulo
//const router = new Router();      

const path = require('path');

router.get('/', (req, res) => {         // desde donde se hace la peticion , en este caso es http://localhost
    res.render('../views/index.ejs');
});

router.get('/login', (req,res) => {
    res.render('../views/login.ejs');
});

router.get('*', (req, res) => {     // * debe estar al final, porque la comparacion es secuencial.
    res.send("Esta pagina no existe.");
});

//UPLOAD V3- using general middleware
router.post('/images/upload', (req, res) => {      // esta ruta tiene que coincidir con el atributo action del formulario que tiene el metodo POST
    res.render('../views/resultado.ejs'); // para visualizar una pagina 
    console.log('imagen subida');
    //res.send('uploaded');   // respuesta al subir una imagen, se redirecciona a la ruta localhost/images/upload
});

module.exports = router;