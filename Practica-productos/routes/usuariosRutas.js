const ruta = require("express").Router();
const axios = require("axios");
const Usuario = require("../class/UsuarioClase");
const Producto = require("../class/ProductoClase");
const UsuarioBD = require("../DB/UsuarioBD");
const ProductoBD = require("../DB/ProductoBD");

async function acceder(req,res,next){
    const ip= await axios.get("https://api.ipify.org/?format=json");
    console.log(ip.data.ip);
    var ipString=ip+"";
    console.log(ipString);
    if (ip=="200.188.14.2"){
        console.log("Hola");
        next();
    }else{
        console.log("No bienvenido");
        next();
    }
}

/* ----------------
    USUARIOS
-----------------*/

ruta.get("/ip",acceder, async(req,res)=>{//obtiene la ip del visitante
    try {
        console.log("Ya se ejecutó el middleware");
        res.end();
    } catch (error) {
        console.log(error);
    }
});

ruta.get("/",async (req, res)=>{
    try {
        const usuariobd=new UsuarioBD();
        const [usuariosBD]=await usuariobd.mostrarUsuarios();
        //console.log(usuariosBD);
        res.render("mostrarUsuarios",{usuariosBD});
    } catch (error) {
        console.log("Error al recuperar los usuarios "+ error);
    }
});

ruta.post("/agregarUsuario",(req,res)=>{
    var usuario1=new Usuario(req.body);
    //console.log(usuario1.obtenerDatos);
    if(usuario1.obtenerDatos.nombre == undefined || usuario1.obtenerDatos.celular == undefined || usuario1.obtenerDatos.correo == undefined){
        res.render("error");
    }else{
        const usuariobd = new UsuarioBD();
        usuariobd.crearUsuario(usuario1.obtenerDatos);
        res.redirect("/");
    }
});

ruta.get("/agregarUsuario",(req,res)=>{
    res.render("formulario");
});

ruta.get("/editarUsuario/:id",async(req,res)=>{
    const usuariobd = new UsuarioBD();
    const [[usuario]] = await usuariobd.buscarUsuarioPorId(req.params.id);
    //console.log(usuario);
    res.render("editarUsuario",usuario);
});

ruta.post("/editarUsuario",async(req,res)=>{
    const usuario1 = new Usuario(req.body);
    //console.log(usuario1);
    if(usuario1.obtenerDatos.nombre == undefined || usuario1.obtenerDatos.celular == undefined || usuario1.obtenerDatos.correo == undefined){
        res.render(error);
    }else{
        const usuariobd=new UsuarioBD();
        await usuariobd.actualizarUsuario(usuario1.obtenerDatos);
        res.redirect("/");
    }
});

ruta.get("/borrarUsuario/:id", async (req,res)=>{
    const usuariobd=new UsuarioBD();
    usuariobd.borrarUsuario(req.params.id);
    res.redirect("/");
});

/* ----------------
    PRODUCTOS
-----------------*/

ruta.get("/mostrarProductos",async (req, res)=>{
    try {
        const productobd=new ProductoBD();
        const [productosBD]=await productobd.mostrarProducto();
        //console.log(productosBD);
        res.render("mostrarProductos",{productosBD});
    } catch (error) {
        console.log("Error al recuperar los productos "+ error);
    }
});

ruta.post("/agregarProducto",(req,res)=>{
    var producto1=new Producto(req.body);
    //console.log(producto1.obtenerDatos);
    if(producto1.obtenerDatos.nombre == undefined || producto1.obtenerDatos.precio == undefined || producto1.obtenerDatos.stock == undefined){
        res.render("error");
    }else{
        const productobd = new ProductoBD();
        productobd.crearProducto(producto1.obtenerDatos);
        res.redirect("/mostrarProductos");
    }
});

ruta.get("/agregarProducto",(req,res)=>{
    res.render("formulariop");
});

ruta.get("/editarProducto/:id",async(req,res)=>{
    const productobd = new ProductoBD();
    const [[producto]] = await productobd.buscarProductoPorId(req.params.id);
    //console.log(producto);
    res.render("editarProducto",producto);
});

ruta.post("/editarProducto",async(req,res)=>{
    const producto1 = new Producto(req.body);
    //console.log(producto1);
    if(producto1.obtenerDatos.nombre == undefined || producto1.obtenerDatos.precio == undefined || producto1.obtenerDatos.stock == undefined){
        res.render(error);
    }else{
        const productobd=new ProductoBD();
        await productobd.actualizarProducto(producto1.obtenerDatos);
        res.redirect("/mostrarProductos");
    }
});

ruta.get("/borrarProducto/:id", async (req,res)=>{
    const productobd=new ProductoBD();
    productobd.borrarProducto(req.params.id);
    res.redirect("/mostrarProductos");
});

module.exports=ruta;