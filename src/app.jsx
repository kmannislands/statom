// jshint esversion: 6
import React from "react";
import ReactDom from "react-dom";
import { Window, Content, PaneGroup ,Pane, Form, TabGroup, TabItem } from "react-photonkit";

import WindowCtrl from "./components/windowctrl.jsx";

require('../index.scss');

// Test IPC Renderer
// console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"



ReactDom.render(
	<WindowCtrl />
  , document.querySelector("#main"));
