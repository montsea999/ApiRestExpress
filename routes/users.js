var express = require('express');
var router = express.Router();
var users_controller = require('../controllers/usersController');
// GET users listing -> GET desde el navegador en 3000/users  y funcionando okk
router.get('/', users_controller.users_list);
/* DELETE user.BORRADO DE USUARIO CONCRETO*/ 
router.delete('/:id', users_controller.users_delete_one); 

module.exports = router; 

// VALIDACIONES
const { check } = require('express-validator'); 
//check([field, message]) 
const valid_user = [
check('nombre', 'Formato de Nombre no válido. Debe tener más de 3 dígitos y ser una cadena de texto')     
    .isLength({ min: 3 })     
    .isString(), 
check('telefono', 'Formato de Telefono no válido. No has insertado un número de telefono movil')     
    .isMobilePhone(), 
check('apellido', 'Formato de Apellido no válido. Debe tener más de 3 dígitos y ser una cadena de texto')     
    .isLength({ min: 3 })     
    .isAlpha(),
check('cumpleaños', 'Formato de Fecha de nacimiento no válida. Formato válido YYYY-MM-DD')     
    .isISO8601(),
//check('sexo', 'Formato para sexo no válido. Debes seleccionar una cadena de texto')
  // .isString(),
check('colorFavorito', 'Formato no válido. Debe tener más de 3 dígitos y no puede contener números')     
    .isLength({ min: 3 })     
    .isAlpha(), 
check('dni', 'Formato no válido. Debe tener  9 dígitos alfanuméricos')     
    .isLength({ min: 9, max: 9})     
    .isAlphanumeric(), 
check('edad', 'Formato no válido. Debe ser un número entre 0 y 125')     
   .isNumeric({ min: 0, max: 125}),   
];
//VALIDACIONES CUSTOMIZADAS
[check('sexo').custom((value,{req})=>{
                if(isNaN(value)){
                    return true;
                }else{
                    throw new Error( 'Formato para sexo no válido. Debe ser una cadena de texto seleccionada de las opciones: mujer, hombre, otro, no especificado')
                }
 })]
 /*[check('cumpleaños').custom((value,{req})=>{
    if(isISO8601(value)){
        return true;
    }else{
        throw new Error( 'Formato de Fecha de nacimiento no válida. Formato válido YYYY-MM-DD')
    }
})]
*/
// POST create user CREAR/ INSERTAR UN NUEVO USUARIO->DESDE POSTMAN POST A 3000/users 
router.post('/', valid_user, users_controller.users_create);
/* PUT update user. ACTUALIZACION DEL USUARIO CONCRETO*/ 
//Cambio ObjectId en lugar de id!!!
router.put('/:ObjectId', valid_user, users_controller.users_update_one); 
