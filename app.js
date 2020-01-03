var express = require('express'); // Express.js
var path = require('path'); // tratamiento de rutas de ficheros
var cookieParser = require('cookie-parser'); // módulo para cookies
var logger = require('morgan'); //módulo para log de las peticiones http

var app = express(); //se crea la aplicación, se inicializan los modulos
//una vez inicializada, definir las acciones al recibir peticiones

//GET A LA RAIZ... MENSAJE
app.get('/', function(req, res) {
        res.send('Bienvenido a la página principal de MontserratApi con Express. Se deberá indicar la ruta http://localhost:3000/users para peticiones GET');
    })
    //*** GET en ruta /users
app.get('/ruta', (request, response) => {
    response.send('hola de respuesta desde ruta');
});
//***POST EN PAGINA PRINCIPAL localhost3000
app.post('/', function(request, response) {
    response.send('hola de respuesta en peticion POST a página principal');
});
/*const port = 3000;
app.listen(port, () => {
    console.log('a la escucha en http://localhost:' + port);
});
*/
app.use(logger('dev')); //se config. CONSOLA el mod. para generar un log de las peticiones recibidas por el servidor y verlas en la consola
app.use(express.json()); //MIDDLEWARE para traducir peticiones json
app.use(express.urlencoded({ extended: false })); //middleware para decodificar contenido de los parámetros que vengan codificados en las peticiones
app.use(cookieParser()); //Inicializamos el módulo para facilitar el tratamiento de cookies
// en app también se declara el uso de módulos de rutas = se definen las rutas de la aplicación
var indexRouter = require('./routes/index'); // se incluye el fichero index en la variable
var usersRouter = require('./routes/users'); // se incluye el fichero users en la variable
app.use('/', indexRouter); //con la ejecucion de la funcion use se configura la ejecucion del router para las rutas que se especifican como primer parámetro y se incluye el fichero index en la aplicación
app.use('/users', usersRouter); //y se incluye el fichero users en la aplicación
var personasRoutes = require('./routes/personasRoutes');
app.use(express.static(path.join(__dirname, 'public'))); //desde app se configura con esta instruccion para que se sirva contenido estático de la carpeta public
// para acceder a CSS predefinida url http://localhost:3000/stylesheets/style.css

module.exports = app;
console.log('MontserratApiRestful con Express funcionaa :)');
//el middleware para control de errores tiene que ir el ultimo despues de todas las llamadas a app.use que se hagan
// https://expressjs.com/es/resources/middleware.html para consultar middleware

// con la propiedad response.headersSent, en el caso de que las cabeceras ya hayan sido enviadas, será necesario delegar el error en el capturador por defecto llamando a la función next 
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
}
//se incluirán las reglas de validación en el fichero de rutas y las comprobaciones en el controlador