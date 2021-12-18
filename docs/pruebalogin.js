document.querySelector('#btnIngresar').addEventListener('click',iniciarSesion);

function iniciarSesion(){
    var idI ='';
    var paswordI='';
    var acceso=false

    idI=document.querySelector('#txtCorreo').value;
    paswordI=document.querySelector('#txtPassword').value;


    acceso=validar(idI,paswordI)
    console.log(acceso)

    if(acceso==true){
        console.log("entre ingreso")
        ingresoCorrecto();
    }
}

function ingresoCorrecto(){
    var rol = sessionStorage.getItem('rol');

    switch(rol){
        case '1':
            window.location.href='admin.html'
        break;
    }
}