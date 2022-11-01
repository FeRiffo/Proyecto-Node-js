module.exports={
    getOne:(datos,id)=>{
        for (let i = 0; i < datos.length; i++) {
            if(id===datos[i].id){
                return datos[i];
            }
           
            
        }
        return undefined;
    },

    update:(datos,id,newData)=>{
        for (let i = 0; i < datos.length; i++) {
           if(datos[i].id==id){
            datos[i]=newData
           }
            
        }
        return datos;
        
    },

    delete:(datos,id)=>{
        let newData = datos.filter(h=>h.id!=id);
       return newData
    }
    
}