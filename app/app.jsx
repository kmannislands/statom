// jshint esversion: 6
import React from "react";
import ReactDom from "react-dom";
import { Window, Content, PaneGroup ,Pane, Form, TabGroup, TabItem } from "react-photonkit";

import WindowCtrl from "./windowctrl.jsx";


require('../index.scss');

ReactDom.render(
	<WindowCtrl />
  , document.querySelector("#main"));
