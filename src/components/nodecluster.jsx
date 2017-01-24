// jshint esversion: 6
import React from "react";

import Node from './node.jsx';

// require("../styles/components/node.scss");

function coordsToTransform(coords) {
	let transform = "translate( "+ coords[0] + "px, " + coords[1] + "px)";
	return { transform: transform };
}

class NodeCluster extends React.Component {

	render() {
		// iterate throught the this.props.contents ie the nodes
		// stored by unique id's and push to array for display
		let nodeArr = [];

		for (var key in this.props.contents) {
			if (this.props.contents.hasOwnProperty(key)) {
		    var value = this.props.contents[key];
				console.log(value.key);
				nodeArr.push(
					(<Node key={key} id={key}
						inlets={value.inlets} outlets={value.outlets}
						type={value.type}
						style={ coordsToTransform(value.coords) }
					/>)
				);
		  }

		}

		return (
				<div className="node-cluster">
					{ nodeArr }
				</div>
			);
	}
}

export default NodeCluster;
