var express = require('express');
var router = express.Router();
const hotelController=require('../controllers/hotelControllers') 

/* GET users listing. */
router.get('/', hotelController.list); //read
router.get('/add', hotelController.add);
router.post('/add', hotelController.addPost);//create
router.get('/edit/:id', hotelController.edit);
router.put('/edit', hotelController.editPost);//Update
router.delete('/delete', hotelController.delete); //delete

module.exports = router;
 