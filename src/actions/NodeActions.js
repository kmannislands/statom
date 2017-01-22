// jshint esversion: 6
var alt = require('../alt');

class NodeActions {

	updateNodes(nodes) {
		return {nodes};
	}

	fetchNodes(filePath) {
		return {filePath};
	}

	nodesFailed(errorMessage) {
		return {errorMessage};
	}

	addNode(node) {
		return {node};
	}

	setNodeCoords(node, coords) {
		return {node, coords};
	}

	createRelationship(inlet, outlet){
		return {inlet, outlet};
	}
}

module.exports = alt.createActions(NodeActions);
