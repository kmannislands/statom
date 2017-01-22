// jshint esversion: 6
import React from "react";
import Inlet from "./inlet.jsx";
import Outlet from "./outlet.jsx";

import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

import NodeActions from "../actions/NodeActions";

const PropTypes = React.PropTypes;

require("../styles/components/node.scss");

class Node extends React.Component {
  render() {
		let nodeID = this.props.id;
    return (
			<Draggable grid={[5,5]} onDrag={function(e, i){
					NodeActions.setNodeCoords(nodeID, [i.lastX, i.lastY]);
				}}
				onStop={function(e, i){
					NodeActions.setNodeCoords(nodeID, [i.lastX, i.lastY]);
				}}
			>
      <div className="stat-node">
				<div className="inlet-container">
					{
						this.props.inlets.map((inlet, index) => (
							<Inlet
								key={index}
								id={ "i-" + this.props.id + "-" + index }
							/>
						))
					}
				</div>
				<span>{this.props.type}</span>
				<div className="outlet-container">
					{this.props.outlets.map((outlet, index) => (
						<Outlet
							key={index}
							id= { "o-" + this.props.id + "-" + index }
						/>
					))}
				</div>
			</div>
			</Draggable>
    );
  }
}

Node.propTypes = {
	inlets: React.PropTypes.array,
	outlets: React.PropTypes.array,
	isDropping: React.PropTypes.bool
}

export default Node;
