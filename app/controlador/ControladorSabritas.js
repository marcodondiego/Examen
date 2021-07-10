const ModeloSabritas = require('../modelo/ModeloSabritas');

function index(req,res){
    console.log('ok');
    ModeloSabritas.find({})
    .then(Sabritas => {
        if(Sabritas.length) return res.status(200).send({Sabritas})
        return res.status(204).send({Message:'No hay contenido'})
    }) .catch(error => res.status(500).send({error}));
    
    
    
}

function agregar(req,res){
    new ModeloSabritas(req.body).save()
    .then(Sabritas => {
        res.status(200).send({Sabritas})
    }) .catch(error => res.status(500).send({error}));
}
function buscar(req,res,next){
    let consulta ={};
    consulta[req.params.key]=req.params.value;
    ModeloSabritas.find(consulta).then(Sabritas =>{
        if(!Sabritas.length) return next();
        req.body.Sabritas= Sabritas;
        return next(); 
        
    }) .catch(error => {
        req.body.error=error;
        next();
    })
}

function mostrar(req,res) {
    
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.Sabritas) return res.status(404).send({message:'No hay informacion'});
    let SabritasObj = req.body.Sabritas;
    return res.status(200).send({SabritasObj});
}
function actualizar(req,res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.Sabritas) return res.status(404).send({message:'No hay datos para actualizar'});
    let Sabritasob = req.body.Sabritas[0];  //modifica al primero que encuentra
    Sabritasob = Object.assign(Sabritasob,req.body);
    Sabritasob.save().then(Altadesabritas =>{
        res.status(200).send({message:'Los datos se actualizaron correctamente', Altadesabritas})
    }).catch(error => res.status(500).send({error}));
}
function eliminar(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.Sabritas) return res.status(404).send({message:'No hay datos para actualizar'});
    req.body.Sabritas[0].remove().then(EliminaSab =>{
        res.status(200).send({message:'La informacion se elimino correctamente',EliminaSab})
    }).catch(error => res.status(500).send({error}));
}

module.exports={
    index,
    agregar,
    buscar,
    mostrar,
    actualizar,
    eliminar
}