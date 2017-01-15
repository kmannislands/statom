var React = require('react');
var DragSource = require('react-dnd').DragSource;

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
var Types = {
  CARD: 'card'
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
var cardSource = {
  beginDrag: function (props) {
    // Return the data describing the dragged item
    var item = { id: props.id };
    return item;
  },

  endDrag: function (props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    var item = monitor.getItem();
    var dropResult = monitor.getDropResult();
    CardActions.moveCardToList(item.id, dropResult.listId);
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

var Card = React.createClass({
  render: function () {
    // Your component receives its own props as usual
    var id = this.props.id;

    // These two props are injected by React DnD,
    // as defined by your `collect` function above:
    var isDragging = this.props.isDragging;
    var connectDragSource = this.props.connectDragSource;

    return connectDragSource(
      <div>
        I am a draggable card number {id}
        {isDragging && ' (and I am being dragged now)'}
      </div>
    );
  }
});

// Export the wrapped version
module.exports = DragSource(Types.CARD, cardSource, collect)(Card);
