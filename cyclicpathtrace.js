function colorPromise (){
    return new Promise ((resolve, reject)=>{
        setTimeout(()=>{
            resolve();
        },1000)
    })
}

async function isgraphcyclicTracepath(graphCompnentMatrix,iscyclic){
    let [srcr, srcc] = iscyclic;
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
    // for(let i =0 ;i< rows ; i++){
       
    //         for (let j =0; j< columns; j++){
    //             if( visited[i][j]== false){
    //             let response = dfscycledetection(graphCompnentMatrix, i , j, visited, dfsVisited);
    //             if (response == true) return true;

    //     }
            
                
    //             }
    //         }

    let response = await dfscycledetectionTracepath(graphCompnentMatrix,srcr, srcc, visited,dfsVisited);
    if(response === true)  return Promise.resolve(true);
    
    return Promise.resolve(false);



}


async function dfscycledetectionTracepath(graphCompnentMatrix, srcr , srcc, visited, dfsVisited){
    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;

    let cell = document.querySelector(`.cell[rid ="${srcr}"][cid="${srcc}"]`);
    cell.style.backgroundColor = "lightblue";
    
    await colorPromise();
        
        
  


    for(let childrens =0; childrens< graphCompnentMatrix[srcr][srcc].length ; childrens++){
       let [crid, ccid] = graphCompnentMatrix[srcr][srcc][childrens];
       if(visited[crid][ccid] === false){
           let response = await dfscycledetectionTracepath(graphCompnentMatrix, crid, ccid, visited,dfsVisited);
           if(response === true){
            
                cell.style.backgroundColor = "transparent";
                await colorPromise();
                return Promise.resolve(true);
           
            


               
           }

           
       }
        else if (visited[crid][ccid] == true && dfsVisited[crid][ccid] == true){
        let cycliccell = document.querySelector(`.cell[rid ="${crid}"][cid="${ccid}"]`);
        
        cycliccell.style.backgroundColor = "lightsalmon"; 
        await colorPromise();
       
        
        cycliccell.style.backgroundColor = "transparent"; 
        await colorPromise();
        cell.style.backgroundColor = "transparent";

        return Promise.resolve(true);


       }


    }



    dfsVisited[srcr][srcc] = false;
    return Promise.resolve(false);



}