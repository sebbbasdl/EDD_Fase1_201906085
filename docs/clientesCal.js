document.querySelector('#btnRegistrarCliente').addEventListener('click',registrarCliente);
document.querySelector('#btnRegistrarEvento').addEventListener('click',registrarEvento);
document.querySelector('#btnGrafosC').addEventListener('click',mostrarGrafosC);
document.querySelector('#btnEliminarCliente').addEventListener('click',eliminarcliente);
document.querySelector('#archivoHash').addEventListener('change',leerArchivoHash,false)


function registrarCliente(){
    //recuperarHash()
    //console.log(tabla.recorrer())
    
    var idR ='';
    var nombreR='';
    var correoR='';
    var usuariop = sessionStorage.getItem('usuario');
    var password = sessionStorage.getItem('password');
    var idV = sessionStorage.getItem('id');
    //var arbol2 = sessionStorage.getItem('arbol');
    
    idR=document.querySelector('#txtID').value;
    nombreR=document.querySelector('#txtNombre').value;
    correoR=document.querySelector('#txtCorreo2').value;
    console.log(usuariop)
    console.log(password)
    console.log(idV)
    //console.log(arbol)
    //arbol1.mostrar_nodos(arbol1)

    recuperarAVL();
    recuperarListaDoble();



    registrarEnListaClientes(idV,idR,nombreR,correoR)
    alert("Cliente registrado")

    
    //
    


}

function eliminarcliente(){
    var ide=''
    ide=document.querySelector('#txtIDE').value;
    var idV = sessionStorage.getItem('id');
    recuperarAVL()
    recuperarListaDoble()

    eliminarcliente1(idV,ide)

}

function registrarEvento(){
    var mes=''
    var evento=''
    var dia=''
    var hora=''
    mes=document.querySelector('#txtMes').value
    evento=document.querySelector('#txtEvento').value
    dia=document.querySelector('#txtDia').value
    hora=document.querySelector('#txtHora').value
    var idV = sessionStorage.getItem('id');

    
    recuperarAVL()

    recuperarListaMes()

    registrarEnListaMes(idV,mes,evento,dia,hora)
    //texto=matriz1.graficarMatriz()
    //document.getElementById("texto").value=texto
    alert("Evento Registrado")
    

    
    

    //recuperarListaMatriz()
    //console.log("muere")
    //registrarevento(idV,evento,dia,hora)

}

/*function mostrarGrafosC() {
    recuperarAVL()
    recuperarListaDoble()
    nodes=[]
    edges=[]
    
    nodes=nodoslista(listad.primero)
    //edges=enlacesLista(listad.primero)
    console.log(nodes)
    console.log(nodes[0].id)
    //
    let size=nodes.length
    for(let i=0;i<size-1;i++) {
        edges.push({from: parseInt(nodes[i].id), to: parseInt(nodes[i+1].id)})
    }
    console.log(edges)

    var container = document.getElementById("mynetwork");
    var data = {
    nodes: nodes,
    edges: edges,
    };
    var options = {};
    var network = new vis.Network(container, data, options);

    
}

function nodoslista(aux) {
    while(aux!=null){
        nodes.push({id:aux.idcliente, label: String(aux.idcliente+" "+ aux.nombrec) })
        aux=aux.siguiente
    }
    return nodes

    
}*/

function mostrarGrafosC(){
    recuperarAVL()
    recuperarListaDoble()
    

    var conteiner=document.getElementById("mynetwork");
    let nodes=[]
    let cadena=""
    nodes=nodoslista(listad.primero)
    let size=nodes.length
    console.log(nodes)
    console.log("hola"+nodes[0].label)
    for(let i=0; i<=size-1; i++) {
        if (i==size-1){
            cadena+=nodes[i].label    
        }else{
            cadena+=nodes[i].label+" ->"
            
        }
        console.log(cadena)
    }
    

    var dot="{node[shape=circle];"+cadena+"}"
    console.log(dot)
    var data = vis.parseDOTNetwork(dot);
    var network = new vis.Network(conteiner, data);
    texto=matriz1.graficarMatriz()
    document.getElementById("texto").value=texto
}

function nodoslista(aux){
    nodes=[]
    while(aux!=null){
        nodes.push({id: aux.idcliente, label: String(aux.idcliente+ aux.nombrec) })
        aux=aux.siguiente
    }

    return nodes

}

/*function enlacesLista(aux){
    
    while(aux!=null){
        edges.push({from:aux.idcliente, to: aux.siguiente.idcliente})
        
        aux=aux.siguiente
    }
    return edges
}*/

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
    var idV = sessionStorage.getItem('id');
    //console.log(usuariop)
    tabla1=new hash()
    recuperarHash()
    recuperarlistadearbol()
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

        if(idVen==idV){
            console.log("holaaaaaaaaa")
            for( var j=0; j<=size2-1;j++){
            
            
                idPro=json.ventas[i].productos[j].id
                cantidad=json.ventas[i].productos[j].cantidad
                
                precio=listaA.existePro(idPro)
                console.log(json.ventas[i].id) 
                multi=precio*cantidad
                total1+=multi    
                console.log(total1)
                console.log(idVen+" "+NombreVen+" "+NombreCl+" "+idPro+" "+cantidad)
    
                //if(j<size-1){
    
                //}
    
                //if(idVen)
                
                //registrarEnListaproductos(idVen,idCliente,nombre1,correo1)
            }console.log("Total: "+total1+" Vendedor: "+NombreVen+" Cliente: "+NombreCl)
            tabla1.insertar(new nodot(idVen,NombreVen,NombreCl,total1))

        }
        /*for( var j=0; j<=size2-1;j++){
            
            
            idPro=json.ventas[i].productos[j].id
            cantidad=json.ventas[i].productos[j].cantidad
            
            precio=listaA.existePro(idPro)
            console.log(json.ventas[i].id) 
            multi=precio*cantidad
            total1+=multi    
            console.log(total1)
            console.log(idVen+" "+NombreVen+" "+NombreCl+" "+idPro+" "+cantidad)

            //if(j<size-1){

            //}

            //if(idVen)
            
            //registrarEnListaproductos(idVen,idCliente,nombre1,correo1)

        }*/
        //console.log("Total: "+total1+" Vendedor: "+NombreVen+" Cliente: "+NombreCl)
        //tabla.insertar(new nodot(idVen,NombreVen,NombreCl,total1))
        



    }
    textolista=listaA.mostrarlista()
    texto=tabla1.recorrer(textolista) 

    tablahtml=document.getElementById("tabla1")
    //tablahtml.innerHTML="<tr>\n\t<td>hola</td>\n</tr>\n<tr>\n\t<td>hola2</td>\n</tr>"
    tablahtml.innerHTML=texto
    sessionStorage.setItem('tabla1',JSON.stringify(CircularJSON.stringify(tabla1)))   

    
}

