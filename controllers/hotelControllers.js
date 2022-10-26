const path =require ('path')
const fs =require ('fs')
const json_data=fs.readFileSync('./db/hoteles.json', 'utf-8');
let db= JSON.parse(json_data); //para convertirla en string
const controllers={
    
    list:function(req, res, next) {
        res.render('hoteles',{title:"Hoteles",data:db});
      },
      add:(req,res)=>{
        res.render('addHotel')
      },
      
      addPost:(req,res)=>{
        res.send('addPost')
      },
      
      edit:(req,res)=>{
        res.send('Edit')
      },
      editPost:(req,res)=>{
        res.send('EditPost')
      },
      
      delete:(req,res)=>{
        res.send('Delete')
      }

}
module.exports=controllers