var db = require('../db/db'); //hacer uso de la conexión con la base de datos para insertar y recuperar usuarios de la base de datos
//proceder a conectar con la base de datos. Si ya estuviera conectada, no volverá a crear otra conexión: 
// Conectar con la BD 
db.connect('mongodb://localhost:27017', function (err) {  
    if (err) {  
        throw ('Fallo en la conexión con la BD');  
    } 
}); 
var ObjectId = require('mongodb').ObjectId; //añadimos ObjectId para que no haya problemas..

//** USERS_LIST*** 
module.exports.users_list = function (req, res, next) {     
// Si el objeto es nulo es que no se ha establecido la conexión     
if (db.get() === null) {         
    next(new Error('La conexión no está establecida'));         
    return;     
}  
const filter = {id: ObjectId(req.body.id)};
const update = {$set: {nombre: req.body.nombre, telefono: req.body.telefono, apellido: req.body.apellido, edad: req.body.edad, dni: req.body.dni, cumpleaños: req.body.cumpleaños, colorFavorito: req.body.colorFavorito, sexo: req.body.sexo}};
// Recuperar datos de la base de datos en formato array 
db.get().db('apidb').collection('users').find().toArray(function 
    (err, result) {         
        // Si se produjo un error, enviar el error a la siguiente función
if(err) {
    next(new Error('Fallo en la conexión con la BD / fallo en el listado de usuarios') );
    return;
    } else {
        //si todo fue bien, devolver el resultado al cliente
        res.send(result);
       }
    });
};
//** USERS_CREATE***  
module.exports.users_create = function (req, res, next) {  
    const errors = validationResult(req);
if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
}   
    if (db.get() === null) {         
        next(new Error('La conexión no está establecida'));        
        return;     
    }     
    const user = {};     
    user.nombre = req.body.nombre; 
    user.telefono = req.body.telefono;   
    user.apellido = req.body.apellido; 
    user.edad = req.body.edad;
    user.dni = req.body.dni;
    user.cumpleaños = req.body.cumpleaños;
    user.colorFavorito = req.body.colorFavorito;
    user.sexo = req.body.sexo;    
    // Insertar un documento     
    db.get().db('apidb').collection('users').insertOne(user, function 
        (err, result) {         
            // Si se produjo un error, enviar el error a la siguiente función         
            if (err) {             
                next ( new Error('Fallo en la conexión con la BD, fallo en la inserción del usuario') );             
                return;         
            } else {             
                // Si todo fue bien, devolver el resultado al cliente             
                res.send(result);         
            }     
        }); 
    }; 
 // *****UPDATE USERS******
    module.exports.users_update_one = function (req, res, next) {  
        if (db.get() === null) {  
            next(new Error('La conexión no está establecida'));  
            return;  
        }  
        const filter = {id: req.body.id};  
        const update = {$set: {nombre: req.body.nombre, telefono: req.body.telefono, apellido: req.body.apellido, edad: req.body.edad, dni: req.body.dni, cumpleaños: req.body.cumpleaños, colorFavorito: req.body.colorFavorito, sexo: req.body.sexo}};  
// Insertar un documento  
     db.get().db('apidb').collection('users').updateOne(filter, update, 
        function (err, result) {  
// Si se produjo un error, enviar el error a la siguiente función  
if (err) {  
    next ( new Error('Fallo en la conexión con la BD') ); 
    return;  
} else {  
// Si todo fue bien, devolver el resultado al cliente  
res.send(result);  
     }  
   }); 
};
//******DELETE USERS***** 
module.exports.users_delete_one = function (req, res, next) {  
    if (db.get() === null) {  
        next(new Error('La conexión no está establecida'));  
        return;  
    }  
    const filter = {id: req.body.id};  
// Eliminar un documento  
db.get().db('apidb').collection('users').deleteOne(filter, function
     (err, result) {  
// Si se produjo un error, enviar el error a la siguiente función  
if (err) {
    next ( new Error('Fallo en la conexión con la BD') ); 
     return;  
    } else {  
// Si todo fue bien, devolver el resultado al cliente  
res.send(result);  
    }  
  }); 
}; 
const { validationResult } = require('express-validator');


