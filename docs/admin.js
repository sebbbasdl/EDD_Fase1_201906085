document.querySelector('#btnRegistrarVendedor').addEventListener('click',registrarVendedor);
document.querySelector('#btnRegistrarProveedor').addEventListener('click',registrarProveedor);
document.querySelector('#archivoV').addEventListener('change',leerArchivoV,false)
document.querySelector('#archivoClientes').addEventListener('change',leerArchivoClientes,false)
document.querySelector('#archivoProveedores').addEventListener('change',leerArchivoProveedores,false)
document.querySelector('#archivoEventos').addEventListener('change',leerArchivoEventos,false)
document.querySelector('#btnRegistrarProducto').addEventListener('click',registrarProducto);
document.querySelector('#archivoGrafos').addEventListener('change',leerArchivoGrafos,false)
document.querySelector('#archivoHash').addEventListener('change',leerArchivoHash,false)
document.querySelector('#archivoProducto').addEventListener('change',leerArchivoProducto,false)
//document.querySelector('#btnReporteGrafo').addEventListener('click',mostrarGrafo);




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
    alert("Vendedor registrado")

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
    alert("Proveedor registrado")


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

function leerArchivoEventos(e) {
    let archivoV=e.target.files[0]
    if (!archivoV){
        return;
    }
    const lector = new FileReader()
    lector.onload = function(e){
        const datos=e.target.result
        //console.log(datos)
        obtenerAEventos(datos)
    }
    lector.readAsText(archivoV)
    
}

function obtenerAEventos(datos){

    recuperarAVL()

    recuperarListaMes()
    console.log(datos)
    var json= JSON.parse(datos)
    console.log(json)


    let size1e=json.vendedores.length

    for (var i=0; i<=size1e-1;i++){
        let size2e=json.vendedores[i].eventos.length
        //console.log(size2)
        for( var j=0; j<=size2e-1;j++){
            idVen1=json.vendedores[i].id
            mes1=json.vendedores[i].eventos[j].mes
            dia1=json.vendedores[i].eventos[j].dia
            hora1=json.vendedores[i].eventos[j].hora
            evento1=json.vendedores[i].eventos[j].desc

            console.log(idVen1+" "+mes1+" "+dia1+" "+hora1+" "+evento1)

            registrarEnListaMes(idVen1,mes1,evento1,dia1,hora1)
            
            //registrarEnListaClientes(idVen,idCliente,nombre1,correo1)

        }


    }



}

//fase 2
function registrarProducto(){

    //recuperarB()
    
    //console.log(JSON.parse(CircularJSON.parse(sessionStorage.getItem('arbolb'))))
    //sessionStorage.setItem('arbolb',JSON.stringify(CircularJSON.stringify(arbolb)))
    //console.log(JSON.parse(CircularJSON.parse(sessionStorage.getItem('arbolb'))))
    //sessionStorage.setItem('arbolb',JSON.stringify(CircularJSON.stringify(arbolb)))
    recuperarlistadearbol()
    
    console.log(JSON.parse(CircularJSON.parse(localStorage.getItem('arbolb'))))
    var idPro ='';
    var nombrePro='';
    var precio='';
    var cantidad='';

    idPro=document.querySelector('#txtIDPRO').value;
    nombrePro=document.querySelector('#txtNombrePRO').value;
    precio=document.querySelector('#txtPrecio').value
    cantidad=document.querySelector('#txtCantidad').value

    /*listaA.insertarlista(idPro,nombrePro,precio,cantidad)
    sessionStorage.setItem('listaA',JSON.stringify(CircularJSON.stringify(listaA)))
    console.log(listaA.mostrarlista())

    let aux=listaA.primero
        while(aux != null){

            arbolb.insertar_nodo(aux.idPro,aux.nombre,aux.precio,aux.cantidad)
            
            aux=aux.siguiente
        }*/
        

    
    //JSON.parse(sessionStorage.getItem('arbolb',JSON.stringify('arbolb')))
    //CircularJSON.parse(JSON.parse(sessionStorage.getItem('arbolb')))
    /*sessionStorage.setItem('arbolb',JSON.stringify(CircularJSON.stringify(arbolb)))
    console.log(arbolb.graficar())*/
    //arbolb.insertar_nodo(idPro,nombrePro,precio,cantidad)
    //sessionStorage.setItem('arbolb',JSON.stringify(arbolb))
    registrarproducto(idPro,nombrePro,precio,cantidad)
    //sessionStorage.setItem('arbolb',JSON.stringify(CircularJSON.stringify(arbolb)))
    //console.log(arbolb.graficar())
    //location.href="admin.html";

}


function leerArchivoGrafos(e){
    let archivoGrafo=e.target.files[0]
    if (!archivoGrafo){
        return;
    }
    const lector = new FileReader()
    lector.onload = function(e){
        const datos=e.target.result
        //console.log(datos)
        obtenerAGrafo(datos)
    }
    lector.readAsText(archivoGrafo)


}

