class nodoB{
    constructor(idPro,nombre,precio,cantidad){
        this.idPro = idPro;
        this.nombre=nombre
        this.precio=precio
        this.cantidad=cantidad
        this.siguiente = null; 
        this.anterior = null;
        this.izq = null;
        this.der = null;
    }
}

//inicia lista nodo 
class lista_nodoB{
    constructor(){
        this.primero = null;
        this.ultimo = null;
        this.size=0;
    }

    insertar(nuevo){
        if(this.primero == null){
            this.primero = nuevo;
            this.ultimo = nuevo;
            this.size++;
            return true;
        }else{
            if(this.primero == this.ultimo){
                if(nuevo.idPro < this.primero.idPro){
                    nuevo.siguiente = this.primero;
                    this.primero.anterior = nuevo;
                    this.primero.izq = nuevo.der;
                    //console.log(primero.izq)
                    //primero.der=this.primero.izq
                    this.primero = nuevo;
                    this.size++;
                    //return false
                    return true;
                }else if(nuevo.idPro> this.ultimo.idPro){
                    this.ultimo.siguiente = nuevo;
                    nuevo.anterior = this.ultimo;
                    this.ultimo.der = nuevo.izq;

                    this.ultimo = nuevo;
                    this.size++;
                    //return false
                    return true;

                    //break
                }else{ 
                    console.log("Ya existe un idPro con ese valor en la lista nodoB");
                    return false;
                }
            }else{ //Existe mas de un idPro
                if(nuevo.idPro < this.primero.idPro){
                    nuevo.siguiente = this.primero;
                    this.primero.anterior = nuevo;
                    
                    this.primero.izq = nuevo.der;

                    this.primero = nuevo;
                    this.size++;
                    return true;
                }else if(nuevo.idPro> this.ultimo.idPro){
                    this.ultimo.siguiente = nuevo;
                    nuevo.anterior = this.ultimo;
                    this.ultimo.der = nuevo.izq;
                    this.ultimo = nuevo;
                    this.size++;
                    return true;
                }else{
                    let aux = this.primero;
                    while(aux != null){
                        if(nuevo.idPro < aux.idPro){
                            nuevo.siguiente = aux;
                            nuevo.anterior = aux.anterior;
                            
                            aux.izq= nuevo.der;
                            aux.anterior.der = nuevo.izq;
                            aux.anterior.siguiente = nuevo;
                            aux.anterior = nuevo;
                            this.size++;
                            return true;
                        }else if(nuevo.idPro == aux.idPro){
                            console.log("Ya existe un idPro con ese valor en la lista");
                            return false;
                        }else{
                            aux = aux.siguiente;
                        }
                    }
                }
            }
        }
    }
}

class pagina{
    constructor(){
        this.raiz = false;
        this.Claves_max = 4;
        this.Claves_min = 2;
        this.size =0;
        this.Claves = new lista_nodoB();
    }

    insertarEnPagina(nodo){
        if(this.Claves.insertar(nodo)){
            this.size = this.Claves.size;
            if(this.size < 5){
                return this;
            }else if(this.size == 5){ //dividir pagina
                return this.divPagina(this);
            }
        }
        return null;
    }

    divPagina(pag){
        let temp = pag.Claves.primero;
        for(var i=0; i<2;i++){ //ubicarnos en la posicion [2] de la lista (mitad)
            temp = temp.siguiente;
        }

        //pasar valores de la pagina a nodos independientes
        let primero = pag.Claves.primero;
        let segundo = pag.Claves.primero.siguiente;
        let tercero = temp.siguiente;
        let cuarto = pag.Claves.ultimo;

        primero.siguiente = null;
        primero.anterior = null;

        segundo.siguiente = null;
        segundo.anterior = null;

        tercero.siguiente = null;
        tercero.anterior = null;

        cuarto.siguiente = null;
        cuarto.anterior = null;

        temp.siguiente = null;
        temp.anterior = null;

        //** crear nuevas paginas */
        let pag_izquierda = new pagina();
        pag_izquierda.insertarEnPagina(primero);
        pag_izquierda.insertarEnPagina(segundo);

        let pag_dercha = new pagina();
        pag_dercha.insertarEnPagina(tercero);
        pag_dercha.insertarEnPagina(cuarto);

        temp.izq = pag_izquierda;
        temp.der = pag_dercha;

        return temp;
    }

    esHoja(pag){
        if(pag.Claves.primero.izq==null){
            return true;
        }else{
            return false;
        }
    }
}
//empieza arbol b
class ArbolB{
    constructor(){
        this.raiz = null;
        this.orden =5;
        this.altura =0;
    }

