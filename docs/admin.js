document.querySelector('#btnRegistrarVendedor').addEventListener('click',registrarVendedor);
document.querySelector('#btnRegistrarProveedor').addEventListener('click',registrarProveedor);


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