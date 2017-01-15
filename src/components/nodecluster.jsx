// jshint esversion: 6
import React from "react";

import Node from './node.jsx';

// require("../styles/components/node.scss");

class NodeCluster extends React.Component {
	passToParent(val) {
		if (typeof this.props[val] === 'function') {
			return this.props[val];
		}
	}
	renderNodes(nodeList) {
		let toReturn;
		console.log(nodeList);

		return toReturn;
	}
	render() {
		let nodeArr = [];
		for (var key in this.props.contents) {
		// for (let i = 0; i < Object.size(this.props.contents); i++) {
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
