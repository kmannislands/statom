// jshint esversion: 6
import React from "react";

// import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

var DropTarget = require('react-dnd').DropTarget;
var ItemTypes = require('./Constants').ItemTypes;
var PropTypes = React.PropTypes;

require("../styles/components/node.scss");

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
var outletTarget = {
  canDrop: function (props, monitor) {
    // You can disallow drop based on props or item
    var item = monitor.getItem();
    // return canMakeChessMove(item.fromPosition, props.position);
		return true;
  },

  hover: function (props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentWillReceiveProps() to handle enter/leave.

    // You can access the coordinates if you need them
    var clientOffset = monitor.getClientOffset();
    // var componentRect = findDOMNode(component).getBoundingClientRect();

    // You can check whether we're over a nested drop target
    var isJustOverThisOne = monitor.isOver({ shallow: true });

    // You will receive hover() even for items for which canDrop() is false
    var canDrop = monitor.canDrop();
  },

  drop: function (props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    var item = monitor.getItem();
		console.log("Dropped!");
		console.log(item);
		// TODO: remove console log, use these two coordinates to render path
		var clientOffset = monitor.getClientOffset();
		var initialClientOffset = monitor.getInitialClientOffset();
		console.log(clientOffset);
		console.log(initialClientOffset);

    // You can do something with it
    // ChessActions.movePiece(item.fromPosition, props.position);

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class Outlet extends React.Component {

	componentWillReceiveProps(nextProps){
    if (!this.props.isOver && nextProps.isOver) {
      // You can use this as enter handler
    }

    if (this.props.isOver && !nextProps.isOver) {
      // You can use this as leave handler
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
      // You can be more specific and track enter/leave
      // shallowly, not including nested targets
    }
  }
	passToParent(val) {
		if (typeof this.props[val] === 'function') {
			return this.props[val];
		}
	}
  render() {
			// These props are injected by React DnD,
		 // as defined by your `collect` function above:
		 var isOver = this.props.isOver;
		 var canDrop = this.props.canDrop;
		 var connectDropTarget = this.props.connectDropTarget;

		return(
			connectDropTarget(
				<div className="inlet" onMouseDown={function (e) {
					e.stopPropagation();
				}}>
				{isOver && canDrop && <i className='icon-flow-line' />}
				{isOver && !canDrop && <i className='icon-block' />}
				</div>
			)
		);
  }
}

Outlet.propTypes = {
	onStop: PropTypes.func,
	id: PropTypes.string
}
module.exports = DropTarget(ItemTypes.INLET, outletTarget, collect)(Outlet);
