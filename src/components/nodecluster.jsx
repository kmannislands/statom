// jshint esversion: 6
import React from "react";

import Node from './node.jsx';

// require("../styles/components/node.scss");

class NodeCluster extends React.Component {

	render() {
		// itertate throught the object's properties ie the nodes
		// stored by unique id's and push to array for display
		let nodeArr = [];

		for (var key in this.props.contents) {
			if (this.props.contents.hasOwnProperty(key)) {
		    var value = this.props.contents[key];
				nodeArr.push(
					<Node key={value.key} id={value.key}
						inlets={value.inlets} outlets={value.outlets}
						type={value.type}
					/>
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
