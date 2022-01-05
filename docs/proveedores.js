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

class nodo{
    constructor(id,nombre){
        this.id = id;
        this.nombre=nombre
        this.siguiente = null;
        this.anterior = null;
        this.ponderacion=0;
        this.adyasentes = new listaAdyacente();
    }
}

class listaAdyacente{
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    insertar(id,nombre,p){
        let nuevo = new nodo(id,nombre);
        nuevo.ponderacion = p;
        if(this.primero == null){
            this.primero = nuevo;
            this.ultimo = nuevo;
        }else{
            if(this.primero == this.ultimo){
                this.primero.siguiente = nuevo;
                nuevo.anterior = this.primero;
                this.ultimo = nuevo;
            }else{
                nuevo.anterior = this.ultimo;
                this.ultimo.siguiente = nuevo;
                this.ultimo= nuevo;
            }
        }
    }
}

class grafo{
    constructor(){
        this.primero= null;
        this.ultimo = null;
    }

    insertar(id,nombre){
        let nuevo = new nodo(id,nombre);

        if(this.primero == null){
            this.primero = nuevo;
            this.ultimo = nuevo;
        }else{
            if(this.primero == this.ultimo){
                this.primero.siguiente = nuevo;
                nuevo.anterior = this.primero;
                this.ultimo = nuevo;
            }else{
                nuevo.anterior = this.ultimo;
                this.ultimo.siguiente = nuevo;
                this.ultimo= nuevo;
            }
        }
    }

    

    insertarAdyacente(id1, id_adyacente,nombre1,ponderacion){
        let inicial = this.buscarDato(id1);

        if(inicial != null){
            inicial.adyasentes.insertar(id_adyacente, nombre1 , ponderacion);
        }else{
            console.log("no existe el nodo origen")
        }
    }
    buscarDato(id){
        let aux = this.primero;
        while(aux != null){
            if(aux.id == id){
                return aux;
            }else{
                aux = aux.siguiente;
            }
        }
        return null;
    }

   

    graficar(){
        let cadena= "digraph grafo {\n rankdir=\"LR\" \n"
        let aux = this.primero;
        while(aux != null){
            cadena+="n"+aux.id+"[label= \""+aux.id+" "+aux.nombre+"\"];\n"
            aux = aux.siguiente;
        }
        // graficar relaciones
        aux = this.primero;
        while(aux != null){
            let aux2 = aux.adyasentes.primero;
            while(aux2 != null){
                cadena+= "n"+aux.id+" -> n"+aux2.id+" [label=\""+aux2.ponderacion+"km\"]; \n";
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
        cadena += "}"
        console.log(cadena);
        return cadena
    }

    mostrarGrafo(){
        let aux = this.primero;
        while(aux != null){
            console.log("-> "+aux.id);
            let aux2 = aux.adyasentes.primero;
            while(aux2 != null){
                console.log("   -"+aux2.id);
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
    }
}

let grafo1 = new grafo();
/*grafo1.insertar(1,"bodega1")
grafo1.insertar(2,"bodega2")
grafo1.insertar(3,"bodega3")
grafo1.insertar(4, "bodega4")
grafo1.insertar(5,"bodega5")

grafo1.insertarAdyacente(1,3,"bodega3",15)
grafo1.insertarAdyacente(1,5,"bodega5",5)

grafo1.insertarAdyacente(2,3,"bodega3",5)
grafo1.insertarAdyacente(2,4,"bodega4",2)

grafo1.insertarAdyacente(3,1,"bodega1",15)
grafo1.insertarAdyacente(3,2,"bodega2",5)

grafo1.graficar()*/


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

function recuperarGrafo() {
    var grafotemp=JSON.parse(sessionStorage.getItem('grafo',JSON.stringify('grafo')))
    grafo1= new grafo()
    Object.assign(grafo1,grafotemp) 

}