document.querySelector('#btnGrafos').addEventListener('click',mostrarGrafos);
document.querySelector('#btnGrafosV').addEventListener('click',mostrarGrafosV);

var directionInput = document.getElementById("direction");
var nodes = null;
var edges = null;


function destroy(){
    if (network !== null) {
        network.destroy();
        network = null;
      }
}

function mostrarGrafos(){
    recuperarABB()
    //destroy()
    nodes=[]
    edges=[]
    //alto=[]
    var connectionCount = [];
    nodes=nodos(arbolabb.raiz)
    edges=enlaces(arbolabb.raiz)
    console.log(nodes)
    console.log(edges)
    console.log(nodes.length)
    size=nodes.length
    console.log(nodes[0].id)

    var container = document.getElementById("mynetwork");
    var data = {
    nodes: nodes,
    edges: edges,
    };

    var options = {
        layout: {
          hierarchical: {
            direction: "UD",
            sortMethod: "directed",
          },
        },
        physics: {
          hierarchicalRepulsion: {
            avoidOverlap: 1,
          },
        },
      };
      network = new vis.Network(container, data, options);


}

function mostrarGrafosV(){
    recuperarAVL()
    //destroy()
    nodes=[]
    edges=[]
    //alto=[]
    var connectionCount = [];
    nodes=nodosV(arbol.raiz)
    edges=enlacesV(arbol.raiz)
    console.log(nodes)
    console.log(edges)
    console.log(nodes.length)
    size=nodes.length
    console.log(nodes[0].id)

    var container = document.getElementById("mynetwork");
    var data = {
    nodes: nodes,
    edges: edges,
    };

    var options = {
        layout: {
          hierarchical: {
            direction: "UD",
            sortMethod: "directed",
          },
        },
        physics: {
          hierarchicalRepulsion: {
            avoidOverlap: 1,
          },
        },
      };
      network = new vis.Network(container, data, options);


}

function nodosV(aux){
    
    
    if(aux!=null){
        nodes.push({ id: aux.id,label: String(aux.id+" "+aux.nombre+" "+aux.usuario) })
        nodosV(aux.izquierda)
        nodosV(aux.derecha)
        //console.log("id: "+aux.id+" altura: "+aux.altura)

    }
    //console.log("soy nodes"+nodes)
    return nodes
    
}
function nodos(aux){
    
    
    if(aux!=null){
        nodes.push({ id: aux.id,label: String(aux.id+" "+aux.nombre+" "+aux.telefono) })
        nodos(aux.izquierda)
        nodos(aux.derecha)
        //console.log("id: "+aux.id+" altura: "+aux.altura)

    }
    //console.log("soy nodes"+nodes)
    return nodes
    
}

function enlaces(aux){

    if(aux!=null){
        //console.log("entre")
        //console.log(aux.derecha)
        //console.log(aux.izquierda)
        enlaces(aux.izquierda)
        enlaces(aux.derecha)


        if(aux.izquierda!=null){
            //console.log("entre izquierda")
            edges.push({ from: aux.id, to: aux.izquierda.id })
        }
        if(aux.derecha!=null){
            //console.log("entre derecha")
            edges.push({ from: aux.id, to: aux.derecha.id })
        }
    }
    return edges

}

function enlacesV(aux){

    if(aux!=null){
        //console.log("entre")
        //console.log(aux.derecha)
        //console.log(aux.izquierda)
        enlacesV(aux.izquierda)
        enlacesV(aux.derecha)


        if(aux.izquierda!=null){
            //console.log("entre izquierda")
            edges.push({ from: aux.id, to: aux.izquierda.id })
        }
        if(aux.derecha!=null){
            //console.log("entre derecha")
            edges.push({ from: aux.id, to: aux.derecha.id })
        }
    }
    return edges

}

/*function alturanodo(aux){
    
    
    if(aux!=null){
        alto.push(aux.altura)
        nodos(aux.izquierda)
        nodos(aux.derecha)

    }
    //console.log("soy nodes"+nodes)
    //console.log(alto)
    return alto
    
}*/