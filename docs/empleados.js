//Arbol AVL, Lista doble enlazada , Matriz
var idretorna=0

class nodoAVL{
    
    constructor(id, nombre, usuario,edad,correo, password){
        
        this.id = id;
        this.nombre= nombre;
        this.usuario= usuario;
        this.edad= edad;
        this.correo=correo;
        this.password=password;
        this.izquierda = null;
        this.derecha = null;
        this.altura = 0;
        this.lista= new listaDobleEnlazada();
        this.matriz=new matriz();
    }
}

class arbolAVL{
    constructor(){
        this.raiz = null;
    }
    
    insertarnodoAVL1(id, nombre, usuario,edad,correo, password){
        let nuevo = new nodoAVL(id, nombre, usuario,edad,correo, password);

        if(this.raiz == null){
            this.raiz= nuevo;
        }else{
            this.raiz = this.insertarnodoAVL2(this.raiz,nuevo);
        }
    }

    insertarnodoAVL2(raizprimera,nuevo){//insertarnodoAVL2
        if(raizprimera != null){
            
            if(raizprimera.id > nuevo.id){
                raizprimera.izquierda = this.insertarnodoAVL2(raizprimera.izquierda,nuevo);
                
                
                if(this.altura(raizprimera.derecha)-this.altura(raizprimera.izquierda)==-2){
                    console.log("entra a rotacion izquierdaUIERDA");
                    
                    if(nuevo.id < raizprimera.izquierda.id){ 
                        console.log("entra a rotacion izquierdaUIERDA izquierdaUIERDA");
                        raizprimera = this.simpleIzquierda(raizprimera);
                    }else{ 
                        // 
                        console.log("entra a rotacion izquierdaUIERDA derechaECHA");
                        raizprimera = this.izquierdaDerecha(raizprimera);
                    }
                }
            }else if(raizprimera.id < nuevo.id){
                raizprimera.derecha = this.insertarnodoAVL2(raizprimera.derecha,nuevo);
                if(this.altura(raizprimera.derecha)-this.altura(raizprimera.izquierda)==2){
                    console.log("entra a rotacion derechaECHA");
                    if(nuevo.id > raizprimera.derecha.id){ // 
                        console.log("entra a rotacion derechaECHA derechaECHA");
                        raizprimera=this.simpleDerecha(raizprimera);
                    }else{//
                        console.log("entra a rotacion derechaECHA izquierdaUIERDA");
                        raizprimera = this.derechaIzquierda(raizprimera);
                    }
                }

            }else{
                console.log("NO SE PUEDE INSERTAR EL id PORQUE YA EXISTE");
            }

            raizprimera.altura = this.obtenerAlturaMaxima(this.altura(raizprimera.derecha),this.altura(raizprimera.izquierda))+1;
            return raizprimera;
        }else{
            raizprimera = nuevo;
            return raizprimera;
        }
    }
    

    obtenerAlturaMaxima(h1,h2){
        if(h2>=h1){ 
            return h2;
        }else{
            return h1;
        }

    }
    
    altura(nodo){
        if(nodo != null){
            return nodo.altura;
        }else{
            return -1;
        }
    }

    
    //ROTACIONES
    
    simpleIzquierda(nodo){
        let aux = nodo.izquierda;
        nodo.izquierda= aux.derecha;
        aux.derecha = nodo;
        nodo.altura = this.obtenerAlturaMaxima(this.altura(nodo.derecha),this.altura(nodo.izquierda)) +1;
        aux.altura = this.obtenerAlturaMaxima(nodo.altura.altura,this.altura(nodo.izquierda))+1;
        return aux;
    }
    
    simpleDerecha(nodo){
        let aux = nodo.derecha;
        nodo.derecha= aux.izquierda;
        aux.izquierda = nodo;
        nodo.altura = this.obtenerAlturaMaxima(this.altura(nodo.izquierda),this.altura(nodo.derecha)) +1;
        aux.altura = this.obtenerAlturaMaxima(nodo.altura.altura,this.altura(nodo.derecha))+1;
        return aux;
    }

    
    izquierdaDerecha(nodo){
        nodo.izquierda = this.simpleDerecha(nodo.izquierda);
        let aux = this.simpleIzquierda(nodo);
        return aux;
    }

    
    derechaIzquierda(nodo){
        nodo.derecha = this.simpleIzquierda(nodo.derecha);
        let aux = this.simpleDerecha(nodo);
        return aux;
    }

    