function obtenerAGrafo(datos) {

    recuperarGrafo();
    console.log(datos)
    var json= JSON.parse(datos)
    console.log(json)
    //console.log(json.vendedores[0].clientes[2].id)
    let size1=json.rutas.length
    //size2=json.vendedores[0].clientes.length

    //console.log(size1+" "+ size2)
    for (var i=0; i<=size1-1;i++){
        let size2=json.rutas[i].adyacentes.length
        idB=json.rutas[i].id
        nombreB=json.rutas[i].nombre
        console.log(idB+" "+nombreB)
        //console.log(size2)
        //grafo1.insertar(idB,nombreB)

        if(grafo1.buscarDato(idB,nombreB)==null){
            grafo1.insertar(idB,nombreB)
        }else{
            console.log("")
        }

        for( var j=0; j<=size2-1;j++){
            
            idB2=json.rutas[i].adyacentes[j].id
            nombre=json.rutas[i].adyacentes[j].nombre
            distancia=json.rutas[i].adyacentes[j].distancia
            
            if(grafo1.buscarDato(idB2)==null){  
                console.log("ENTRE")  
                grafo1.insertar(idB2,nombre)
                grafo1.insertarAdyacente(idB,idB2,nombre,distancia)
                
            }else{
                console.log("--->"+idB2+" "+nombre+" "+distancia)
                grafo1.insertarAdyacente(idB,idB2,nombre,distancia)
            }
            
            
            //grafo1.insertarAdyacente(idB2,idB,nombre,distancia)
            console.log(grafo1.buscarDato(idB2))
            
            //registrargrafo()

        }

        
        


    }
    //grafo1.graficar()
    texto=grafo1.graficar()
    document.getElementById("texto").value=texto
    
    sessionStorage.setItem('grafo',JSON.stringify(CircularJSON.stringify(grafo1)))
    mostrarGrafo1(grafo1.primero)
    
}


function leerArchivoHash(e) {
    

    let archivoHash=e.target.files[0]
    if (!archivoHash){
        return;
    }
    const lector = new FileReader()
    lector.onload = function(e){
        const datos=e.target.result
        //console.log(datos)
        obtenerAHash(datos)
    }
    lector.readAsText(archivoHash)
}

function obtenerAHash(datos) {
    
    recuperarHash()
    recuperarlistadearbol()
    console.log(listaA.mostrarlista())
    tabla=new hash()
    console.log(datos)
    var json= JSON.parse(datos)
    console.log(json)
    //console.log(json.ventas[0].productos[2].id)
    let size1=json.ventas.length
    //size2=json.ventas[0].productos.length
    let total1=0
    //console.log(size1+" "+ size2)
    for (var i=0; i<=size1-1;i++){
        let size2=json.ventas[i].productos.length
        
        idVen=json.ventas[i].id
        NombreVen=json.ventas[i].vendedor
        NombreCl=json.ventas[i].cliente
        //console.log(size2)
        //console.log("Total: "+total)
        total1=0
        for( var j=0; j<=size2-1;j++){
            
            idPro=json.ventas[i].productos[j].id
            cantidad=json.ventas[i].productos[j].cantidad
            
            precio=listaA.existePro(idPro)
            console.log(json.ventas[i].id) 
            multi=precio*cantidad
            total1+=multi    
            console.log(total1)
            console.log(idVen+" "+NombreVen+" "+NombreCl+" "+idPro+" "+cantidad)
            //let cadenapro=""
            //cadenapro+="<td> Id:"+idPro+""

            //if(j<size-1){

            //}

            //if(idVen)
            
            //registrarEnListaproductos(idVen,idCliente,nombre1,correo1)


        }
        console.log("Total: "+total1+" Vendedor: "+NombreVen+" Cliente: "+NombreCl)
        tabla.insertar(new nodot(idVen,NombreVen,NombreCl,total1))
        



    }

    textolista=listaA.mostrarlista()
    texto=tabla.recorrer(textolista) 

    tablahtml=document.getElementById("tabla")
    //tablahtml.innerHTML="<tr>\n\t<td>hola</td>\n</tr>\n<tr>\n\t<td>hola2</td>\n</tr>"
    tablahtml.innerHTML=texto
    sessionStorage.setItem('tabla',JSON.stringify(CircularJSON.stringify(tabla)))   

    
}

function leerArchivoProducto(e) {
    let archivoPro=e.target.files[0]
    if (!archivoHash){
        return;
    }
    const lector = new FileReader()
    lector.onload = function(e){
        const datos=e.target.result
        //console.log(datos)
        obtenerAPro(datos)
    }
    lector.readAsText(archivoPro)
    
}

function obtenerAPro(datos) {
    recuperarlistadearbol()
    console.log(datos)
    var json= JSON.parse(datos)
    console.log(json)
    console.log(json. productos[0].id)
    console.log(JSON.stringify(json. productos[1]))
    size=json. productos.length
    console.log(size)

    for (var i=0; i<=size-1;i++){
        //console.log(json. productos[i])
        //console.log("soy i "+i)
        idP=json. productos[i].id
        nombreP=json. productos[i].nombre
        precioP=json. productos[i].precio
        cantidadP=json. productos[i].cantidad
        
        console.log(idP+" "+nombreP+" "+precioP+" "+cantidadP)
        registrarproducto(idP,nombreP,precioP,cantidadP)
        //registrarvendedor1(id,nombre,usuario,edad,correo,password)
        
    }
}

function mostrarGrafo(){
    recuperarGrafo()
    console.log(grafo1.mostrar())
    texto=grafo1.graficar()
    document.getElementById("texto").value=texto
  
  }
