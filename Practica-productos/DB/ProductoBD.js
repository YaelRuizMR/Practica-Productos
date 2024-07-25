const ConectarBD = require("./ConectarBD");

class ProductoBD extends ConectarBD{
    constructor(){
        super();
    }
    async crearProducto(producto){
        const sql="INSERT INTO productos (nombre,precio,stock) VALUES('"+producto.nombre+"','"+producto.precio+"','"+producto.stock+"')";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Registro creado correctamente");
        } catch (error) {
            console.error("Error al crear el registro "+error);
            console.error(sql);
        }
    }
    async mostrarProducto(){
        const sql="SELECT * FROM productos";
        try {
            await this.conectarMySql();
            const productoBD = await this.conexion.execute(sql);
            await this.cerrarConexion();
            return productoBD;
        } catch (error) {
            console.error("Error al recuperar los producto "+error);
            console.error(sql);
            return null;
        }
    }
    async buscarProductoPorId(idProducto){
        const sql="SELECT * FROM productos WHERE idproducto="+idProducto;
        try {
            await this.conectarMySql();
            const producto = await this.conexion.execute(sql);
            await this.cerrarConexion();
            return producto;
        } catch (error) {
            console.error("Error al recuperar al producto "+error);
            console.error(sql);
            return null;
        }
    }
    async actualizarProducto(producto){
        const sql="UPDATE productos SET nombre='"+producto.nombre+"', precio='"+producto.precio+"', stock='"+producto.stock+"' WHERE idproducto="+producto.id;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Actualización exitosa.");
        } catch (error) {
            console.error("Error de actualizacion de producto. "+error);
            console.error(sql);
            return null;
        }
    }
    async borrarProducto(idProducto){
        const sql="DELETE FROM productos WHERE idproducto="+idProducto;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al borrar el producto. "+error);
            console.error(sql);
            return null;
        }
    }
}

module.exports=ProductoBD;