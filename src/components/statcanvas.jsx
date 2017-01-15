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

// uses hack defined in html script
// we say var es5Require = require
// to escape webpack from mangling the package
const ipcRenderer = es5Require('electron').ipcRenderer;


require("../styles/components/statcanvas.scss");

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function node(id, node) {
	this[id] = node;
}

class StatCanvas extends React.Component {
	constructor(props) {
		super(props);
		this.addNode = this.addNode.bind(this);
		this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
		this.currId = 1;

		this.state = {
			nodes: {},
			zoom: 100,
			r_version: '?'
		};

	}
	componentDidMount() {
		NodeStore.fetchNodes("./test.statom.json");
	}
	componentWillMount() {
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
	setVersion(arg) {
		this.setState(function(prevState){
			let copy = JSON.parse(JSON.stringify(prevState));
			let newVer = {
				r_version: arg.minor + ' "' + arg.nickname + '"'
			};

			copy = _.assign(copy, newVer);

			return copy;
		});
	}
	addNode() {
		let currId = Object.size(this.state.nodes) + 1;
		// console.log("currId: " + currId);
		let newNode = {
			key: currId,
			outlets: [
				{
					id: currId + '-outlet',
					data_type: 'string',
					name: 'val'
				}
			],
			inlets: [
				{
					id: currId + '-inlet',
					data_type: 'string',
					name: 'argument'
				},
				{
					id: currId + '-inlet1',
					data_type: 'string',
					name: 'argument2'
				},
				{
					id: currId + '-inlet2',
					data_type: 'string',
					name: 'argument3'
				}
			],
			type: 'input'
		};
    this.setState(function(prevState){
			// milad help, there's gotta be a better way to do this
			// esp since I cheated and brough lodash
			let copy = JSON.parse(JSON.stringify(prevState));
			let nodeCopy = JSON.parse(JSON.stringify(prevState.nodes));

			// flex
			copy.nodes = _.assign(nodeCopy, new node(currId,newNode));

			return copy;
		});
	}
	zoomIn() {
		this.setState((prevState) => (
			{ zoom: prevState.zoom * zoomAmount }
		));
	}
	zoomOut() {
		this.setState((prevState) => (
			{ zoom: prevState.zoom / zoomAmount }
		));
	}
	render() {
		return (
				<div className="viewWindow">
						<StatTools addNode={this.addNode}
						zoomIn={this.zoomIn}
						zoomOut={this.zoomOut}/>
						<div className="stat-canvas"
							style={{zoom: this.state.zoom + "%"}}>
							<NodeCluster contents={this.state.nodes}/>
							{/* <CanvasBG
								width={1000}
								height={600}
								contents={this.state.nodes} /> */}
						</div>
						<IndicatorBar
							toIndicate={[
								{
									title: "zoom",
									value: Math.round(this.state.zoom) + "%"
								},
								{
									title: "Directory",
									value: "~/node"
								},
								{
									title: "Version",
									value: this.state.r_version
								}
							]}
						 />
				</div>
			);
	}
}

export default StatCanvas;
