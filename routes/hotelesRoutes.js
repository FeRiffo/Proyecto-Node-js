var express = require('express');
var router = express.Router();
const hotelController=require('../controllers/hotelControllers') 

/* GET users listing. */
router.get('/', hotelController.list); //read
router.get('/add', hotelController.add);
router.post('/add', hotelController.addPost);//create
router.get('/edit/:id', hotelController.edit);
router.post('/edit', hotelController.editPost);//Update
router.post('/delete', hotelController.delete); //delete
router.get('/delete',hotelController.deleteDirect)

/*Api para React */
router.get('/hotelesAll',hotelController.all)


module.exports = router;
 