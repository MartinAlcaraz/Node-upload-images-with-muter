const express = require('express');
const multer = require('multer');
const ejs = require('ejs');     // motor de plantillas

const path = require('path');
const uuid = require('uuid/v4');    // generador de ids


// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));  // las vistas de las paginas web estan en este directorio
app.set('view engine', 'ejs');      // el motor de las vistas(view engine) es 'ejs'



// configuracion de como guardar la imagen en variable
const diskStorage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),  // guarda las imagenes en la carpeta /uploads
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));  // se crea un id + la extension original del archivo
    }
});

// se guarda la configuracion en multer
app.use(multer({
    storage: diskStorage,
    dest: path.join(__dirname, 'public/uploads'), // guarda las imagenes en la carpeta /uploads . aparentemente hay que colocar el destino 2 veces

    fileFilter: function (req, file, cb) {      // para filtrar los archivos que se suben desde la pagina
        var filetypes = /jpeg|jpg|png|gif/;     // expresion regular
        var mimetype = filetypes.test(file.mimetype);   // comprueba el tipo de archivo
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // comprueba la extension del archivo

        if (mimetype && extname) {
            return cb(null, true);  // si esta todo bien retorna true y se guarda la imagen
        }else{
            cb("Error: File upload only supports the following filetypes - " + filetypes); // error del archivo subido
        }
    },
    limits: { fileSize: 5000000 },    // limite del tamaño del archivo 5Mb

}).single('input-image')); // guarda de a una la imagen que se ingresa en el input type=file name="input-image" del html


// next()   para seguir con la ejecucion del programa 
app.use((req, res, next)=>{
    console.log("ha pasado por next");
    next();
});

// Routes
app.use(require('./routes/image.routes.js'));

// Static files
app.use(express.static(path.join(__dirname, 'public'))); // indica la carpeta que es publica, que se puede acceder desde el navegador.

// Start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

