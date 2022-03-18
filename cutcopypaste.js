let ctrlkey;
document.addEventListener("keydown", (e)=>{
    ctrlkey = e.ctrlKey;

})
document.addEventListener("keyup", (e)=>{
    ctrlkey = e.ctrlKey;
})

for (let i =0 ; i <rows ; i++){
    for(let j =0 ; j< columns; j++){
        let cell = document.querySelector(`.cell[rid ="${i}"][cid="${j}"]`);
        handleselectedcells(cell);
    }
}

let copybtn = document.querySelector(".copy");
let cutbtn = document.querySelector(".cut");
let pastebtn = document.querySelector(".paste");
let rangestorage = [];
function handleselectedcells(cell){
    cell.addEventListener("click" , (e)=> {
        if(!ctrlkey)return;


        if(rangestorage.length>=2){
        defaultselectedcellsUI();
        rangestorage =[];
        }

        cell.style.border = "3px solid #218c74";
        
        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));
        rangestorage.push([rid, cid]);

    })
}
function defaultselectedcellsUI(){
    for(let i =0 ; i < rangestorage.length; i++){
        let cell = document.querySelector(`.cell[rid ="${rangestorage[i][0]}"][cid="${rangestorage[i][1]}"]`);
        cell.style.border = "1px solid lightgray";

    }

}
let copydata = [];
copybtn.addEventListener("click", (e)=>{
    if(rangestorage.length<2)return;
    copydata = [];
    let strow = rangestorage[0][0];
    let stcol = rangestorage[0][1]
    let endrow = rangestorage[1][0]
    let endcol =  rangestorage[1][1]
    for(let i = strow ; i <=endrow;i++){
        let copyrow =[];
        for(j = stcol; j<=endcol; j++){
            let cellProp = sheetDB[i][j];
        
            copyrow.push(cellProp);

        }
        copydata.push(copyrow);
    }
    defaultselectedcellsUI();
})
cutbtn.addEventListener("click", (e)=>{
    if(rangestorage.length<2)return;
    
    let strow = rangestorage[0][0];
    let stcol = rangestorage[0][1]
    let endrow = rangestorage[1][0]
    let endcol =  rangestorage[1][1]
    for(let i = strow ; i <=endrow;i++){
       
       
        for(j = stcol; j<=endcol; j++){
            let cell = document.querySelector(`.cell[rid ="${i}"][cid="${j}"]`);
            let cellProp = sheetDB[i][j];
            
            cellProp.value = "";
            cellProp.bold = false;
            cellProp.italic = false;
            cellProp.underline = false;
            cellProp.fontSize = "14";
            cellProp.fontFamily = "monospace";
            cellProp.fontcolor = "#000000";
            cellProp.BGcolor = "000000";
            cellProp.alignment = "left";


            cell.click();

        }
        
    }
    defaultselectedcellsUI();
    
})
pastebtn.addEventListener("click", (e)=>{

    let rowdiif  =  Math.abs(rangestorage[0][0] - rangestorage [1][0]);
    let coldiif  =  Math.abs(rangestorage[0][1] - rangestorage [1][1]);
    let adress = adressbar.value;
    let [strow,stcol] = decodeRIDCIDfromadress(adress);
    for(let i = strow , r =0 ; i <=strow+rowdiif;i++,r++){
      
        for(j = stcol, c=0; j<=stcol+coldiif; j++,c++){
            let cell = document.querySelector(`.cell[rid ="${i}"][cid="${j}"]`);
            if(!cell)continue;
            let data = copydata[r][c];
            let cellProp = sheetDB[i][j];
            cellProp.value = data.value;
            cellProp.bold = data.bold;
            cellProp.italic = data.italic;
            cellProp.underline = data.underline;
            cellProp.fontSize = data.fontSize;
            cellProp.fontFamily = data.fontFamly;
            cellProp.fontcolor = data.fontColor;
            cellProp.BGcolor = data.BGcolor;
            cellProp.alignment = data.alignment;


            cell.click();
            
        }
       
    }


})