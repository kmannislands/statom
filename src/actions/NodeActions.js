// jshint esversion: 6
var alt = require('../alt');

class NodeActions {
  updateNodes(nodes) {
    this.dispatch(nodes);
  }

  fetchNodes(filePath) {
    this.dispatch(filePath);
  }

	nodesFailed(errorMessage) {
		this.dispatch(errorMessage);
	}

  addNode(node) {
    this.dispatch(node);
  }
}

module.exports = alt.createActions(NodeActions);