    imprimirPreOrden(raizprimera){
        if(raizprimera != null){
            console.log(raizprimera.id);
            this.imprimirPreOrden(raizprimera.izquierda);
            this.imprimirPreOrden(raizprimera.derecha);
        }
    }

    imprimiInOrden(raizprimera){
        if(raizprimera != null){
            this.imprimiInOrden(raizprimera.izquierda);
            console.log(raizprimera.id);
            console.log("altura= "+(this.altura(raizprimera.derecha)-this.altura(raizprimera.iz)))
            this.imprimiInOrden(raizprimera.derecha);
        }
    }

    imprimirPostOrden(raizprimera){
        if(raizprimera != null){
            this.imprimirPostOrden(raizprimera.izquierda);
            this.imprimirPostOrden(raizprimera.derecha);
            console.log(raizprimera.id);
        }
    }

    cadenaDot(){
        let cadena="digraph arbol {\n";
        cadena+= this.cadenaNodos(this.raiz);
        cadena+="\n";
        cadena+=this.cadenaEnlaces(this.raiz);
        cadena+="\n}";

        console.log(cadena);
    }

    cadenaNodos(raizprimera){ 
        let nodos ="";
        if(raizprimera != null){
            nodos+= "n"+raizprimera.id+"[label=\""+raizprimera.id+"\n"+raizprimera.usuario+"\t"+raizprimera.password+"\"]\n";
            nodos+=this.cadenaNodos(raizprimera.izquierda);
            nodos+=this.cadenaNodos(raizprimera.derecha);
            console.log(nodos)
        }  
        return nodos;
        
    }

    mostrar_nodos(raizprimera){ 
        let nodos1 ="";
        if(raizprimera != null){
            
            nodos1+= "->"+raizprimera.id+" "+raizprimera.usuario+"\t"+raizprimera.password+raizprimera.lista.mostrarlista()+raizprimera.matriz.recorrerMatriz()+"\n";
            nodos1+=this.mostrar_nodos(raizprimera.izquierda);
            nodos1+=this.mostrar_nodos(raizprimera.derecha);
            console.log(nodos1)
        }  
        return nodos1;
        
    }

    

    buscarycomprobar(raizprimera, usuario, password){
        let bool= false
        

        if(raizprimera!=null){
            //console.log(raizprimera.usuario+"-<"+raizprimera.password)
            //console.log(usuario+"-<"+password)
            
            if(raizprimera.usuario==usuario && raizprimera.password==password){
                //respuesta="true" 
                bool =true     
                
                
                return true
                
                

            }else{
                //console.log("entre a else")
                if(this.buscarycomprobar(raizprimera.izquierda,usuario,password)==true | this.buscarycomprobar(raizprimera.derecha,usuario,password)==true ){
                    //console.log("entre2")
                    let xd="xd"
                    return true
                
                
                //console.log("False")
                }else{
                    //console.log("entre2")
                    return false
                }
                
                
                
            } 
                
        }  
        
        
            
        
        
        
        
        
        
        
    }

    retornaid(raizprimera, usuario, password){
        
        
        while(raizprimera!=null){
            if(raizprimera.usuario==usuario && raizprimera.password==password){
                //console.log("entre if"+raizprimera.id)
                idretorna=raizprimera.id
               
                return raizprimera.id
                


            }else{
                //console.log("entre else"+raizprimera.id)
                this.retornaid(raizprimera.derecha,usuario,password)
                this.retornaid(raizprimera.izquierda,usuario,password)
                break;
            }
            
        }

        return idretorna

        
        
        

        
        
        
            
        
        
        
        
        
        
        
    }