    insertarNodoArbolB(idPro,nombre,precio,cantidad){
        let nuevo = new nodoB(idPro,nombre,precio,cantidad);
        
        if(this.raiz == null){
            this.raiz = new pagina();
            this.raiz.raiz = true;
            this.raiz = this.raiz.insertarEnPagina(nuevo);
            //console.log("se inserto el valor "+this.raiz.Claves.primero.idPro);
        }else{
            if(this.altura==0){
                let respuesta = this.raiz.insertarEnPagina(nuevo);
                if(respuesta instanceof pagina){
                    this.raiz = respuesta;
                }else{
                    this.altura++;
                    this.raiz = new pagina();
                    this.raiz = this.raiz.insertarEnPagina(respuesta);
                }
            }else{ 
                if(this.raiz == null){
                    console.log("la raiz es null ")
                    return;
                }   
                let respuesta = this.insertar_recorrer(nuevo,this.raiz);
                if(respuesta instanceof nodoB){ 
                    this.altura++;
                    this.raiz = new pagina();
                    this.raiz = this.raiz.insertarEnPagina(respuesta);
                }else if(respuesta instanceof pagina){
                    this.raiz = respuesta;
                }
            }
        }
    }

    insertar_recorrer(nuevo, pagina_actual){
        if(pagina_actual.esHoja(pagina_actual)){
            let respuesta = pagina_actual.insertarEnPagina(nuevo);
            return respuesta;
        }else{
            if(nuevo.idPro < pagina_actual.Claves.primero.idPro){ 
                let respuesta = this.insertar_recorrer(nuevo,pagina_actual.Claves.primero.izq);
                if(respuesta instanceof nodoB){ 
                    return pagina_actual.insertarEnPagina(respuesta);
                }else if(respuesta instanceof pagina){
                    pagina_actual.Claves.primero.izq = respuesta;
                    return pagina_actual;
                }
            }else if(nuevo.idPro > pagina_actual.Claves.ultimo.idPro){ 
                let respuesta = this.insertar_recorrer(nuevo,pagina_actual.Claves.ultimo.der);
                if(respuesta instanceof nodoB){ 
                    return pagina_actual.insertarEnPagina(respuesta);
                }else if(respuesta instanceof pagina){
                    pagina_actual.Claves.ultimo.der = respuesta;
                    return pagina_actual;
                }
            }else{ 
                let aux = pagina_actual.Claves.primero;

                while(aux != null){
                    if(nuevo.idPro < aux.idPro){
                        let respuesta = this.insertar_recorrer(nuevo, aux.izq);
                        if(respuesta instanceof nodoB){
                            return pagina_actual.insertarEnPagina(respuesta);
                        }else if(respuesta instanceof pagina){
                            aux.izq = respuesta;
                            aux.anterior.der = respuesta;
                            return pagina_actual;
                        }
                    }else if(nuevo.idPro == aux.idPro){
                        return pagina_actual;
                    }else{
                        aux = aux.siguiente;
                    }
                }
            }
        }
        return this;
    }

    graficar(){
        let cadena="digraph arbolB{\n";
        cadena+="rankr=TB;\n";
        cadena+="node[shape = box,fillcolor=\"azure2\" color=\"red\" style=\"rounded\"];\n";
        //metodos para graficar el arbol
        cadena+= this.nodosArbolB(this.raiz);
        cadena+=  this.enlacesArbolB(this.raiz);
        cadena+="}\n"

        return cadena;
    }

    nodosArbolB(raiz_actual){
        let cadena="";

        if(raiz_actual.esHoja(raiz_actual)){ //si es un hhoja solo grafica el nodo
            cadena+="node[shape=record label= \"<p0>"
            let contador=0;
            let aux = raiz_actual.Claves.primero;
            while(aux!=null){
                contador++;
                cadena+="|{"+aux.idPro+" "+aux.nombre+"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            cadena+="\"]"+raiz_actual.Claves.primero.idPro+";\n";
            return cadena;
        }else{
            cadena+="node[shape=record label= \"<p0>"
            let contador=0;
            let aux = raiz_actual.Claves.primero;
            while(aux!=null){
                contador++;
                cadena+="|{"+aux.idPro+" "+aux.nombre+"}|<p"+contador+"> ";
                aux= aux.siguiente;
            }
            cadena+="\"]"+raiz_actual.Claves.primero.idPro+";\n";

            //recorrer los hicos de cada clave
            aux = raiz_actual.Claves.primero;
            while(aux != null){
                cadena+= this.nodosArbolB(aux.izq);
                aux = aux.siguiente;
            }
            cadena+= this.nodosArbolB(raiz_actual.Claves.ultimo.der);
            return cadena;
        }   
    }

    enlacesArbolB(raiz_actual){
        let cadena="";
        if(raiz_actual.esHoja(raiz_actual)){
            return ""+raiz_actual.Claves.primero.idPro+";\n";
        }else{
            //cadena += ""+raiz_actual.Claves.primero.idPro+";\n";

            let aux = raiz_actual.Claves.primero;
            let contador =0;
            let raiz_actual_txt = raiz_actual.Claves.primero.idPro;
            while(aux != null){
                cadena+= "\n"+raiz_actual_txt+":p"+contador+"->"+this.enlacesArbolB(aux.izq);
                contador++;
                aux = aux.siguiente;
            }
            cadena+="\n"+raiz_actual_txt+":p"+contador+"->"+this.enlacesArbolB(raiz_actual.Claves.ultimo.der);
            return cadena;
        }
    }
}


class nodolistadoble1{
    constructor(idPro,nombre,precio,cantidad){
        this.idPro = idPro;
        this.nombre=nombre
        this.precio=precio
        this.cantidad=cantidad
        this.siguiente = null;
        this.anterior = null;
        //this.matriz1=new matriz()
    }
    
}

class listaDobleEnlazada1{
    constructor(){
        this.primero = null;
    }

