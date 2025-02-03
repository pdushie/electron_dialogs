const {Menu} =  require ('electron');
// check if the user is on a Mac
const isMac = process.platform === 'darwin';


// Creating our own custom menu -array of objects - high-level objects will be menus
// nested objects will become submenus

// menu items will be stored in an array
const menuTemplate = [
  {
    label: 'File',
    submenu: [
      isMac ? {role: 'close'} : { role: 'quit'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'toggleDevTools'},
      { type: 'separator' },
      {
        label: 'sdfkh Reload',
        submenu: [
          {role : 'reload'},
          {role: 'forceReload'}
        ]
      }
    ]
  }
];


// we are going to shift our menu over to the right if on Mac
if(isMac) {
  // creating an empty placeholder menu as the first menu in our templates
  // so on mac, the file menu gets shifted to the right
  menuTemplate.unshift(
    {
      label: "placeholder"
    }
  );
}

module.exports = Menu.buildFromTemplate(menuTemplate);