    buscar(id,usuario,password){
        let aux= this.raiz;
        console.log(aux.id+aux.usuario+"-<"+aux.password)
        console.log(id+usuario+"-<"+password)
        

        while( aux.id!=id  ){
            if(id<aux.id ){
                //console.log(aux.id)
                //console.log("entre if id")
                
                aux=aux.izquierda
            }else{
                //console.log("entre else")
                
                aux=aux.derecha
                //console.log(aux.id)
                //console.log(aux.password)
                //console.log(password)
                
            }
            if(aux==null){
                //console.log("entre if 2")
                //console.log(aux.id)
                return false
            }

        }
        //console.log(aux.id)
        //console.log(aux.password)
        //console.log(password)

        if(String(aux.password) == String(password) && String(aux.usuario) == String(usuario)){

            //console.log(aux.password)
            //console.log(password)

            return true

        }else{
            return false


        }

    }
    buscar2(usuario,password,bool){

        let aux= this.raiz;
        console.log(aux.usuario+"-<"+aux.password)
        console.log(usuario+"-<"+password)
        console.log("soy bool"+bool)
        

        while(bool==false){
            if(aux.usuario==usuario && aux.password==password){
                bool=true
                break;
            }      
            else{
                this.buscar2(aux.derecha.usuario,aux.derecha.password,bool)
                this.buscar2(aux.izquierda.usuario,aux.izquierda.password,bool)
            }
            
        
        }
        return bool

        

    }
    
        

    insertarlista2(raizprimera,id,idcliente,nombrec,correoc){
        if(raizprimera!=null){
            if(raizprimera.id==id){
                /*console.log("antes de insertarlista"+raizprimera.id+idcliente+nombrec+correoc)
                console.log(raizprimera.lista)
                raizprimera.lista.insertarlista(idcliente,nombrec,correoc);**/


                

                
                //listaclientes.mostrarlista()

                //raizprimera.lista=listaclientes
                let listaclientes= new listaDobleEnlazada()
                let aux= raizprimera.lista.primero
                while(aux!=null){
                    var dato1=aux.idcliente
                    var dato2=aux.nombrec
                    var dato3=aux.correoc
                    listaclientes.insertarlista(dato1,dato2,dato3)
                    aux=aux.siguiente
                }

                listaclientes.insertarlista(idcliente,nombrec,correoc)
                raizprimera.lista=listaclientes

                console.log(raizprimera.lista.mostrarlista())
                
            }else{
                this.insertarlista2(raizprimera.izquierda,id,idcliente,nombrec,correoc)
                this.insertarlista2(raizprimera.derecha,id,idcliente,nombrec,correoc)
                
                
            }


            
        }
    }

    


    insertarMatriz2(raizprimera,id,evento,dia,hora){
        if(raizprimera!=null){
            if(raizprimera.id==id){
                raizprimera.matriz.insertarMatriz(evento,dia,hora)
            }else{
                this.insertarMatriz2(raizprimera.izquierda,id,evento,dia,hora)
                this.insertarMatriz2(raizprimera.derecha,id,evento,dia,hora)
                
            }

            
        }
    }

    
    

    cadenaEnlaces(raizprimera){
        let cadena="";
        if(raizprimera != null){
            cadena += this.cadenaEnlaces(raizprimera.izquierda);
            cadena += this.cadenaEnlaces(raizprimera.derecha);
            //validaciones
            if(raizprimera.izquierda != null){
                cadena+="n"+raizprimera.id + "-> n"+raizprimera.izquierda.id+"\n";
            }
            if(raizprimera.derecha != null){
                cadena+="n"+raizprimera.id + "-> n"+raizprimera.derecha.id+"\n";
            }

            
        }
        return cadena;
    }
}


//Lista doble

class nodolistadoble{
    constructor(idcliente,nombrec,correoc){
        this.idcliente = idcliente;
        this.nombrec=nombrec;
        this.correoc=correoc;
        this.siguiente = null;
        //this.anterior = null;
        
    }
    
}

class listaDobleEnlazada{
    constructor(){
        this.primero = null;
    }

    insertarlista(idcliente,nombrec,correoc){
        let nuevo = new nodolistadoble(idcliente,nombrec,correoc); 

        if(this.primero == null){ 
            this.primero = nuevo;
        }else{
            let aux = this.primero;
            while(aux.siguiente != null){
                if(aux.idcliente==idcliente){
                    console.log("No se puede insertar el valor por que ya existe");
                    //return
                }
                aux = aux.siguiente;
            };
            if(aux.idcliente==idcliente){
                console.log("No se puede insertar el valor por que ya existe");
                //return
            }
            aux.siguiente = nuevo;
            //nuevo.anterior = aux;
        }
    }

