// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { ipcRenderer, contextBridge } = require("electron");
const { platform } = require("os");
const { keyboard, Key } = require("@nut-tree/nut-js");

const next = async () => {
  await console.log("NEXT!!");
  await keyboard.type(Key.Down);
};

const previous = async () => {
  console.log("PREV!!");
  await keyboard.type(Key.Up);
};

const firstSlide = async () => {
  console.log("FirstSlide!!");
  await keyboard.type(Key.Home);
};

const lastSlide = async () => {
  console.log("FirstSlide!!");
  await keyboard.type(Key.End);
};

// Exposing functions to app
contextBridge.exposeInMainWorld("app", {
  platform: platform(), // create a property oj the app object for platform
  next: () => next(),
  previous: () => previous(),
  firstSlide: () => firstSlide(),
  lastSlide: () => lastSlide(),
});