    insertarlista(idPro,nombre,precio,cantidad){
        let nuevo = new nodolistadoble1(idPro,nombre,precio,cantidad); 

        if(this.primero == null){ 
            this.primero = nuevo;
        }else{
            let aux = this.primero;
            while(aux.siguiente != null){
                if(aux.idPro==idPro){
                    console.log("No se puede insertar el valor por que ya existe");
                    //return
                }
                aux = aux.siguiente;
            };
            if(aux.idPro==idPro){
                console.log("No se puede insertar el valor por que ya existe");
                //return
            }
            aux.siguiente = nuevo;
            nuevo.anterior = aux;
        }
    }

    mostrarlista(){
        let datos=""
        datos+=" lista[ "
        let aux = this.primero;
        while(aux != null){
            datos += +aux.idPro +" "+aux.nombre+" "
            aux = aux.siguiente;
        }
        datos +="]"
        return datos
    }

    existePro(idPro){
        let aux=this.primero
        let cadena=""
        
        while(aux != null){
            if(aux.idPro==idPro){
                cadena= aux.precio
                return cadena
            }
            aux=aux.siguiente
        }
        return null

        
    }

}

var listaA= new listaDobleEnlazada1()

//listaA.insertarlista(20,"cocacola",40,100)
//console.log(listaA.existePro(20))

//console.log(listaA.mostrarlista())
var arbolb= new ArbolB();

/*arbolb.insertarNodoArbolB(20,"cocacola",20,100)
arbolb.insertarNodoArbolB(30,"pepsi",30,100)
console.log(arbolb.nodosArbolB(arbolb.raiz))
console.log(arbolb.graficar())*/

function registrarproducto(idpro,nombre, precio,cantidad ){

    //arbolb.insertarNodoArbolB(idpro,nombre,precio,cantidad)
    //sessionStorage.setItem('arbolb',JSON.stringify(arbolb))
    //sessionStorage.setItem('arbolb',JSON.stringify(arbolb))
    //sessionStorage.setItem('arbolb',JSON.stringify(CircularJSON.stringify(arbolb)))
    
    //var arbolbtemp1=CircularJSON.stringify(arbolb)
    //var arbolbtemp2=JSON.stringify(arbolbtemp1)
    //sessionStorage.setItem("arbolb",arbolbtemp2)
    //console.log(arbolb.graficar())
    recuperarlistadearbol()
    arbolb=new ArbolB()
    listaA.insertarlista(idpro,nombre,precio,cantidad)
    sessionStorage.setItem('listaA',JSON.stringify(CircularJSON.stringify(listaA)))
    console.log(listaA.mostrarlista())

    let aux=listaA.primero
        while(aux != null){

            arbolb.insertarNodoArbolB(aux.idPro,aux.nombre,aux.precio,aux.cantidad)
            
            aux=aux.siguiente
        }
    sessionStorage.setItem('arbolb',JSON.stringify(CircularJSON.stringify(arbolb)))
    console.log(arbolb.graficar())
}

function recuperarB(){
    /*var arbolbtemp1=JSON.parse(sessionStorage.getItem('arbolb',JSON.stringify('arbolb')))
    arbolb=new ArbolB()
    //arboltemp=CircularJSON.parse(arboltemp)
    Object.assign(arbolb,arbolbtemp1)*/

    /*var arbolbtemp=JSON.parse(CircularJSON.parse(sessionStorage.getItem('arbolb')))
    arbolb=new ArbolB()
    
    Object.assign(arbolb,arbolbtemp)*/

    var arbolbtemp = JSON.parse(sessionStorage.getItem("arbolb"))
    arbolb= new ArbolB()
    arbolbtemp=CircularJSON.parse(arbolbtemp)
    Object.assign(arbolb,arbolbtemp)
    


}

function recuperarlistadearbol(){
    var listaAtemp1=CircularJSON.parse(JSON.parse(sessionStorage.getItem('listaA')))
    listaA=new listaDobleEnlazada1()
    //arboltemp=CircularJSON.parse(arboltemp)
    Object.assign(listaA,listaAtemp1)
}