    mostrarlista(){
        let datos=""
        datos+=" lista[ "
        let aux = this.primero;
        while(aux != null){
            datos += +aux.idcliente +" "+aux.nombrec+" "
            aux = aux.siguiente;
        }
        datos +="]"
        return datos
    }

    
}
// INICIA MATRIZ DINAMICA

class nodoInterno{
    constructor(valor,dia,hora){
        this.valor = valor;
        this.dia = dia;
        this.hora = hora;

        this.sig = null;
        this.ant = null;
        this.arriba = null;
        this.abajo = null;
    }
}

class listaInterna{
    constructor(){
        this.primero = null;
    }

    insertarDias(valor, dia,hora){ 
        let nuevo = new nodoInterno(valor,dia,hora);

        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.hora < this.primero.hora){
                nuevo.sig = this.primero;
                this.primero.ant = nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.hora < aux.hora){
                        nuevo.sig = aux;
                        nuevo.ant = aux.ant;
                        aux.ant.sig = nuevo;
                        aux.ant= nuevo;
                        break;
                    }else if(nuevo.dia == aux.dia && nuevo.hora == aux.hora){
                        console.log("La posicion ya esta ocupada-> "+nuevo.dia+","+nuevo.hora);
                        break;
                    }else{
                        if(aux.sig ==null){
                            aux.sig=nuevo;
                            nuevo.ant = aux;
                            break;
                        }else{
                            aux = aux.sig;
                        }
                    }
                }
            }
        }
    }

    insertarHoras(valor, dia,hora){ 
        let nuevo = new nodoInterno(valor,dia,hora);

        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.dia < this.primero.dia){
                nuevo.abajo = this.primero;
                this.primero.arriba = nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.dia < aux.dia){
                        nuevo.abajo = aux;
                        nuevo.arriba = aux.arriba;
                        aux.arriba.abajo = nuevo;
                        aux.arriba= nuevo;
                        break;
                    }else if(nuevo.dia == aux.dia && nuevo.hora == aux.hora){
                        console.log("Posicion no disponible-----> "+nuevo.dia+","+nuevo.hora);
                        break;
                    }else{
                        if(aux.abajo ==null){
                            aux.abajo=nuevo;
                            nuevo.arriba = aux;
                            break;
                        }else{
                            aux = aux.abajo;
                        }
                    }
                }
            }
        }
    }

    recorrerDias(){
        let aux = this.primero;
        while(aux != null){
            console.log("valor =",aux.valor," - x = ",aux.dia , " y = ",aux.hora);
            aux = aux.sig;
        }
    }
    recorrerHoras(){
        let aux = this.primero;
        while(aux != null){
            console.log("valor =",aux.valor," - x = ",aux.dia , " y = ",aux.hora);
            aux = aux.abajo;
        }
    }
}


class nodoCabecera{
    constructor(dato){
        this.dato = dato;
        this.sig= null;
        this.ant = null;
        this.listaInterna = new listaInterna();
    }
}

class listaCabecera{
    constructor(){
        this.primero = null;
    }

    insertarListaCabecera(nuevo){

        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.dato<this.primero.dato){
                nuevo.sig = this.primero;
                this.primero.ant=nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.dato < aux.dato){
                        nuevo.sig = aux;
                        nuevo.ant = aux.ant;
                        aux.ant.sig = nuevo;
                        aux.ant = nuevo;
                        break;
                    }else{
                        if(aux.sig == null){
                            aux.sig = nuevo;
                            nuevo.ant = aux;
                            break;
                        }else{
                            aux = aux.sig;
                        }
                    }
                }
            }
        }
    }

    buscarListaCabecera(dato){
        let aux = this.primero;
        while(aux != null){
            if(aux.dato == dato){
                return aux;
            }else{
                aux = aux.sig;
            }
        }
        return null;
    }

    recorrer(){
        let aux = this.primero;
        while(aux != null){
            console.log("dato =",aux.dato);
            aux = aux.sig;
        }
    }
}


class matriz{
    constructor(){
        this.cabecerasDias = new listaCabecera();
        this.cabecerasHoras = new listaCabecera();
    }

