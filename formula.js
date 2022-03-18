for(let i=0; i< rows; i++){
    for(let j=0; j< columns ; j++){
        let cell = document.querySelector(`.cell[rid ="${i}"][cid="${j}"]`);
        cell.addEventListener("blur", (e)=>{
            let address = adressbar.value;
            let[activecellxyz,cellProp] = activecell(address);
            let enteredData = activecellxyz.innerText;
            if (enteredData === cellProp.value) return;

            cellProp.value = enteredData;

            removechildfromparent(cellProp.formula);
            cellProp.formula = "";

            updateChildencells(address);


            
        })
    }
}
let formulabar = document.querySelector(".formulabar");
formulabar.addEventListener("keydown",async (e)=>{
    let inputFormula = formulabar.value;
    if(e.key === "Enter" && inputFormula){
        
        address = adressbar.value;
        let [cell, cellProp] = activecell(address);
        if (inputFormula!== cellProp.formula) removechildfromparent(cellProp.formula);


        addchildtographcomponent(inputFormula, address);
        let iscyclic = isgraphcyclic(graphCompnentMatrix);
        if (iscyclic){
            let response = confirm("Your formula is cyclic. Do you want to trace your path ?");
            while(response === true){
                await isgraphcyclicTracepath(graphCompnentMatrix, iscyclic);
                response = confirm("Your formula is cyclic. Do you want to trace your path ?");
            }
            removechildfromparent(inputFormula,address);
            return;
        }

        let evaluatedvalue = evaluateFormula(inputFormula);

        

        setUIandcellProp(evaluatedvalue,inputFormula, address);
        addchildtoparent(inputFormula);
        updateChildencells(address);

        
    }
})

function removechildfromGraphComponent(formula,childadress){
    let [crid, ccid] = decodeRIDCIDfromadress(childadress);
    let encodedformula = formula.split(" ")
    for(let i =0 ; i< encodedformula.length ; i++){
        let asciivalue = encodedformula[i].charCodeAt(0);
        if(asciivalue >=65 && asciivalue <=90){
            let[prid, pcid] = decodeRIDCIDfromadress(encodedformula[i]);
            graphCompnentMatrix[prid][pcid].pop();
        }
    }
}

function addchildtoparent(formula){
    childrenaddress = adressbar.value;
    let encodedformula = formula.split(" ");
    for(let i=0; i< encodedformula.length;i++){
        let asciivalue = encodedformula[i].charCodeAt(0);
        if(asciivalue >=65 && asciivalue <=90){
            let[parentcell, parentcellProp] = activecell(encodedformula[i]);
            parentcellProp.children.push(childrenaddress);
           
        }

    }
    
}
function removechildfromparent(formula){
    childrenaddress = adressbar.value;
    let encodedformula = formula.split(" ");
    for(let i=0; i< encodedformula.length;i++){
        let asciivalue = encodedformula[i].charCodeAt(0);
        if(asciivalue >=65 && asciivalue <=90){
            let[parentcell, parentcellProp] = activecell(encodedformula[i]);
            let idx = parentcellProp.children.indexOf(childrenaddress);
            parentcellProp.children.splice(idx,1);
           
        }
    }



}
function updateChildencells(parentadress){
    let [parentcell , parentcellProp]= activecell(parentadress);
    let children = parentcellProp.children;
    for(let i =0; i< children.length; i++){
        let childadress = children[i];
        let [childcell, childcellProp] = activecell(childadress);
        let childformula = childcellProp.formula;

        let evaluatedvalue = evaluateFormula(childformula);
        setUIandcellProp(evaluatedvalue,childformula,childadress);
        updateChildencells(childadress);

    }

}



function evaluateFormula(formula){
    let encodedformula = formula.split(" ");
    for(let i=0; i< encodedformula.length;i++){
        let asciivalue = encodedformula[i].charCodeAt(0);
        if(asciivalue >=65 && asciivalue <=90){
            let[cell, cellProp] = activecell(encodedformula[i]);
            encodedformula[i] = cellProp.value;
           
        }

    }
    let decodedformula = encodedformula.join(" ");
    return eval(decodedformula);
}
function setUIandcellProp(evaluatedvalue,formula,address){
    
    let [cell, cellProp ] = activecell(address);
    cell.innerText = evaluatedvalue;
    cellProp.value = evaluatedvalue;
    cellProp.formula = formula;

}

function addchildtographcomponent( formula, childadress){
    let [crid, ccid] = decodeRIDCIDfromadress(childadress);
    let encodedformula = formula.split(" ")
    for(let i =0 ; i< encodedformula.length ; i++){
        let asciivalue = encodedformula[i].charCodeAt(0);
        if(asciivalue >=65 && asciivalue <=90){
            let[prid, pcid] = decodeRIDCIDfromadress(encodedformula[i]);
            graphCompnentMatrix[prid][pcid].push([crid,ccid]);
           

    }
   

    }
}
