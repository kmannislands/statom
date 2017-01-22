// jshint esversion: 6
let zoomAmount = 1.1;

import React from "react";
// Load the full build.
const _ = require('lodash');

import StatTools from "./stattools.jsx";
import NodeCluster from "./nodecluster.jsx";
import IndicatorBar from "./indicatorbar.jsx";
import CanvasBG from "./CanvasBG.jsx";
// import IndicatorBar from "./indicatorbar.jsx";

// flux state implementation container
// import AltContainer from "alt-container";
import connectToStores from 'alt-utils/lib/connectToStores';

// import the relevant store for flux
import NodeStore from "../stores/NodeStore";

// uses hack defined in html script
// we say var es5Require = require
// to escape webpack from mangling the package
const ipcRenderer = es5Require('electron').ipcRenderer;


require("../styles/components/statcanvas.scss");

class StatCanvas extends React.Component {
	// TODO implement zoom stuff in flux model
	// constructor(props) {
	// 	super(props);
	// 	this.zoomIn = this.zoomIn.bind(this);
  //   this.zoomOut = this.zoomOut.bind(this);
	// }

	// Static methods for alt flux
	static getStores() {
    return [NodeStore];
  }

  static getPropsFromStores() {
    return NodeStore.getState();
  }

	componentDidMount() {
		NodeStore.fetchNodes("./test.statom.json");
	}
	componentWillMount() {
		// TODO: move this logic
		// responder to r version event emitter from ipcMain
		ipcRenderer.on('r-version', (event, arg) => {
			if (typeof arg === 'string') {
				alert('There is a problem with your r installation. Be sure to download and install r to use statom');
			}
		  this.setVersion(arg);
		});
		// request that r-version logic on the backend
		ipcRenderer.send('request-r-version', 'ping');
	}
	// TODO Move this logic as well
	setVersion(arg) {
		// this.setState(function(prevState){
		// 	let copy = JSON.parse(JSON.stringify(prevState));
		// 	let newVer = {
		// 		r_version: arg.minor + ' "' + arg.nickname + '"'
		// 	};
		//
		// 	copy = _.assign(copy, newVer);
		//
		// 	return copy;
		// });
	}
	// zoomIn() {
	// 	this.setState((prevState) => (
	// 		{ zoom: prevState.zoom * zoomAmount }
	// 	));
	// }
	// zoomOut() {
	// 	this.setState((prevState) => (
	// 		{ zoom: prevState.zoom / zoomAmount }
	// 	));
	// }
	render() {
		return (

				<div className="viewWindow">
						<StatTools />
						<div className="stat-canvas"
							style={ {height: this.props.dimensions[1] + "px",
								width: + this.props.dimensions[0] + "px"} }
							// style={{zoom: this.state.zoom + "%"}}
						>
							<NodeCluster
								contents={this.props.nodes} />
							<CanvasBG
								width={this.props.dimensions[0]}
								height={this.props.dimensions[1]}
								contents={this.props.nodes} />
						</div>
						<IndicatorBar
							toIndicate={[
								{
									title: "zoom",
									// value: Math.round(this.state.zoom) + "%"
								},
								{
									title: "Directory",
									value: "~/node"
								},
								{
									title: "Version",
									// value: this.state.r_version
								}
							]}
						 />
				</div>
			);
	}
}

export default connectToStores(StatCanvas);
