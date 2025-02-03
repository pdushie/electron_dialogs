// OUR MAIN ELECTRON PROCESS = think of this as the backend or server-side
const { app, ipcMain, Menu, BrowserWindow } = require('electron');
const customMenuModule = require('./menu');


const ExifImage = require('exif').ExifImage;

// creating our renderer and loading up  its original HTML
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // default is false
      contextIsolation: false // default is true

    }
  })

  win.loadFile('index.html')
}

// when the app is ready to launch - call a function to display renderer
app.whenReady().then(() => {
  createWindow()
})


// attach our custom menu template as the main application menu - rmove the default menu
Menu.setApplicationMenu(customMenuModule);


// have a new event listener on ipcMain for fileSelected
ipcMain.on('fileSelected', (event, fullFilePath) => {
  //console.log(`File ${fullFilePath}`);
  new ExifImage({ image: fullFilePath }, function (error, exifData) {
    if (error)
      console.log('Error: ' + error.message);
    else {
      console.log(exifData); // Do something with your data!
      let newPhotoInfo = {
        make: exifData.image.Make.split("\x00")[0],
        model: exifData.image.Model.split("\x00")[0],
        exposureTime: exifData.exif.ExposureTime,
        fNumber: exifData.exif.FNumber
      };

      // trigger an exifRead event back to the renderer sending custom object
      event.sender.send('exifRead', newPhotoInfo);
    }
  });
  
});
