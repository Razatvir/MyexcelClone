let collectedsheetDb = [];
let sheetDB = [];

{
    let addsheetbutton = document.querySelector(".sheet-add-icons");
    addsheetbutton.click();
    
}
// for(let i =0; i< rows; i++){
//     let sheetrow = [];
//     for(let j =0; j< columns; j++){
//         let cellProp = {
//             bold : false,
//             italic : false,
//             underline : false,
//             alignment : "left",
//             fontFamily : "monospace",
//             fontSize : "14",
//             fontColor: "#000000",
//             BGColor : "#000000",
//             value: "",
//             formula:"",
//             children : [],

//         }
//         sheetrow.push(cellProp);
//     }
// sheetDB.push(sheetrow);

// }
// Selector for cell properties

let bold = document.querySelector(".bold");
let italic= document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily= document.querySelector(".font-family-prop");
let fontcolor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BG-color-prop");
let alignment = document.querySelectorAll(".alignment");
let leftalign= alignment[0];
let centeralign = alignment[1];
let rightalign = alignment[2];


let activeColorprop = "#d1d8e0";
let inactiveColorprop = "#ecf0f1";

// Application of 2-way Binding
// Attach property Listeners

bold.addEventListener("click", (e)=>{
    let address = adressbar.value;
    let [cell, cellProp] = activecell(address);


    //Modification
    cellProp.bold = !cellProp.bold; //DataChange
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";//UI change (1)
    bold.style.backgroundColor = cellProp.bold ? activeColorprop : inactiveColorprop;


})
italic.addEventListener("click", (e)=>{
    let address = adressbar.value;
    let [cell, cellProp] = activecell(address);


    //Modification
    cellProp.italic = !cellProp.italic; //DataChange
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";//UI change (1)
    italic.style.backgroundColor = cellProp.italic ? activeColorprop : inactiveColorprop;


})
underline.addEventListener("click", (e)=>{
    let address = adressbar.value;
    let [cell, cellProp] = activecell(address);


    //Modification
    cellProp.underline = !cellProp.underline; //DataChange
    cell.style.textDecoration = cellProp.underline ? "underline" : "normal";//UI change (1)
    underline.style.backgroundColor = cellProp.underline ? activeColorprop : inactiveColorprop;


})
fontSize.addEventListener("change", (e)=>{
    let address = adressbar.value;
    let [cell, cellProp] = activecell(address);

    cellProp.fontSize = fontSize.value //Datachange
    cell.style.fontSize = cellProp.fontSize +"px";
    fontSize.value = cellProp.fontSize;

})
fontFamily.addEventListener("change", (e)=>{
    let address = adressbar.value;
    let [cell, cellProp] = activecell(address);

    cellProp.fontFamily = fontFamily.value //Datachange
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;

})

fontcolor.addEventListener("change", (e)=>{
    let address = adressbar.value;
    let [cell, cellProp] = activecell(address);

    cellProp.fontcolor = fontcolor.value //Datachange
    cell.style.color = cellProp.fontcolor;
    fontcolor.value = cellProp.fontcolor;

})
BGcolor.addEventListener("change", (e)=>{
    let address = adressbar.value;
    let [cell, cellProp] = activecell(address);

    cellProp.BGcolor = BGcolor.value //Datachange
    cell.style.backgroundColor = cellProp.BGcolor;
    BGcolor.value = cellProp.BGcolor;

})

alignment.forEach((alignELem)=> {
    alignELem.addEventListener("click",(e)=>{
    let address = adressbar.value;
    let [cell, cellProp] = activecell(address);

    let alignValue = e.target.classList[0];
    cellProp.alignment = alignValue;
    cell.style.textAlign = cellProp.alignment;
    

    switch(alignValue){
        case "left":
            leftalign.style.backgroundColor = activeColorprop;
            centeralign.style.backgroundColor = inactiveColorprop;
            rightalign.style.backgroundColor = inactiveColorprop;
            
            break;
        case "center":
            leftalign.style.backgroundColor = inactiveColorprop;
            centeralign.style.backgroundColor = activeColorprop;
            rightalign.style.backgroundColor = inactiveColorprop;
            break;
        case "right":
            leftalign.style.backgroundColor = inactiveColorprop;
            centeralign.style.backgroundColor = inactiveColorprop;
            rightalign.style.backgroundColor = activeColorprop;
            break;
    }
    
        

    })
})

let allcells = document.querySelectorAll(".cell");
for(let i =0 ; i< allcells.length;i++ ){
    addlistnertoattachcellproperties(allcells[i]);

}

function addlistnertoattachcellproperties(cell){
    cell.addEventListener("click", (e)=> {
        let address = adressbar.value;
        let [rid,cid] = decodeRIDCIDfromadress(address);
        let cellProp = sheetDB[rid][cid];
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "normal";
        cell.style.fontSize = cellProp.fontSize +"px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontcolor;
        cell.style.backgroundColor = cellProp.BGcolor;
        cell.style.textAlign = cellProp.alignment;

        bold.style.backgroundColor = cellProp.bold ? activeColorprop : inactiveColorprop;
        italic.style.backgroundColor = cellProp.italic ? activeColorprop : inactiveColorprop;
        underline.style.backgroundColor = cellProp.underline ? activeColorprop : inactiveColorprop;
        fontcolor.value = cellProp.fontcolor;
        BGcolor.value = cellProp.BGcolor;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;
        
    

    switch(cellProp.alignment){
        case "left":
            leftalign.style.backgroundColor = activeColorprop;
            centeralign.style.backgroundColor = inactiveColorprop;
            rightalign.style.backgroundColor = inactiveColorprop;
            
            break;
        case "center":
            leftalign.style.backgroundColor = inactiveColorprop;
            centeralign.style.backgroundColor = activeColorprop;
            rightalign.style.backgroundColor = inactiveColorprop;
            break;
        case "right":
            leftalign.style.backgroundColor = inactiveColorprop;
            centeralign.style.backgroundColor = inactiveColorprop;
            rightalign.style.backgroundColor = activeColorprop;
            break;
    }
    
    let formulabar = document.querySelector(".formulabar");
    formulabar.value = cellProp.formula;
    cell.innerText = cellProp.value;

    })

}
function activecell(address){
    let[rid,cid] = decodeRIDCIDfromadress(address);
    //Access cell & Storage
    let cell = document.querySelector(`.cell[rid ="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return[cell,cellProp];


}
function decodeRIDCIDfromadress (address){
    // adress = "A1"
    let rid = Number(address.slice(1)-1);
    let cid = Number(address.charCodeAt(0))-65;
    return[rid,cid];


}