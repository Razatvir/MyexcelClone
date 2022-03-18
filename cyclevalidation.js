let collectedgraphcomponent = [];
// let graphCompnentMatrix = [];
// for (let i =0 ; i< rows ; i++){
//     let row  = [];
//     for (let j =0 ; j< columns ; j++){
//         row.push([]);

//     }
//     graphCompnentMatrix.push(row);

// }
function isgraphcyclic(graphCompnentMatrix){
    let visited = [];
    let dfsVisited = [];
    for(let i =0 ;i< rows ; i++){
        let visitedrow = [];
        let dfsvisitedrow = [];

        for (let j =0; j< columns; j++){

            visitedrow.push(false);
            dfsvisitedrow.push(false);

        }
        visited.push(visitedrow);
        dfsVisited.push(dfsvisitedrow);
    }
    for(let i =0 ;i< rows ; i++){
       
            for (let j =0; j< columns; j++){
                if( visited[i][j]== false){
                let response = dfscycledetection(graphCompnentMatrix, i , j, visited, dfsVisited);
                if (response == true) return [i,j];

        }
            
                
                }
            }
            return null;



}
function dfscycledetection (graphCompnentMatrix, srcr , srcc, visited, dfsVisited){
    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;


    for(let childrens =0; childrens< graphCompnentMatrix[srcr][srcc].length ; childrens++){
       let [crid, ccid] = graphCompnentMatrix[srcr][srcc][childrens];
       if(visited[crid][ccid] === false){
           let response = dfscycledetection(graphCompnentMatrix, crid, ccid, visited,dfsVisited);
           if(response === true){
               return true;
           }

           
       }
       else if (visited[crid][ccid] == true && dfsVisited[crid][ccid] == true){
           return true;


       }


    }



    dfsVisited[srcr][srcc] = false;
    return false;



}