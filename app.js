var express=require('express');
var mysql=require('mysql');

var app=express();
app.use(express.json());

//establecemos los parametros de conexion
var conexion=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'db_articulos',
});

//probando conexion 
conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('conecion la la base de datos exitosa');
    }
});


//Ruta de inicio
app.get('/',(req,res)=>{
    res.send('Ruta INICIO');
});

//Ruta select Articulos
app.get('/api/articulos',(req,res)=>{
    conexion.query('SELECT * FROM tb_articulos',(error,query)=>{
        if (error){
            throw error;
        }else{
            res.send(query);
        }
    })
});
// Ruta para mostrar un articulo
// PARECE LO MISMO PERO NO FUNCIONA CON ESTE CAMBIAMOS POR EL DEL INGE. 
app.get('/api/articulo/:id', (req,res)=>{
    conexion.query('SELECT * FROM tb_articulos WHERE id = ?', [req.params.id],(error, query)=>{
        if(error){
            throw error;
        } else{
            res.send(query[0].descripcion); //el error era en punto en descripcion yo puse coma
        }
    })
}); 
//CODIGO DEL INGE funciona
/* app.get('/api/articulo/:id', (req, res) => {
    conexion.query('SELECT * FROM tb_articulos WHERE id = ?', [req.params.id], (error, query) => {
        if (error) {
            throw error;
        } else {
            //res.send(query);
            res.send(query[0].descripcion);
        }
    })
}); */

// Insertar un nuevo articulo
app.post('/api/articulos',(req,res)=>{
    let descripcion= req.body.descripcion;
    let precio= req.body.precio;
    let cantidad=req.body.cantidad;

    let sql ="INSERT INTO tb_articulos (`descripcion`, `precio`, `cantidad`) VALUES(?,?,?);";
    conexion.query(sql, [descripcion, precio, cantidad],function(error, results){
        if (error){
            throw error;
        }else{
            res.send(results);
        }
    });
});

//Editar articulo
app.put('/api/articulo/:id',(req,res)=>{
    let id=req.params.id;
    let descripcion= req.body.descripcion;
    let precio= req.body.precio;
    let cantidad=req.body.cantidad;

    let sql="UPDATE tb_articulos SET descripcion= ?, precio = ?, cantidad =? WHERE id = ?";
    conexion.query(sql, [descripcion, precio, cantidad,id],function(error, results){
        if (error){
            throw error;
        }else{
            res.send(results);
        }
    });
});
//Eliminar registro
app.delete('/api/articulo/:id',(req,res)=>{
    let sql="DELETE FROM tb_articulos   WHERE id = ?";
    conexion.query(sql, [req.params.id],function(error, results){
        if (error){
            throw error;
        }else{
            res.send(results);
        }
    });
});
app.listen('3000',function(){
    console.log('servidor corriendo');
});


//averiguar delete, 







