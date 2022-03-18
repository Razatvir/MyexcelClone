let sheetfoldercontainer = document.querySelector(".sheets-folder-container")
let addsheetbutton = document.querySelector(".sheet-add-icons")

addsheetbutton.addEventListener("click",(e)=>{
    let sheet = document.createElement("div");
    sheet.setAttribute("class", "sheetfolder");
    let allsheetfolder = document.querySelectorAll(".sheetfolder");
    sheet.setAttribute("id", allsheetfolder.length);

    sheet.innerHTML = `<div class="sheetcontent">Sheet ${allsheetfolder.length + 1}</div>`;
    sheetfoldercontainer.appendChild(sheet);
    sheet.scrollIntoView();
    //DB
    createsheetDB();
    creategraphcomponentmatrix();
    handlesheetactiveness(sheet);
    handlesheetremoval(sheet);
    sheet.click();


})
function handlesheetremoval(sheet){
    sheet.addEventListener("mousedown", (e)=>{
        if(e.button !== 2) return;

        let allsheetfolder = document.querySelectorAll(".sheetfolder");
        if(allsheetfolder.length ===1){
            alert("You need to have atleast one sheet!")
            return;
        }

        let response = confirm("Your sheet will be removed permanantely, are you sure?");
        if(response === false) return;
        let sheetidx = Number(sheet.getAttribute("id"));
        //DB
        collectedsheetDb.splice(sheetidx,1);
        collectedgraphcomponent.splice(sheetidx,1);
        //UI
        handlesheetremovalUI(sheet);


        sheetDB = collectedsheetDb[0];
        graphCompnentMatrix = collectedgraphcomponent[sheetidx];
        handlesheetproperties();



    })
}
function handlesheetremovalUI(sheet){
    sheet.remove();
    let allsheetfolder = document.querySelectorAll(".sheetfolder");
    for (let i =0 ; i<allsheetfolder.length ; i++){
        allsheetfolder[i].setAttribute("id",i);
        let sheetcontent = allsheetfolder[i].querySelector(".sheetcontent");
        sheetcontent.innerText = `Sheet ${i+1}`;
        allsheetfolder[i].style.backgroundColor = "transparent";
    }

    allsheetfolder[0].style.backgroundColor = "#ced6e0";



}
function handlesheetDB(sheetidx){
   sheetDB = collectedsheetDb[sheetidx];
   graphCompnentMatrix = collectedgraphcomponent[sheetidx];
}
function handlesheetproperties(){
    for(let i = 0 ; i <rows; i++){
        for(let j =0; j< columns; j++){
            let cell = document.querySelector(`.cell[rid ="${i}"][cid="${j}"]`);
            cell.click();
        }
    }
    //By default click on first cell via dom
    let firstCell = document.querySelector(".cell");
    firstCell.click();
}
function handlesheetUI(sheet){
    let allsheetfolder = document.querySelectorAll(".sheetfolder");
    for (let i =0 ;i< allsheetfolder.length ; i++){
        allsheetfolder[i].style.backgroundColor = " transparent"
    }
    sheet.style.backgroundColor = "#ced6e0";


    
}
function handlesheetactiveness(sheet){
    sheet.addEventListener("click", (e)=>{
       let sheetidx = Number(sheet.getAttribute("id"));
       handlesheetDB(sheetidx);
       handlesheetproperties();
       handlesheetUI(sheet);

    })

}

function createsheetDB(){
    let sheetDB = [];
for(let i =0; i< rows; i++){
    let sheetrow = [];
    for(let j =0; j< columns; j++){
        let cellProp = {
            bold : false,
            italic : false,
            underline : false,
            alignment : "left",
            fontFamily : "monospace",
            fontSize : "14",
            fontColor: "#000000",
            BGColor : "#000000",
            value: "",
            formula:"",
            children : [],

        }
        sheetrow.push(cellProp);
    }
sheetDB.push(sheetrow);

}
collectedsheetDb.push(sheetDB);
}
function creategraphcomponentmatrix(){
    let graphCompnentMatrix = [];
for (let i =0 ; i< rows ; i++){
    let row  = [];
    for (let j =0 ; j< columns ; j++){
        row.push([]);

    }
    graphCompnentMatrix.push(row);

}
collectedgraphcomponent.push(graphCompnentMatrix);
}