    insertarMatriz(valor,dias,horas){
        let nodoDias = this.cabecerasDias.buscarListaCabecera(dias);
        let nodoHoras = this.cabecerasHoras.buscarListaCabecera(horas);

        if(nodoDias == null){
            nodoDias =  new nodoCabecera(dias);
            this.cabecerasDias.insertarListaCabecera(nodoDias);
        }

        if(nodoHoras == null){
            nodoHoras =  new nodoCabecera(horas);
            this.cabecerasHoras.insertarListaCabecera(nodoHoras);
        }

        
        nodoDias.listaInterna.insertarDias(valor,dias,horas);
    
        nodoHoras.listaInterna.insertarHoras(valor,dias,horas);
    }

    recorrerMatriz(){
        let cadenaMatriz=" cabeceras Dias"
        console.log("cabeceras Dias");
        let aux = this.cabecerasDias.primero;
        while(aux != null){
            cadenaMatriz+="   pos->"+aux.dato;
            console.log("   pos->"+aux.dato);
            let aux2 = aux.listaInterna.primero;
            while(aux2!= null){
                cadenaMatriz+="       -"+aux2.valor
                console.log("       -"+aux2.valor);
                aux2 = aux2.sig;
            }
            aux = aux.sig;
        }
        cadenaMatriz+= "  cabeceras Horas"
        console.log("cabeceras Horas");
        aux = this.cabecerasHoras.primero;
        while(aux != null){
            cadenaMatriz+="   pos->"+aux.dato
            console.log("   pos->"+aux.dato);
            let aux2 = aux.listaInterna.primero;
            while(aux2!= null){
                cadenaMatriz+="       -"+aux2.valor
                console.log("       -"+aux2.valor);
                aux2 = aux2.abajo;
            }
            aux = aux.sig;
        }
        return cadenaMatriz;
    }

    graficarMatriz(){
        let cadena="";
        cadena+= "digraph Matriz{ \n";
        cadena+= "node[shape = box,width=0.7,height=0.7,fillcolor=\"azure2\" color=\"white\" style=\"filled\"];\n";
        cadena+= "edge[style = \"bold\"]; \n"
        cadena+="node[label = Matriz fillcolor=\" darkolivegreen1\" pos = \"-1,1!\"]principal;"
        let auxDias = this.cabecerasDias.primero;
        while(auxDias!=null){
            cadena+="node[label = "+auxDias.dato+" fillcolor=\" azure1\" pos = \""+auxDias.dato+",1!\"]x"+auxDias.dato+";\n"
            auxDias = auxDias.sig;
        }
        auxDias = this.cabecerasDias.primero;
        while(auxDias.sig != null){
            cadena+="x"+auxDias.dato+"->"+"x"+auxDias.sig.dato+";\n"
            cadena+="x"+auxDias.sig.dato+"->"+"x"+auxDias.dato+";\n"
            auxDias = auxDias.sig;
        }

        if(this.cabecerasDias.primero!= null){
            cadena+="principal->x"+this.cabecerasDias.primero.dato+";\n";
        }
        
        let auxHoras = this.cabecerasHoras.primero;
        while(auxHoras!=null){
            cadena+="node[label = "+auxHoras.dato+" fillcolor=\" azure1\" pos = \"-1,-"+auxHoras.dato+"!\"]y"+auxHoras.dato+";\n"
            auxHoras = auxHoras.sig;
        }
        auxHoras = this.cabecerasHoras.primero;
        while(auxHoras.sig != null){
            cadena+="y"+auxHoras.dato+"->"+"y"+auxHoras.sig.dato+";\n"
            cadena+="y"+auxHoras.sig.dato+"->"+"y"+auxHoras.dato+";\n"
            auxHoras = auxHoras.sig;
        }

        if(this.cabecerasDias.primero!= null){
            cadena+="principal->y"+this.cabecerasHoras.primero.dato+";\n";
        }
        auxDias = this.cabecerasDias.primero;
        while(auxDias!=null){
            let aux = auxDias.listaInterna.primero;
            while(aux!=null){
                cadena+="   node[label = "+aux.valor+" fillcolor=\" gold2\" pos = \""+aux.dia+",-"+aux.hora+"!\"]x"+aux.dia+"y"+aux.hora+";\n"
                aux = aux.sig;
            }

            
            aux = auxDias.listaInterna.primero;
            while(aux.sig!= null){
                cadena+="   x"+aux.dia+"y"+aux.hora+"->x"+aux.sig.dia+"y"+aux.sig.hora+";\n";
                cadena+="   x"+aux.sig.dia+"y"+aux.sig.hora+"->x"+aux.dia+"y"+aux.hora+";\n";
                aux= aux.sig;
            }
            if(auxDias.listaInterna.primero!= null){
                cadena+="x"+auxDias.dato+"->"+"x"+auxDias.listaInterna.primero.dia+"y"+auxDias.listaInterna.primero.hora+";\n";
            }

            auxDias = auxDias.sig;
        }

        auxHoras = this.cabecerasHoras.primero;
        while(auxHoras!=null){
            let aux = auxHoras.listaInterna.primero;
            while(aux.abajo!= null){
                cadena+="   x"+aux.dia+"y"+aux.hora+"->x"+aux.abajo.dia+"y"+aux.abajo.hora+";\n";
                cadena+="   x"+aux.abajo.dia+"y"+aux.abajo.hora+"->x"+aux.dia+"y"+aux.hora+";\n";
                aux= aux.abajo;
            }
            if(auxHoras.listaInterna.primero!= null){
                cadena+="y"+auxHoras.dato+"->"+"x"+auxHoras.listaInterna.primero.dia+"y"+auxHoras.listaInterna.primero.hora+";\n";
            }
            auxHoras = auxHoras.sig;
        }

        cadena+= "\n}"
        console.log(cadena);
    }
}




