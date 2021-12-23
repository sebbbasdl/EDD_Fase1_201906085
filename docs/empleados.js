//Arbol AVL, Lista doble enlazada , Matriz
var idretorna=0
var contador=0

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
        this.listameses=new listaMes();
        //this.matriz=new matriz()

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
                    //rot izquierda
                    
                    if(nuevo.id < raizprimera.izquierda.id){ 
                        //rot izquierda izquierda
                        raizprimera = this.simpleIzquierda(raizprimera);
                    }else{ 
                        // izquierda derecha
                        //console.log("entra a rotacion izquierdaUIERDA derechaECHA");
                        //raizprimera.thisizquierdaaDerecha
                        raizprimera = this.izquierdaDerecha(raizprimera);
                    }
                }
            }else if(raizprimera.id < nuevo.id){
                raizprimera.derecha = this.insertarnodoAVL2(raizprimera.derecha,nuevo);
                if(this.altura(raizprimera.derecha)-this.altura(raizprimera.izquierda)==2){
                    //rotderecha
                    if(nuevo.id > raizprimera.derecha.id){ // 
                        //rot derechax2
                        raizprimera=this.simpleDerecha(raizprimera);
                    }else{//
                        //rot derecha-izquierda
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
    
    altura(nodo){
        if(nodo != null){


            //return this.nodo.altura
            return nodo.altura;
        }else{
            return -1;
        }
    }


    obtenerAlturaMaxima(alto1,alto2){


        if(alto2>=alto1){ 

            //return alto1
            return alto2;
        }else{

            //return alto2
            return alto1;
        }

    }
    
    

    
    
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
            
            nodos1+= "->"+raizprimera.id+" "+raizprimera.usuario+"\t"+raizprimera.password+raizprimera.lista.mostrarlista()+raizprimera.matriz.recorrermatriz2()+"\n";
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
    
    eliminarlista2(raizprimera,id,idcliente){
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

                listaclientes.eliminar(idcliente)
                raizprimera.lista=listaclientes
                sessionStorage.setItem('listad',JSON.stringify(CircularJSON.stringify(listaclientes)))

                console.log(raizprimera.lista.mostrarlista())
                
            }else{
                this.insertarlista2(raizprimera.izquierda,id,idcliente)
                this.insertarlista2(raizprimera.derecha,id,idcliente)
                
                
            }


            
        }
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
                sessionStorage.setItem('listad',JSON.stringify(CircularJSON.stringify(listaclientes)))

                console.log(raizprimera.lista.mostrarlista())
                
            }else{
                this.insertarlista2(raizprimera.izquierda,id,idcliente,nombrec,correoc)
                this.insertarlista2(raizprimera.derecha,id,idcliente,nombrec,correoc)
                
                
            }


            
        }
    }


    insertarlista2MES(raizprimera,id,mes,evento,dias,horas){
        //console.log("muere2")
        //console.log(raizprimera.id)
        if(raizprimera!=null){
           // console.log("muere3")
            if(raizprimera.id==id){
             //   console.log("muere4")
                /*console.log("antes de insertarlista"+raizprimera.id+idcliente+nombrec+correoc)
                console.log(raizprimera.lista)
                raizprimera.lista.insertarlista(idcliente,nombrec,correoc);**/


                
                console.log("entre")
                
                //listaclientes.mostrarlista()

                //raizprimera.lista=listaclientes
                //console.log("estoy aca")
                let listamesclientes= new listaMes()
                let matrizmes=new matriz()
                let matrizaux=new matriz()


                if(contador==0){
                    matrizaux.insertarMatriz(0,0,0)
                    console.log(matrizaux)
                    raizprimera.listameses.matriz1=matrizaux
                    console.log(raizprimera.listameses.matriz1)
                    contador+=1

                }
                console.log("soy contador "+contador)
                //raizprimera.listameses.matriz1.insertarMatriz(" ",0,0)
                let aux= raizprimera.listameses.primero

                //console.log(raizprimera.listameses.matriz1)
                
                //insertar  listamesclientes
                while(aux!=null){
                    var dato1=aux.mes
                    console.log(evento+dias+horas)
                    listamesclientes.insertarlistaMes(dato1)
                   
                    aux=aux.siguiente
                }
                console.log(listamesclientes)

                //recorrido lmc

                
                
                /*let auxm=raizprimera.listameses.matriz1.cabecerasDias.primero
                console.log(matrizmes.cabecerasDias.primero)
                while(aux!=null){
                    var dato1=aux.mes
                    console.log(evento+dias+horas)
                    listamesclientes.insertarlistaMes(dato1)
                   
                    aux=aux.siguiente
                }*/
                //raizprimera.listameses.matriz1.insertarMatriz(0,0,0)




                let auxm=raizprimera.listameses.matriz1.cabecerasDias.primero
                console.log(auxm)

                while(auxm!=null){
                    //cadenaMatriz+="   dias->"+aux.dato;
                    //console.log("   dias->"+aux.dato);
                    let aux2 = auxm.listaInterna.primero;
                    while(aux2!=null){
                        //cadenaMatriz+="       2-"+aux2.valor
                        //console.log("       2-"+aux2.valor);
                        //aux2 = aux2.sig;
                        let aux3 =raizprimera.listameses.matriz1.cabecerasHoras.primero
                        while(aux3 != null){
                            //cadenaMatriz+="   horas->"+aux3.dato
                            //console.log("   horas->"+aux3.dato);
                            let aux4 = aux3.listaInterna.primero;
                            while(aux4!= null){
                                //console.log("2-"+aux2.valor)
                                //console.log("4-"+aux4.valor)
                                //cadenaMatriz+="       4-"+aux4.valor
                                //console.log("       4-"+aux4.valor);

                            if(aux2.valor==aux4.valor){
                                    console.log("dato2: "+aux4.valor +" dia: "+auxm.dato+" hora: "+aux3.dato)
                                    matrizmes.insertarMatriz(aux4.valor,auxm.dato,aux3.dato)

                                    //cadenaMatriz+="       hola-"+aux4.valor
                                    //console.log("       hola-"+aux4.valor);

                                }
                                
                                aux4 = aux4.abajo;
                            }
                        
                            aux3=aux3.sig
                            
                        }
                        aux2=aux2.sig

                    }
                    auxm=auxm.sig
                }

                
                //console.log(res)
                /*if(listamesclientes.existeMes(mes)==true){
                    matrizmes.insertarMatriz(evento,dias,horas)
                    //console.log(matrizmes)
                    //raizprimera.listameses=listamesclientes
                    raizprimera.listameses.matriz1=matrizmes

                }else{
                    listamesclientes.insertarlistaMes(mes)

                    matrizmes.insertarMatriz(evento,dias,horas)
                    //console.log(matrizmes)
                    raizprimera.listameses=listamesclientes
                    raizprimera.listameses.matriz1=matrizmes
                    

                }*/
                
                let auxlmc=listamesclientes.primero
                console.log("soy auxlmc"+auxlmc)
                while(auxlmc!=null){
                    console.log("estoy")
                    if(auxlmc.mes==mes){
                        console.log("estoy en mes y mes")
                        //matrizmes.insertarMatriz(evento,dias,horas)
                        //console.log(matrizmes)
                        //raizprimera.listameses=listamesclientes
                        auxlmc.matriz1=matrizmes
                        console.log(mes)
                        console.log(auxlmc.matriz1.graficarMatriz())

                        break;
                        //sessionStorage.setItem('listameses',JSON.stringify(CircularJSON.stringify(listamesclientes)))
                        

                    }
                    auxlmc=auxlmc.siguiente
                    
                        
                        

                    
                    
                }

                //console.log("estoy en else")
                listamesclientes.insertarlistaMes(mes)

                matrizmes.insertarMatriz(evento,dias,horas)
                //console.log(matrizmes)
                raizprimera.listameses=listamesclientes
                raizprimera.listameses.matriz1=matrizmes
                


                

                /*listamesclientes.insertarlistaMes(mes)

                matrizmes.insertarMatriz(evento,dias,horas)
                //console.log(matrizmes)
                raizprimera.listameses=listamesclientes
                raizprimera.listameses.matriz1=matrizmes
                //res=raizprimera.listameses*/
                
            
                sessionStorage.setItem('listameses',JSON.stringify(CircularJSON.stringify(listamesclientes)))
                sessionStorage.setItem('matriz1',JSON.stringify(CircularJSON.stringify(matrizmes)))
                console.log(raizprimera.listameses.matriz1)
                console.log(raizprimera.listameses)

                //console.log(raizprimera.listameses.mostrarlistaMes())
                //console.log(raizprimera.listameses.matriz1.graficarMatriz())
                //console.log(raizprimera.listameses)
                //console.log(raizprimera.listameses.matriz1.existeMes(mes))
                
            }else{
                this.insertarlista2MES(raizprimera.izquierda,id,mes,evento,dias,horas)
                this.insertarlista2MES(raizprimera.derecha,id,mes,evento,dias,horas)
                
                
            }


            
        }
    }



    insertarMatriz2(raizprimera,id,evento,dia,hora){
        
        if(raizprimera!=null){
            if(raizprimera.id==id){
                /*//raizprimera.matriz.insertarMatriz(evento,dia,hora)

                //let cadenaMatriz ="cabecera dias"

                //console.log("cabeceras dias")
                //recuperarListaMatriz()
                //recuperarMatriz()
                let matrizclientes= new matriz()
                //let aux=matrizclientes.listaCab.primero
                
                //let aux=raizprimera.matriz.cabecerasDias.primero
                //let aux= listaCab.primero
                //raizprimera.matriz.insertarMatriz(evento,dia,hora)
                //matriz1.cabecerasDias=new listaCabecera()
                //matriz1.cabecerasHoras=new listaCabecera()
                //aux=raizprimera.matriz.cabecerasHoras.primero
                
                matrizclientes.cabecerasDias=new listaCabecera()
                matrizclientes.cabecerasHoras=new listaCabecera()

                let aux=matrizclientes.cabecerasDias.primero

                console.log(aux)

                while(aux!=null){
                    //cadenaMatriz+="   dias->"+aux.dato;
                    //console.log("   dias->"+aux.dato);
                    let aux2 = aux.listaInterna.primero;
                    while(aux2!=null){
                        //cadenaMatriz+="       2-"+aux2.valor
                        //console.log("       2-"+aux2.valor);
                        //aux2 = aux2.sig;
                        let aux3 =raizprimera.matriz.cabecerasHoras.primero
                        while(aux3 != null){
                            //cadenaMatriz+="   horas->"+aux3.dato
                            //console.log("   horas->"+aux3.dato);
                            let aux4 = aux3.listaInterna.primero;
                            while(aux4!= null){
                                //console.log("2-"+aux2.valor)
                                //console.log("4-"+aux4.valor)
                                //cadenaMatriz+="       4-"+aux4.valor
                                //console.log("       4-"+aux4.valor);

                            if(aux2.valor==aux4.valor){
                                    console.log("dato2: "+aux4.valor +" dia: "+aux.dato+" hora: "+aux3.dato)
                                    matrizclientes.insertarMatriz(aux4.valor,aux.dato,aux3.dato)

                                    //cadenaMatriz+="       hola-"+aux4.valor
                                    //console.log("       hola-"+aux4.valor);

                                }
                                
                                aux4 = aux4.abajo;
                            }
                        
                            aux3=aux3.sig
                            
                        }
                        aux2=aux2.sig

                    }
                    aux=aux.sig
                }
                console.log(evento,dia,hora)
                matrizclientes.insertarMatriz(evento,dia,hora)
                raizprimera.matriz=matrizclientes

                sessionStorage.setItem('matriz1',JSON.stringify(CircularJSON.stringify(matrizclientes)))
                
                raizprimera.matriz.recorrermatriz2()
    
                */
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
        this.anterior = null;
        //this.matriz1=new matriz()
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
            nuevo.anterior = aux;
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

    eliminar(id){
        
        let aux=this.primero
        console.log(aux.idcliente)
        //console.log(aux.anterior)

       
        while(aux!=null){
            //console.log(aux.idcliente)
            
            if(aux.anterior!=null && aux.siguiente!=null && aux.idcliente==id){
                //console.log("entre1")
                //aux.siguiente=
                aux.anterior.siguiente=aux.siguiente
                aux.siguiente.anterior=aux.anterior
                break;

            }else{
                if(aux.siguiente==null && aux.idcliente==id){
                //console.log("hola")
                aux=aux.anterior
                aux.siguiente=null
                break;
                }else{
                    if(aux.anterior==null && aux.idcliente==id){
                        console.log("entre3")
                        console.log(aux.idcliente)
                        aux=aux.siguiente
                        aux.anterior=null
                        //return aux.idcliente
                        break;
        
                    
                    }
                }

            }
            aux=aux.siguiente

            
        }
        return aux.idcliente

        
        //return aux.idcliente

    
    }

    
}


class nodolistaMes{
    constructor(mes){
        this.mes = mes;
        this.siguiente = null;
        this.anterior = null;
        this.matriz1 = new matriz()
    }
    
}

class listaMes{
    constructor(){
        this.primero = null;
    }

    insertarlistaMes(mes){
        let nuevo = new nodolistaMes(mes); 

        //console.log(mes)
        if(mes==1 | mes==2 | mes==3 | mes==4 | mes==5 | mes==6 | mes==7 | mes==8 | mes==9 | mes==10 | mes==11 | mes==12){
            if(this.primero == null){ 
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux.siguiente != null){
                    if(aux.mes==mes){
                        console.log("No se puede insertar el valor por que ya existe");
                        //return
                    }
                    aux = aux.siguiente;
                };
                if(aux.mes==mes){
                    console.log("No se puede insertar el valor por que ya existe");
                    //return
                }
                aux.siguiente = nuevo;
                nuevo.anterior = aux;
            }
            

        }else{
            console.log("El valor es incorrecto")

        }
        
    }

    

    mostrarlistaMes(){
        let datos=""
        datos+=" lista[ "
        let aux = this.primero;
        while(aux != null){
            datos += aux.mes+" "
            aux = aux.siguiente;
        }
        datos +="]"
        return datos
    }

    existeMes(mes){
        let aux=this.primero
        let bool =false
        
        while(aux != null){
            if(aux.mes==mes){
                bool=true
                return bool
            }
            aux=aux.siguiente
        }
        return bool

        
    }

}


//mesprueba.valorMes(1)
// INICIA MATRIZ DINAMICA

class nodoInterno{
    constructor(valor,dia,hora){
        this.valor = valor;
        this.dia = dia;
        this.hora = hora;

        this.sig = null;
        this. anterior = null;
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
                this.primero. anterior = nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.hora < aux.hora){
                        nuevo.sig = aux;
                        nuevo. anterior = aux. anterior;
                        aux. anterior.sig = nuevo;
                        aux. anterior= nuevo;
                        break;
                    }else if(nuevo.dia == aux.dia && nuevo.hora == aux.hora){
                        console.log("La posicion ya esta ocupada-> "+nuevo.dia+","+nuevo.hora);
                        break;
                    }else{
                        if(aux.sig ==null){
                            aux.sig=nuevo;
                            nuevo. anterior = aux;
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
        this. anterior = null;
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

                this.primero. anterior=nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.dato < aux.dato){
                        nuevo.sig = aux;
                        nuevo. anterior = aux. anterior;
                        aux. anterior.sig = nuevo;
                        aux. anterior = nuevo;
                        break;
                    }else{
                        if(aux.sig == null){
                            aux.sig = nuevo;
                            nuevo. anterior = aux;
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

    

    recorrermatriz2(){
        let cadenaMatriz ="cabecera dias"

        console.log("cabeceras dias")

        let aux= this.cabecerasDias.primero
        

        while(aux!=null){
            //cadenaMatriz+="   dias->"+aux.dato;
            //console.log("   dias->"+aux.dato);
            let aux2 = aux.listaInterna.primero;
            while(aux2!=null){
                //cadenaMatriz+="       2-"+aux2.valor
                //console.log("       2-"+aux2.valor);
                //aux2 = aux2.sig;
                let aux3 =this.cabecerasHoras.primero
                while(aux3 != null){
                    //cadenaMatriz+="   horas->"+aux3.dato
                    //console.log("   horas->"+aux3.dato);
                    let aux4 = aux3.listaInterna.primero;
                    while(aux4!= null){
                        //console.log("2-"+aux2.valor)
                        //console.log("4-"+aux4.valor)
                        //cadenaMatriz+="       4-"+aux4.valor
                        //console.log("       4-"+aux4.valor);

                       if(aux2.valor==aux4.valor){
                            console.log("dato2: "+aux4.valor +" dia: "+aux.dato+" hora: "+aux3.dato)
                            //cadenaMatriz+="       hola-"+aux4.valor
                            //console.log("       hola-"+aux4.valor);

                        }
                        
                        aux4 = aux4.abajo;
                    }
                    //aux4 = aux4.abajo;
                    aux3=aux3.sig
                    //aux2=aux2.sig
                }
                aux2=aux2.sig

            }
            aux=aux.sig
        }
        return cadenaMatriz
    }

    graficarMatriz(){
        let cadena="";
        cadena+= "digraph Matriz{ \n";
        cadena+= "node[shape = box3d,width=0.7,height=0.7,fillcolor=\"lavender\" color=\"black\" style=\"filled\"];\n";
        cadena+= "edge[style = \"bold\"]; \n"
        cadena+="node[label = Calendario fillcolor=\"cornflowerblue\" pos = \"-1,1!\"]principal;"
        let auxDias = this.cabecerasDias.primero;
        while(auxDias!=null){
            cadena+="node[label = DIA"+auxDias.dato+" fillcolor=\" lavender\" pos = \""+auxDias.dato+",1!\"]x"+auxDias.dato+";\n"
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
            cadena+="node[label = HORA"+auxHoras.dato+" fillcolor=\" lavender\" pos = \"-1,-"+auxHoras.dato+"!\"]y"+auxHoras.dato+";\n"
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
                cadena+="   node[label = "+aux.valor+" fillcolor=\" red\" pos = \""+aux.dia+",-"+aux.hora+"!\"]x"+aux.dia+"y"+aux.hora+";\n"
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
        return cadena
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

/*let matriz2 = new matriz();

matriz2.insertarMatriz(57,5,7);
//matriz1.insertarMatriz(32,3,2);
//matriz1.insertarMatriz(25,2,5);
//matriz1.insertarMatriz(53,5,3);
matriz2.insertarMatriz(67,6,7);
matriz2.insertarMatriz(18,1,8);
matriz2.insertarMatriz(74,7,4);
matriz2.insertarMatriz(57,5,7)


matriz2.recorrerMatriz();
matriz2.graficarMatriz();*/
/*matriz2.insertarMatriz(57,5,7)
matriz2.insertarMatriz(74,5,4);
matriz2.insertarMatriz(87,5,6)
matriz2.insertarMatriz(94,5,8);
matriz2.insertarMatriz(100,1,7)
matriz2.insertarMatriz(44,4,5);

matriz2.recorrermatriz2();*/

//arbol.cadenaDot();


//console.log(arbol.buscar2("sebbbasdl1","451253321",false))

/*let mesprueba= new listaMes()
mesprueba.insertarlistaMes(2)
mesprueba.insertarlistaMes(3)
mesprueba.insertarlistaMes(4)
console.log(mesprueba.mostrarlistaMes())
console.log(mesprueba.existeMes(11))*/


/*listaxd=new listaDobleEnlazada()
listaxd.insertarlista(10,"Sbas","sss@gmaiñ.com")
listaxd.insertarlista(20,"Sbas","sss@gmaiñ.com")
listaxd.insertarlista(22,"Sbas","sss@gmaiñ.com")
listaxd.insertarlista(24,"Sbas","sss@gmaiñ.com")
console.log(listaxd.eliminar(22))

console.log(listaxd.mostrarlista())*/

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

function registrarEnListaMes(idv,mes,evento,dia,hora) {
    //console.log("muere")
    arbol.insertarlista2MES(arbol.raiz,idv,mes,evento,dia,hora)
    sessionStorage.setItem('arbol',JSON.stringify(CircularJSON.stringify(arbol)))
}
function registrarEnListaClientes(idV,idC,nombreC,correoC){
    
    arbol.insertarlista2(arbol.raiz,idV,idC,nombreC,correoC)
    
    
    //sessionStorage.setItem('arbol',JSON.stringify(arbol))
    sessionStorage.setItem('arbol',JSON.stringify(CircularJSON.stringify(arbol)))
    //console.log("inserte")
    
    

    //arbol.mostrar_nodos(arbol.raiz)

}
function eliminarcliente1(idv,id){
    arbol.eliminarlista2(arbol.raiz,idv,id)
    
    
    //sessionStorage.setItem('arbol',JSON.stringify(arbol))
    sessionStorage.setItem('arbol',JSON.stringify(CircularJSON.stringify(arbol)))
}
//arbol.insertarnodoAVL1(40,"jorge","jorge1243",21,"sebascss22@gmail.com","451253321");

function registrarvendedor1(idRV,nombreRV,usuarioRV,edadRV,correoRV,passwordRV){
    


    
    arbol.insertarnodoAVL1(idRV,nombreRV,usuarioRV,edadRV,correoRV,passwordRV)
    //arbol.insertarlista2(arbol.raiz,30,100,"Alejandro","sebas@hotmail.com");
    sessionStorage.setItem('arbol',JSON.stringify(CircularJSON.stringify(arbol)))

    arbol.cadenaDot()
    //sessionStorage.setItem('arbol',JSON.stringify(arbol))
    //arbol.mostrar_nodos(arbol.raiz)
    
}

function registrarevento(idE,evento,dia,hora){
    //console.log("muere")
    
    arbol.insertarMatriz2(arbol.raiz,idE,evento,dia,hora)
    //sessionStorage.setItem('matriz1',JSON.stringify(CircularJSON.stringify(matriz1)))
}


function recuperarAVL(){
    var arboltemp=CircularJSON.parse(JSON.parse(sessionStorage.getItem('arbol')))
    arbol=new arbolAVL()
    //arboltemp=CircularJSON.parse(arboltemp)
    Object.assign(arbol,arboltemp)
    
    //recorreravl(arbol.raiz)
    /*var arbol1= sessionStorage.getItem('arbol')
    arbol= new arbolAVL()
    Object.assign(arbol,arbol1)*/
}

function recuperarListaDoble(){
    var listatemp1=CircularJSON.parse(JSON.parse(sessionStorage.getItem('listad')))
    listad=new listaDobleEnlazada()
    //arboltemp=CircularJSON.parse(arboltemp)
    Object.assign(listad,listatemp1)

}
function recuperarListaMes(){
    var listaMestemp1=CircularJSON.parse(JSON.parse(sessionStorage.getItem('listameses')))
    listameses=new listaDobleEnlazada()
    //arboltemp=CircularJSON.parse(arboltemp)
    Object.assign(listameses,listaMestemp1)

    var matriztemp1=CircularJSON.parse(JSON.parse(sessionStorage.getItem('matriz1')))
    matriz1=new matriz()
    Object.assign(matriz1,matriztemp1)
    //matriz1.insertarMatriz(0,0,0)
}

function recuperarMatriz() {
    var matriztemp1=CircularJSON.parse(JSON.parse(sessionStorage.getItem('matriz1')))
    matriz1=new listaDobleEnlazada()
    Object.assign(matriz1,matriztemp1)

   /* recuperarListaMatriz()

    listaCab=matriz1.cabecerasDias.primero
    listaCab2=matriz1.cabecerasHoras.primero
    

    
    //let aux= this.cabecerasDias.primero
      let aux= listaCab

        while(aux!=null){
            //cadenaMatriz+="   dias->"+aux.dato;
            //console.log("   dias->"+aux.dato);
            //let aux2 = aux.listaInterna.primero;
            let aux2=aux.listaInterna.primero
            while(aux2!=null){
                //cadenaMatriz+="       2-"+aux2.valor
                //console.log("       2-"+aux2.valor);
                //aux2 = aux2.sig;
                //let aux3 =this.cabecerasHoras.primero
                let aux3= listaCab2
                while(aux3 != null){
                    //cadenaMatriz+="   horas->"+aux3.dato
                    //console.log("   horas->"+aux3.dato);
                    //let aux4 = aux3.listaInterna.primero;
                    let aux4=aux3.listaInterna.primero
                    while(aux4!= null){
                        //console.log("2-"+aux2.valor)
                        //console.log("4-"+aux4.valor)
                        //cadenaMatriz+="       4-"+aux4.valor
                        //console.log("       4-"+aux4.valor);

                       if(aux2.valor==aux4.valor){
                            console.log("dato2: "+aux4.valor +" dia: "+aux.dato+" hora: "+aux3.dato)
                            //cadenaMatriz+="       hola-"+aux4.valor
                            //console.log("       hola-"+aux4.valor);

                        }
                        
                        aux4 = aux4.abajo;
                    }
                    //aux4 = aux4.abajo;
                    aux3=aux3.sig
                    //aux2=aux2.sig
                }
                aux2=aux2.sig

            }
            aux=aux.sig
        }

       */ 

}

function recuperarListaMatriz(){
    var listaCabtem=JSON.parse(sessionStorage.getItem("listaCab"))
    listaCab=new listaCabecera()
    listaCabtem=CircularJSON.parse(listaCabtem)
    Object.assign(listaCab,listaCabtem)

    var listaCabtem2=JSON.parse(sessionStorage.getItem("listaCab2"))
    listaCab2=new listaCabecera()
    listaCabtem2=CircularJSON.parse(listaCabtem2)
    Object.assign(listaCab2,listaCabtem2)

    let aux=listaCab.primero
    let aux2=listaCab2.primero

    while (aux!=null && aux2!=null){
        var temp=aux.listaInterna
        var listaInt= new listaInterna()
        var temp2=aux.listaInterna
        var listaInt2= new listaInterna()
        Object.assign(listaInt,temp)
        Object.assign(listaInt2,temp2)
        aux.listaInterna=listaInt
        aux2.listaInterna=listaInt2
        aux=aux.siguiente
        aux2=aux.siguiente
    }

}

/*function recuperarlistaMes {
    //var listaMestemp1=CircularJSON.parse(JSON.parse(sessionStorage.getItem('listameses')))
    listameses=new listaMes()
    //arboltemp=CircularJSON.parse(arboltemp)
    Object.assign(listameses,listaMestemp1)

    var listaMestemp1= CircularJSON.parse(JSON.parse(sessionStorage.getItem('listameses')))



    
}*/

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
