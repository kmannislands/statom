// jshint esversion: 6
import React from "react";

import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

require("../styles/components/node.scss");

class NodeCluster extends React.Component {
	render() {
		return (
				<div className="node-cluster">
					{this.props.contents.map(node => (
						// <Node title={node.title} />
						<Draggable
							grid={[5,5]}>
							<div className="stat-node"></div>
						</Draggable>
					))}
				</div>
			);
	}
}

export default NodeCluster;
