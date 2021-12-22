//Arbol abb


class nodoABB{
    constructor(id,nombre,direccion,telefono,correo){
        this.id = id;
        this.nombre=nombre;
        this.direccion=direccion;
        this.telefono=telefono;
        this.correo=correo;
        this.izquierda = null;
        this.derecha = null;
        this.altura=0
    }
}

class arbolABB{
    constructor(){
        this.raiz = null;
    }

    insertarnodo1(id,nombre,direccion,telefono,correo){
        let nuevo = new nodoABB(id,nombre,direccion,telefono,correo);

        if(this.raiz == null){
            this.raiz= nuevo;
            nuevo.altura=0
        }else{
            this.raiz = this.insertarnodo2(this.raiz,nuevo);
        }
    }

    insertarnodo2(raizprimera,nuevo){
        if(raizprimera != null){
            
            if(raizprimera.id > nuevo.id){
                nuevo.altura+=1
                raizprimera.izquierda = this.insertarnodo2(raizprimera.izquierda,nuevo);
                
            }else if(raizprimera.id < nuevo.id){
                nuevo.altura+=1
                raizprimera.derecha = this.insertarnodo2(raizprimera.derecha,nuevo);
            }else{
                console.log("NO SE PUEDE INSERTAR EL ID PORQUE YA EXISTE");
            }

            return raizprimera;
        }else{
            raizprimera = nuevo;
            return raizprimera;
        }
    }
    imprimirPostOrden(raizprimera){
        if(raizprimera != null){
            this.postOrden(raizprimera.izquierda);
            this.postOrden(raizprimera.derecha);
            console.log(raizprimera.id);
        }
    }

    imprimirPreorden(raizprimera){
        if(raizprimera != null){
            console.log(raizprimera.id);
            this.preorden(raizprimera.izquierda);
            this.preorden(raizprimera.derecha);
        }
    }

    imprimirInOrden(raizprimera){
        if(raizprimera != null){
            this.inOrden(raizprimera.izquierda);
            console.log(raizprimera.id);
            this.inOrden(raizprimera.derecha);
        }
    }

    cadenaEnlaces(raizprimera){
        let cadena="";
        if(raizprimera != null){
            cadena += this.cadenaEnlaces(raizprimera.izquierda);
            cadena += this.cadenaEnlaces(raizprimera.derecha);
            
            if(raizprimera.izquierda != null){
                cadena+="n"+raizprimera.id + "-> n"+raizprimera.izquierda.id+"\n";
            }
            if(raizprimera.derecha != null){
                cadena+="n"+raizprimera.id + "-> n"+raizprimera.derecha.id+"\n";
            }

            
        }
        return cadena;
    }

    cadenaNodos(raizprimera){ 
        let nodos ="";
        
        if(raizprimera != null){
            nodos+= "n"+raizprimera.id+"[label=\""+raizprimera.id+"\t"+raizprimera.nombre+"\t"+raizprimera.direccion+"\t"+raizprimera.telefono+"\"]\n";
            nodos+=this.cadenaNodos(raizprimera.izquierda);
            nodos+=this.cadenaNodos(raizprimera.derecha);
            //console.log("id: "+raizprimera.id+" altura: "+raizprimera.altura)
            
        }
        return nodos;
    }


    

    cadenaDot(){
        let cadena="digraph arbol {\n";
        cadena+= this.cadenaNodos(this.raiz);
        cadena+="\n";
        cadena+=this.cadenaEnlaces(this.raiz);
        cadena+="\n}";

        console.log(cadena);
    }
}

var arbolabb= new arbolABB();
/*arbolabb.insertarnodo1(20,"Sebastian","calle 13",42058019,"sebas@gmail.com");
arbolabb.insertarnodo1(25,"Sebastian","calle 13",42058019,"sebas@gmail.com");
arbolabb.insertarnodo1(15,"Sebastian","calle 13",42058019,"sebas@gmail.com");
arbolabb.insertarnodo1(35,"Sebastian","calle 13",42058019,"sebas@gmail.com");
arbolabb.insertarnodo1(23,"Sebastian","calle 13",42058019,"sebas@gmail.com");
arbolabb.insertarnodo1(18,"Sebastian","calle 13",42058019,"sebas@gmail.com");
arbolabb.insertarnodo1(10,"Sebastian","calle 13",42058019,"sebas@gmail.com");
arbolabb.cadenaNodos(arbolabb.raiz)
arbolabb.cadenaDot();*/

function registrarproveedor1(idp,nombrep,direccionp,telefonop,correop){


    arbolabb.insertarnodo1(idp,nombrep,direccionp,telefonop,correop)
    sessionStorage.setItem('arbolabb',JSON.stringify(arbolabb))
    arbolabb.cadenaDot()
}

function recuperarABB(){
    var arboltemp1=JSON.parse(sessionStorage.getItem('arbolabb',JSON.stringify('arbolabb')))
    arbolabb=new arbolABB()
    //arboltemp=CircularJSON.parse(arboltemp)
    Object.assign(arbolabb,arboltemp1)
}