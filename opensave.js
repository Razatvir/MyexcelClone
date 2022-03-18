let downloadbtn  = document.querySelector(".download");
let openbtn = document.querySelector(".open");


// Download Task
downloadbtn.addEventListener("click", (e)=>{
    let jsonData = JSON.stringify([sheetDB, graphCompnentMatrix]);
    let file = new Blob([jsonData],{type : "application/json"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "SheetData.json";
    a.click();
})

// Upload Task
openbtn.addEventListener("click", (e)=>{
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change",(e)=>{
        let fr = new FileReader();
        let files = input.files;
        let fileobj = files[0];

        fr.readAsText(fileobj);
        fr.addEventListener("load", (e)=>{
            let readSheetData = JSON.parse(fr.result);

            // basic sheet with default data will be created
            addsheetbutton.click();

            //SheetDB, GraphComponentMatrix
            sheetDB = readSheetData[0];
            graphCompnentMatrix = readSheetData[1];
            collectedsheetDb[collectedsheetDb.length-1] = sheetDB;
            collectedgraphcomponent[collectedgraphcomponent.length-1] = graphCompnentMatrix;
            handlesheetproperties();

        });

    })
})