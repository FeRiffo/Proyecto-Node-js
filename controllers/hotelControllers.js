const path =require ('path')
const fs =require ('fs')
const json_data=fs.readFileSync('./db/hoteles.json', 'utf-8');
let db= JSON.parse(json_data); //para convertirla en string
const formidable = require('formidable')
const form = formidable({uploadDir: path.join(__dirname,'../db')})
const modeloDatos=require('../module/modeloDatos');
const controllers={
    
    list:function(req, res, next) {
        res.render('hoteles',{title:"Hoteles",data:db});
      },
      add:(req,res)=>{
        res.render('addHotel')
      },
      
      addPost:(req,res)=>{
      form.parse(req,(err,fields,files)=>{
        if(err){
          next(err);
          return;
        }
        if(fields&& files.archivo.size !=0){
          let ext =path.extname(files.archivo.originalFilename);
          fs.renameSync(files.archivo.filepath,
            path.join(__dirname,`../public/images/${fields.title}-${files.archivo.newFilename}${ext.toLowerCase()}`));
            let servicios =[]
            if(fields.cancha){servicios=[...servicios,fields.cancha]}
            if(fields.playa){servicios=[...servicios,fields.playa]}
            if(fields.pileta){servicios=[...servicios,fields.pileta]}
            if(fields.wifi){servicios=[...servicios,fields.wifi]}
            if(fields.spa){servicios=[...servicios,fields.spa]}
            let src=`${fields.title}-${files.archivo.newFilename}${ext.toLowerCase()}`;
            let datos={
              nombre:fields.nombre,
              email:fields.email,
              ubicacion:fields.ubicacion,
              info:fields.info,
              servicios:servicios,
              title:fields.title,
              id:Date.now().toString(),
              src:src,
            }

            db =[...db,datos];
            let newData = JSON.stringify(db);
            fs.writeFileSync('./db/hoteles.json',newData,'utf-8')
          res.redirect('/hoteles')
          
        }else{
          res.redirect('/hoteles')
        }
      })
      },
      
      edit:(req,res)=>{
        let id=req.params.id;
        let hotel = modeloDatos.getOne(db,id);

        res.render('editHotel',{hotel:hotel})
      },
      editPost:(req,res)=>{
        let datos = req.body;
        let servicios=[];
        if(datos.cancha){servicios=[...servicios,datos.cancha]}
        if(datos.playa){servicios=[...servicios,datos.playa]}
        if(datos.pileta){servicios=[...servicios,datos.pileta]}
        if(datos.wifi){servicios=[...servicios,datos.wifi]}
        if(datos.spa){servicios=[...servicios,datos.spa]}
        let misDatos={
          nombre:datos.nombre,
          email:datos.email,
          ubicacion:datos.ubicacion,
          info:datos.info,
          servicios:datos.servicios,
          title:datos.title,
          src:datos.src,
          id:datos.id,
          servicios:servicios,
        }

        
        
        db =modeloDatos.update(db,req.body.id,misDatos)
        let newData = JSON.stringify(db);
        fs.writeFileSync('./db/hoteles.json',newData,'utf-8')
        res.redirect('/hoteles')
      },
      
      delete:(req,res)=>{
      let id=req.body.id;
      let imgDelete =modeloDatos.getOne(db,id);
      let archivo = imgDelete.src;
      if(fs.existsSync('public/images/'+archivo)){
        fs.unlinkSync('public/images/'+archivo)
      };
      let info =modeloDatos.delete(db,id);
      let newData = JSON.stringify(info);
      fs.writeFileSync('./db/hoteles.json',newData,'utf-8')

      res.redirect('/hoteles/delete')
      },
      deleteDirect:(req,res)=>{
        res.render('avisos')
      },

      all:(req,res)=>{
        res.status(200).json(db);
    


      }

}
module.exports=controllers