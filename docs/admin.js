document.querySelector('#btnRegistrarVendedor').addEventListener('click',registrarVendedor);
document.querySelector('#btnRegistrarProveedor').addEventListener('click',registrarProveedor);
document.querySelector('#archivoV').addEventListener('change',leerArchivoV,false)
document.querySelector('#archivoClientes').addEventListener('change',leerArchivoClientes,false)
document.querySelector('#archivoProveedores').addEventListener('change',leerArchivoProveedores,false)



function registrarVendedor(){
    var idV ='';
    var usuarioV='';
    var nombreV='';
    var edadV='';
    var correoV='';
    var passwordV='';
    idV=document.querySelector('#txtID').value;
    nombreV=document.querySelector('#txtNombre').value;
    usuarioV=document.querySelector('#txtUsuario').value
    
    edadV=document.querySelector('#txtEdad').value
    correoV=document.querySelector('#txtCorreo2').value;
    passwordV=document.querySelector('#txtPassword').value
    recuperarAVL()
    registrarvendedor1(idV,nombreV,usuarioV,edadV,correoV,passwordV)

}


function registrarProveedor(){
    var idP ='';
    var nombreP='';
    var direccionP='';
    var telefonoP='';
    var correoP='';

    idP=document.querySelector('#txtID1').value;
    nombreP=document.querySelector('#txtNombre1').value;
    direccionP=document.querySelector('#txtDireccion1').value
    telefonoP=document.querySelector('#txtTelefono1').value
    correoP=document.querySelector('#txtCorreo21').value;

    recuperarABB()

    registrarproveedor1(idP,nombreP,direccionP,telefonoP,correoP)


}



function leerArchivoV(e) {
    let archivoV=e.target.files[0]
    if (!archivoV){
        return;
    }
    const lector = new FileReader()
    lector.onload = function(e){
        const datos=e.target.result
        //console.log(datos)
        obtenerAV(datos)
    }
    lector.readAsText(archivoV)

    
}

function obtenerAV(datos) {
    console.log(datos)
    var json= JSON.parse(datos)
    console.log(json)
    console.log(json.vendedores[0].id)
    console.log(JSON.stringify(json.vendedores[1]))
    size=json.vendedores.length
    console.log(size)

    for (var i=0; i<=size-1;i++){
        //console.log(json.vendedores[i])
        //console.log("soy i "+i)
        id=json.vendedores[i].id
        nombre=json.vendedores[i].nombre
        edad=json.vendedores[i].edad
        correo=json.vendedores[i].correo
        password=json.vendedores[i].password
        usuario=json.vendedores[i].username
        console.log(id+" "+nombre+" "+edad+" "+correo+" "+password)
        registrarvendedor1(id,nombre,usuario,edad,correo,password)
        
    }
    
    
}

function leerArchivoClientes(e) {
    let archivoV=e.target.files[0]
    if (!archivoV){
        return;
    }
    const lector = new FileReader()
    lector.onload = function(e){
        const datos=e.target.result
        //console.log(datos)
        obtenerAClientes(datos)
    }
    lector.readAsText(archivoV)

    
}


function obtenerAClientes(datos){
    recuperarAVL();
    console.log(datos)
    var json= JSON.parse(datos)
    console.log(json)
    console.log(json.vendedores[0].clientes[2].id)
    let size1=json.vendedores.length
    //size2=json.vendedores[0].clientes.length

    //console.log(size1+" "+ size2)
    for (var i=0; i<=size1-1;i++){
        let size2=json.vendedores[i].clientes.length
        //console.log(size2)
        for( var j=0; j<=size2-1;j++){
            idVen=json.vendedores[i].id
            idCliente=json.vendedores[i].clientes[j].id
            nombre1=json.vendedores[i].clientes[j].nombre
            correo1=json.vendedores[i].clientes[j].correo

            console.log(idVen+" "+idCliente+" "+nombre1+" "+correo1)
            
            registrarEnListaClientes(idVen,idCliente,nombre1,correo1)

        }


    }

    

}

function leerArchivoProveedores(e) {
    let archivoV=e.target.files[0]
    if (!archivoV){
        return;
    }
    const lector = new FileReader()
    lector.onload = function(e){
        const datos=e.target.result
        //console.log(datos)
        obtenerAProveedores(datos)
    }
    lector.readAsText(archivoV)

    
}

function obtenerAProveedores(datos){
    console.log(datos)
    var json= JSON.parse(datos)
    console.log(json)
    //console.log(json.vendedores[0].id)
    //console.log(JSON.stringify(json.vendedores[1]))
    size=json.proveedores.length
    //console.log(size)

    for (var i=0; i<=size-1;i++){
        //console.log(json.vendedores[i])
        //console.log("soy i "+i)
        id=json.proveedores[i].id
        nombre=json.proveedores[i].nombre
        direccion=json.proveedores[i].direccion
        telefono=json.proveedores[i].telefono
        correo2=json.proveedores[i].correo
        
        console.log(id+" "+nombre+" "+direccion+" "+telefono+" "+correo2)
        recuperarABB()
        registrarproveedor1(id,nombre,direccion,telefono,correo2)

        
        
    }
}


