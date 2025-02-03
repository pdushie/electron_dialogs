const {webUtils, ipcRenderer} = require('electron');

// this is the supporting JS file for our browser renderer file
document.querySelector("#exifButton").addEventListener("click", ()=>{
    //console.log("Button clicked")

    // output the file path to the selected file
    const targetFile = document.querySelector("#fileSelector").files[0];
    const filePath = webUtils.getPathForFile(targetFile);
    console.log(filePath);

    // TODO: send the file path to the main process because it will read EXIF data
    ipcRenderer.send('fileSelected', filePath);
});

// new event handler for exifRead event from main
ipcRenderer.on('exifRead', (event, exifInfo)=>{
    console.log(exifInfo);

    // add our exif info to the DOM at bottom of the body
    let newPTag = document.createElement("p");
    newPTag.innerText = `Make: ${exifInfo.make}`;
    document.body.appendChild(newPTag);

    newPTag = document.createElement("p");
    newPTag.innerText = `Model: ${exifInfo.model}`;
    document.body.appendChild(newPTag);

    newPTag = document.createElement("p");
    newPTag.innerText = `Exposure Time: ${exifInfo.exposureTime}`;
    document.body.appendChild(newPTag);

    newPTag = document.createElement("p");
    newPTag.innerText = (`FNumber: ${exifInfo.fNumber}`);
    document.body.appendChild(newPTag);
})