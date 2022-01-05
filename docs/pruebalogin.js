document.querySelector('#btnIngresar').addEventListener('click',iniciarSesion);

function iniciarSesion(){
    var usuarioI ='';
    var paswordI='';
    var acceso=false

    usuarioI=document.querySelector('#txtCorreo').value;
    paswordI=document.querySelector('#txtPassword').value;
    //var arboltemp=JSON.stringify('arbol')
    //sessionStorage.setItem('arbol',JSON.stringify(arboltemp))

    
    if(usuarioI=="Admin" && paswordI=="1234"){
        acceso=true
        ingresoCorrecto(1);
        
    }else{
        if(validar(usuarioI,paswordI)==true){
            acceso=true
            ingresoCorrecto(2);

        }else{
            alert("Usuario y/o contraseña es incorrecto ")
        }
    }
    //acceso=validar(usuarioI,paswordI)
    console.log(acceso)

    /*if(acceso==true){
        console.log("entre ingreso")
        ingresoCorrecto();
    }*/
}

function ingresoCorrecto(rol){
    //var usuariop = sessionStorage.getItem('usuario');
    
    //var arboll=sessionStorage.getItem('arbol')
    //console.log(arboll)

    
    if (rol==2){
        console.log("entre antes de JSON")

        //var arboltemp=CircularJSON.stringify(arbol);
        //var arboltemp=JSON.parse(sessionStorage.getItem('arbol',JSON.stringify('arbol')))
        //sessionStorage.setItem('arbol',JSON.stringify(arbol))
        //sessionStorage.setItem('arbol',arboll)
        

        //var arbolt=CircularJSON.stringify(arbol)
        //var arboltemp=JSON.stringify(arbol)
        //sessionStorage.setItem('arbol',CircularJSON.stringify(arbol))
        sessionStorage.setItem('arbol',JSON.stringify(CircularJSON.stringify(arbol)))
        sessionStorage.setItem('tabla',JSON.stringify(CircularJSON.stringify(tabla)))
        
        location.href='vendedor.html'
        
        
    }else{
        //var arboltemp=JSON.parse(sessionStorage.getItem('arbol',JSON.stringify('arbol')))
        //var arboltemp=JSON.stringify(arbol)
        //sessionStorage.setItem('arbol',JSON.stringify(arboltemp))
        //sessionStorage.setItem('arbolb',JSON.stringify(CircularJSON.stringify(arbolb)))
        //JSON.parse(sessionStorage.getItem('arbolb',JSON.stringify('arbolb')))
        
        //sessionStorage.setItem('arbolb',JSON.stringify(CircularJSON.stringify(arbolb)))
        //console.log(JSON.parse(CircularJSON.parse(localStorage.getItem('arbolb'))))

        
        window.location.href='admin.html'
    }
    
    

    console.log("entre")

    /*switch(rol){
        case '1':
            window.location.href='admin.html'
        break;
    }*/
}


