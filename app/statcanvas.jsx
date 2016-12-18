// jshint esversion: 6
let zoomAmount = 1.1;

import React from "react";

import StatTools from "./stattools.jsx";
import NodeCluster from "./nodecluster.jsx";
import IndicatorBar from "./indicatorbar.jsx";
// import IndicatorBar from "./indicatorbar.jsx";


require("../styles/components/statcanvas.scss");

class StatCanvas extends React.Component {
	constructor(props) {
		super(props);
		this.addNode = this.addNode.bind(this);
		this.zoomIn = this.zoomIn.bind(this);
		this.zoomOut = this.zoomOut.bind(this);

		this.state = {
			nodes: [],
			zoom: 100
		};
	}
	addNode() {
		console.log(this.state);
		let currId = (this.state.nodes.length + 1);
		let newNode = {
      title: "Node",
      key: currId
    };
    this.setState((prevState) => (
			{ nodes: prevState.nodes.concat(newNode) }
		));
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
						</div>
						<IndicatorBar
							toIndicate={[
								{
									title: "zoom",
									value: Math.round(this.state.zoom) + "%"
								},
								{
									title: "Directory:",
									value: "~/node"
								}
							]}
						 />
				</div>
			);
	}
}

export default StatCanvas;
