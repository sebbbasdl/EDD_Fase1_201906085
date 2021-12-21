document.querySelector('#btnRegistrarCliente').addEventListener('click',registrarCliente);


function registrarCliente(){
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
    

    registrarEnListaClientes(idV,idR,nombreR,correoR)

    
    //
    


}

