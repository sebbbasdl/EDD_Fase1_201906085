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
        }else{
            this.raiz = this.insertarnodo2(this.raiz,nuevo);
        }
    }

    insertarnodo2(raizprimera,nuevo){
        if(raizprimera != null){
            
            if(raizprimera.id > nuevo.id){
                raizprimera.izquierda = this.insertarnodo2(raizprimera.izquierda,nuevo);

            }else if(raizprimera.id < nuevo.id){
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

arbol1= new arbolABB();
arbol1.insertarnodo1(30,"Sebastian","calle 13",42058019,"sebas@gmail.com");
arbol1.insertarnodo1(25,"Sebastian","calle 13",42058019,"sebas@gmail.com");
arbol1.insertarnodo1(35,"Sebastian","calle 13",42058019,"sebas@gmail.com");
arbol1.insertarnodo1(45,"Sebastian","calle 13",42058019,"sebas@gmail.com");
arbol1.insertarnodo1(31,"Sebastian","calle 13",42058019,"sebas@gmail.com");

arbol1.cadenaDot();