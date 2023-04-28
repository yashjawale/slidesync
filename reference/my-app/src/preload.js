// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { ipcRenderer, contextBridge } = require("electron");
const { platform } = require("os");
const { keyboard, Key } = require("@nut-tree/nut-js");
// const robot = require("robotjs");
// can be accessed through window.app

// function robottest() {
//     robot.setMouseDelay(2);

//     var twoPI = Math.PI * 2.0;
//     var screenSize = robot.getScreenSize();
//     var height = screenSize.height / 2 - 10;
//     var width = screenSize.width;

//     for (var x = 0; x < width; x++) {
//         y = height * Math.sin((twoPI * x) / width) + height;
//         robot.moveMouse(x, y);
//     }
// }

const robottest = async () => {
    console.log("Tested");
    // await keyboard.type(Key.LeftSuper, Key.Space);
    // await keyboard.type("calculator");
    await keyboard.type(Key.Right);
};

contextBridge.exposeInMainWorld("app", {
    platform: platform(), // create a property oj the app object for platform
    sayhello: () => robottest(),
});
