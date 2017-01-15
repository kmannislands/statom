// jshint esversion: 6
import React from "react";

// import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

var DragSource = require('react-dnd').DragSource;
var ItemTypes = require('./Constants').ItemTypes;
var PropTypes = React.PropTypes;

require("../styles/components/node.scss");

var inletSource = {
  beginDrag: function (props) {
    // Return the data describing the dragged item
    var item = { id: props.id };
		console.log('Firing Begin Drag');
    return item;
  },
	isDragging: function(props, monitor) {
		// console.log('dragging');
		console.log(monitor);
		// console.log(monitor.getInitialClientOffset());
		// console.log(monitor.getDifferenceFromInitialOffset());
		// console.log(monitor.getInitialClientOffset());
		return true;
	},
  endDrag: function (props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    var item = monitor.getItem();
    var dropResult = monitor.getDropResult();
		console.log(dropResult);
    // CardActions.moveCardToList(item.id, dropResult.listId);
  }
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

class Inlet extends React.Component {
	passToParent(val) {
		if (typeof this.props[val] === 'function') {
			return this.props[val];
		}
	}
  render() {
		var isDragging = this.props.isDragging;
	 	var connectDragSource = this.props.connectDragSource;
		// passToParent(connectDragSource);
		return(
			connectDragSource(
				<div className="inlet" onMouseDown={function (e) {
					e.stopPropagation();
				}}></div>
			)
		);
  }
}

Inlet.propTypes = {
	onStop: PropTypes.func,
	id: PropTypes.string
}
module.exports = DragSource(ItemTypes.INLET, inletSource, collect)(Inlet);
