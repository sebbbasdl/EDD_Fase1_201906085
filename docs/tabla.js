class nodot{
    constructor(id,nombreV,nombreC,total){
        this.id = id;
        this.nombreV=nombreV
        this.nombreC=nombreC
        this.total=total
        this.listaproductos=[]
    }
}

class hash{
    constructor(){
        this.claves = this.inicioArreglo(7);
        this.claves_usadas=0;
        this.size = 7;
    }
    calcularHash(id){
        //metodo de division
        let resultado=0;
        resultado= id % this.size;
        return resultado;
    }

    inicioArreglo(tamaño){
        let claves=[];
        for(var i =0;i<tamaño,i++;){
            claves[i] = null;
        }
        return claves;
    }

    

    solColiciones(indice){ //metodo de exploracion cuadratica
        let newIndice =0;
        let i=0;
        let disponible = false;

        while(disponible == false){
            newIndice = indice + Math.pow(i,2);
            //validar que newIndice sea menor al tañano de la tabla
            if(newIndice>= this.size){
                newIndice = newIndice-this.size;
            }
            //validar que la posicion del nuevo indice este disponible
            if(this.claves[newIndice]==null){
                disponible= true;
            }
            i++;
        }
        return newIndice;
    }

    insertar(nuevo){
        
        let indice = this.calcularHash(nuevo.id);

        //validaciones 
        if(this.claves[indice]==null){ //posicion disponible
            this.claves[indice] = nuevo;
            this.claves_usadas++;
        }else{ // existe una colicion
            indice =  this.solColiciones(indice);
            this.claves[indice] = nuevo;
            this.claves_usadas++
        }

        //validacion de tamaño
        let Porcentaje_uso = this.claves_usadas/this.size;
        if(Porcentaje_uso>=0.5){
            this.rehash();
        }
    }


    recorrer(textolista){
        let cadenatabla=""
        let contador=-1
        for(var i =0;i<this.size;i++){
            if(this.claves[i]!=null){
                if(contador==0){
                    contador+=1
                    cadenatabla+="\n<tr>\n\t<td>"+contador+" | "+" Id: "+this.claves[i].id+" Vendedor: "+this.claves[i].nombreV+" Cliente: "+this.claves[i].nombreC+" Total: "+this.claves[i].total+"</td><td roswpan=\"2\">"+textolista+"</td>\n</tr>\n"    
                    
                }else{
                    contador+=1
                console.log("-->ID: "+this.claves[i].id+" Total: "+this.claves[i].total);
                cadenatabla+="\n<tr>\n\t<td>"+contador+" | "+" Id: "+this.claves[i].id+" Vendedor: "+this.claves[i].nombreV+" Cliente: "+this.claves[i].nombreC+" Total: "+this.claves[i].total+"</td>\n</tr>\n"
                }
                
            }else{
                contador+=1
                console.log("------------");
                cadenatabla+="\n<tr>\n\t<td>"+contador+" |</td>\n</tr>\n"
            }
        }
        return cadenatabla
    }

    rehash(){
        //****** Encontrar el siguiente numero primo */
        let primo= false;
        let new_size = this.size;
        while(primo==false){
            new_size++;
            let cont =0;
            for(var i = new_size;i>0; i--){
                if(new_size%i ==0){
                    cont++;
                }
            }
            //validar cuantas veces se dividio exactamente
            if(cont == 2){
                primo= true
            }
        }
        //****** crear nuevo arreglo con el tamaño del siguente numero primo */
        let claves_aux = this.claves;

        this.size = new_size;
        this.claves = this.inicioArreglo(new_size);
        this.claves_usadas=0;
        console.log(new_size)

        for(var i =0; i<claves_aux.length;i++){
            if(claves_aux[i]!=null){
                this.insertar(claves_aux[i]);
            }
        }
    }

    
}

let tabla = new hash();

/*tabla.insertar(new nodot(20,"roberto","javier",100,))
tabla.insertar(new nodot(30,"roberto","javier",100,))
tabla.insertar(new nodot(40,"roberto","javier",100,))
tabla.insertar(new nodot(50,"roberto","javier",100,))
tabla.insertar(new nodot(60,"roberto","javier",100,))
tabla.insertar(new nodot(70,"roberto","javier",100,))
tabla.insertar(new nodot(80,"roberto","javier",100,))
console.log(tabla.recorrer())*/

function recuperarHash(){
    var tablatemp1=CircularJSON.parse(JSON.parse(sessionStorage.getItem('tabla')))
    tabla=new hash()
    //arboltemp=CircularJSON.parse(arboltemp)
    Object.assign(tabla,tablatemp1)
}