var arbol = new arbolAVL();

/*arbol.insertarnodoAVL1(30,"Sebas","sebbbasdl",21,"sebascss22@gmail.com","451253321");
arbol.insertarnodoAVL1(40,"jorge","jorge1243",21,"sebascss22@gmail.com","451253321");
arbol.insertarnodoAVL1(20,"Ronaldo","cr7",21,"sebascss22@gmail.com","451253321");
arbol.insertarnodoAVL1(10,"Alejandro","ale2000",21,"sebascss22@gmail.com","451253321");
arbol.insertarnodoAVL1(5,"Roberto","robert",21,"sebascss22@gmail.com","451253321");
arbol.insertarnodoAVL1(70,"Javier","javi321",21,"sebascss22@gmail.com","451253321");
arbol.insertarnodoAVL1(7,"Rodrigo","rodri",21,"sebascss22@gmail.com","451253321");
arbol.insertarnodoAVL1(100,"Mariajose","majo",21,"sebascss22@gmail.com","451253321");*/
//arbol.insertarlista2(arbol.raiz,30,100,"Alejandro","sebas@hotmail.com");
//arbol.insertarlista2(arbol.raiz,40,10,"Roberto","sebas@hotmail.com");
//arbol.insertarlista2(arbol.raiz,40,11,"hola","sebas@hotmail.com");
//arbol.insertarlista2(arbol.raiz,70,12,"herbert","sebas@hotmail.com");

//arbol.insertarMatriz2(arbol.raiz,30,"Tarea Fisica",5,12);
//arbol.insertarlista2(arbol.raiz,30,18,"herbert","sebas@hotmail.com");
//arbol.mostrar_nodos(arbol.raiz);
//console.log(arbol.retornaid(arbol.raiz,"cr7","451253321"))
//console.log(arbol.retornaid(arbol.raiz,"sebbbasdl","451253321"))
//console.log(arbol.retornaid(arbol.raiz,"javi321","451253321"))
//console.log(arbol.retornaid(arbol.raiz,"majo","451253321"))
//console.log(arbol.buscarycomprobar(arbol.raiz,"jorge1243","451253321"))
//console.log(arbol.buscarycomprobar(arbol.raiz,"rodri","451253321"))
//let prueba=String(arbol.buscarycomprobar(arbol.raiz,40,"451253321"))
//console.log(arbol.buscar(30,"sebbbasdl","451253321"));
//console.log(arbol.buscar(400,"sebbbasdl","451253321"));
//console.log(arbol.buscar(70,"javi321","451s253321"));
//console.log(arbol.buscar(20,"cr7","451253321"));


//console.log(arbol.buscar2("sebbbasdl1","451253321",false))

//arbol.insertarnodoAVL1(30,"Sebas","sebbbasdl",21,"sebascss22@gmail.com","451253321");
//arbol.insertarlista2(arbol.raiz,30,100,"Alejandro","sebas@hotmail.com");
//arbol.mostrar_nodos(arbol.raiz)

