class Producto{
    constructor (producto){
        this.id=producto.idproducto;
        this.nombre=producto.nombre;
        this.precio=producto.precio;
        this.stock=producto.stock;
    }
    set id(id){
        this._id=id;
    }
    set nombre(nombre){
        var regexNombre = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if(regexNombre.test(nombre)){
            this._nombre=nombre;
        }else{
            console.log("Error al asignar el nombre");
        }
    }
    set precio(precio){
        var regexTelefonoNacional = /^[1-9]\d*$/;
        if(regexTelefonoNacional.test(precio)){
            this._precio=precio;
        }else{
            console.log("Error al asignar el Telefono");
        }
    }
    set stock(stock){
        var regexStock = /^[1-9]\d*$/;
        if(regexStock.test(stock)){
            this._stock=stock;
        }else{
            console.log("Error al asignar el Stock");
        }
    }
    get id(){
        return this._id;
    }
    get precio(){
        return this._precio;
    }
    get stock(){
        return this._stock;
    }
    get nombre(){
        return this._nombre
    }
    get obtenerDatos(){
        return{
            id:this.id,
            nombre:this.nombre,
            precio:this.precio,
            stock:this.stock
        }
    }
}

module.exports = Producto;