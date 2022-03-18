let rows =100;
let columns = 26;
let adresscolcont = document.querySelector(".adress-col-cont");
let adressrowcont = document.querySelector(".adress-row-cont");
let cellscont = document.querySelector(".cell-cont");
let adressbar= document.querySelector(".addressbar");




for(let i=0; i<rows;i++){
    let adresscol = document.createElement("div");
    adresscol.setAttribute("class","adress-col");
    adresscol.innerText = i+1;
    adresscolcont.appendChild(adresscol)
}
for(let i=0; i<columns;i++){
    let adressrow = document.createElement("div");
    adressrow.setAttribute("class","adress-row");
    adressrow.innerText = String.fromCharCode(65+i);
    adressrowcont.appendChild(adressrow);
}
for(let i=0; i<rows;i++){
    let rowcont = document.createElement("div");
    rowcont.setAttribute("class","rowcont");
    for(let j=0; j<columns;j++){
        let cell = document.createElement("div");
        cell.setAttribute("class","cell");
        cell.setAttribute("contenteditable","true");

        // Attributes for cell identification and storage
        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j);

        rowcont.appendChild(cell);
        addlistenerforadressbardisplay(cell,i,j);

    }
    cellscont.appendChild(rowcont);
}
function addlistenerforadressbardisplay(cell,i,j){
   cell.addEventListener("click",(e) =>{
       let rowID = i+1;
       let colID =  String.fromCharCode(65+j);
       adressbar.value =`${colID}${rowID}`;
   })
}