/*let matriz1 = new matriz();

matriz1.insertarMatriz(0,0,0);
matriz1.insertarMatriz(50,0,1);
matriz1.insertarMatriz(5,1,1);
matriz1.insertarMatriz(6,2,3);
matriz1.insertarMatriz(1,10,1);
matriz1.insertarMatriz(2,1,2);
matriz1.insertarMatriz(7,3,3);


matriz1.recorrerMatriz();
matriz1.graficarMatriz();*/



//arbol.cadenaDot();


//console.log(arbol.buscar2("sebbbasdl1","451253321",false))

function obteneravl(){
    
    arbol.cadenaNodos(arbol.raiz)
    
    if(arbol==null){
        console.log("no existe arbol avl")
    }
    return arbol
}

function validar(usuariop, passwordp){
    recuperarAVL()
    //recuperarABB()
    //var arbol=obteneravl();
    var acceso=false
    console.log(usuariop,passwordp)
    
    //arbol.mostrar_nodos(arbol.raiz)
    arbol.buscarycomprobar(arbol.raiz,usuariop,passwordp)
    if(arbol.buscarycomprobar(arbol.raiz,usuariop,passwordp)==true){
        let id1=arbol.retornaid(arbol.raiz,usuariop,passwordp)
        
        acceso=true
        sessionStorage.setItem('usuario',usuariop)
        sessionStorage.setItem('password',passwordp)
        sessionStorage.setItem('id',id1)
        sessionStorage.setItem('arbol',arbol)
        //sessionStorage.setItem('arbolabb',arbolabb)

        
    }

    return acceso

}


function registrarEnListaClientes(idV,idC,nombreC,correoC){
    /*var arbol1=JSON.parse(sessionStorage.getItem('arbol'))
    arbol= new arbolAVL()
    arbol1= JSON.parse(arbol1)
    Object.assign(arbol,arbol1)*/
    /*arbol1=sessionStorage.getItem('arbol')
    if(arbol==arbol1){
        console.log("igual")
    }else{
        console.log("f")
    }
    arbol1.mostrar_nodos(arbol1.raiz)*/
    //var arbolt=CircularJSON.stringify(arbol)
    
    //arbol.insertarlista2(arbol.raiz,idV,idC,nombreC,correoC)
    //sessionStorage.setItem('arbol',JSON.stringify(arbol))
    //JSON.parse(sessionStorage.getItem('arbol'))


    //console.log("estoy aca"+arbol.raiz)
    
    arbol.insertarlista2(arbol.raiz,idV,idC,nombreC,correoC)
    
    sessionStorage.setItem('arbol',JSON.stringify(arbol))
    //console.log("inserte")
    
    

    //arbol.mostrar_nodos(arbol.raiz)

}
//arbol.insertarnodoAVL1(40,"jorge","jorge1243",21,"sebascss22@gmail.com","451253321");

function registrarvendedor1(idRV,nombreRV,usuarioRV,edadRV,correoRV,passwordRV){
    


    
    arbol.insertarnodoAVL1(idRV,nombreRV,usuarioRV,edadRV,correoRV,passwordRV)
    //arbol.insertarlista2(arbol.raiz,30,100,"Alejandro","sebas@hotmail.com");
    sessionStorage.setItem('arbol',JSON.stringify(arbol))
    //arbol.mostrar_nodos(arbol.raiz)
    
}
function recuperarAVL(){
    var arboltemp=JSON.parse(sessionStorage.getItem('arbol',JSON.stringify('arbol')))
    arbol=new arbolAVL()
    //arboltemp=CircularJSON.parse(arboltemp)
    Object.assign(arbol,arboltemp)
    
    //recorreravl(arbol.raiz)





    /*var arbol1= sessionStorage.getItem('arbol')
    arbol= new arbolAVL()
    Object.assign(arbol,arbol1)*/
}

/*function recorreravl(raizprimera){
    if(raizprimera!=null){
        var temp=raizprimera.lista
        var lista2= new listaDobleEnlazada()
        Object.assign(lista2,temp)
        raizprimera.lista=lista2

        recorreravl(raizprimera.derecha)
        recorreravl(raizprimera.izquierda)

        
    }
}*/




//451253321
