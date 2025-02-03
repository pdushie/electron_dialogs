const { Menu, dialog } = require('electron');
// check if the user is on a Mac
const isMac = process.platform === 'darwin';


// Creating our own custom menu -array of objects - high-level objects will be menus
// nested objects will become submenus

// menu items will be stored in an array
const menuTemplate = [
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    label: "Dialog Examples",
    submenu: [
      {
        label: "Open File...",
        // every click event in the menu take in two properties. The first is the even and the second is the parentWindow
        click(event, parentWindow) {
          //dialog options object
          let dialogOptions = {
            title: "Philip's File Dialog",
            defaultPath: __dirname
          }
          // show open file dialog - attach it to the parent window
          dialog.showOpenDialog(parentWindow).then((fileInfo) => {
            //console.log(fileInfo); // outputs an array of object that contains canceled status(boolean) and the path to the file
            if (fileInfo.canceled) {
              console.log("User did not select a file");
            } else {
              console.log(`User selected file: ${fileInfo.filePaths}`);
            }
          });
        }
      },
      {
        label: "Show Message...",
        click(event, parentWindow) {
          dialog.showMessageBox(parentWindow, {
            type: "warning",
            title: "Message from Philip",
            message: "Your CPU is heating up"
          });

        }
      }
    ]

  },
  {
    label: 'View',
    submenu: [
      { role: 'toggleDevTools' },
      { type: 'separator' },
      {
        label: 'sdfkh Reload',
        submenu: [
          { role: 'reload' },
          { role: 'forceReload' }
        ]
      }
    ]
  }
];


// we are going to shift our menu over to the right if on Mac
if (isMac) {
  // creating an empty placeholder menu as the first menu in our templates
  // so on mac, the file menu gets shifted to the right
  menuTemplate.unshift(
    {
      label: "placeholder" // put a dummy menu called placeholder for Mac
    }
  );
}

module.exports = Menu.buildFromTemplate(menuTemplate);