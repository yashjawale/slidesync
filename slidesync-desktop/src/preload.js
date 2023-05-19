// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { ipcRenderer, contextBridge } = require("electron");
const { platform } = require("os");
const { keyboard, Key } = require("@nut-tree/nut-js");

const next = async () => {
  // await console.log("NEXT!!");
  await keyboard.type(Key.LeftSuper, Key.Space);
  await keyboard.type("calculator");
  // await console.log("DONE COMMANDING");
  // await keyboard.type(Key.Right);
};

const previous = async () => {
  // console.log("PREV!!");
  await keyboard.type(Key.LeftSuper, Key.Space);
  await keyboard.type("typed prev");
  // console.log("DONE COMMANDING");
  // await keyboard.type(Key.Left);
};

// Exposing functions to app
contextBridge.exposeInMainWorld("app", {
  platform: platform(), // create a property oj the app object for platform
  next: () => next(),
  previous: () => previous(),
});
