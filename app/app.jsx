// jshint esversion: 6
import React from "react";
import ReactDom from "react-dom";
import { Window, Content, PaneGroup ,Pane, Form, TabGroup, TabItem } from "react-photonkit";

import WindowCtrl from "./windowctrl.jsx";

// uses hack defined in html script
// we say var es5Require = require
// to escape webpack from mangling the package
var ipcRenderer = es5Require('electron').ipcRenderer;

require('../index.scss');

// Test IPC Renderer
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg); // prints "pong"
});
ipcRenderer.send('asynchronous-message', 'ping');

ReactDom.render(
	<WindowCtrl />
  , document.querySelector("#main"));
