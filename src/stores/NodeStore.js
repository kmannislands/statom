// jshint esversion: 6
var alt = require('../alt');
var NodeActions = require('../actions/NodeActions');
var NodeSource = require('../sources/NodeSource');

// useful in general; monkey patched here cause that's where I use it
// but TODO: utils file or use lodash

Object.size = function(obj) {
	var size = 0,
		key;
	for (key in obj) {
		if (obj.hasOwnProperty(key))
			size++;
		}
	return size;
};

function nodedef(id, node) {
	this[id] = node;
}

class NodeStore {
	constructor() {
		this.nodes = {};
		this.zoom = {};
		this.errorMessage = null;
		this.version = {};
		this.dimensions = [
			5000, 3000
		];

		this.bindListeners({
			handleUpdateNodes: NodeActions.UPDATE_NODES,
			handleFetchNodes: NodeActions.FETCH_NODES,
			handleNodesFailed: NodeActions.NODES_FAILED,
			addNode: NodeActions.ADD_NODE,
			createRelationship: NodeActions.CREATE_RELATIONSHIP,
			setNodeCoords: NodeActions.SET_NODE_COORDS
		});

		// Be careful with this shit
		// Exporting public functions can undermine unidirectional flow
		// MAKE SURE: No direct getters or setters
		this.exportPublicMethods({getNode: this.getNode, getHandleCoords: this.getHandleCoords});

		// this connects the store to the node source
		this.exportAsync(NodeSource);
	}

	handleUpdateNodes(nodes) {
		this.nodes = nodes;
		this.errorMessage = null;
	}

	handleFetchNodes() {
		this.nodes = {};
	}

	handleNodesFailed(errorMessage) {
		this.errorMessage = errorMessage;
	}

	// example of applying an operation to the whole store,
	// wouldn't work cause map
	// resetAllFavorites() {
	//   this.locations = this.locations.map((location) => {
	//     return {
	//       id: location.id,
	//       name: location.name,
	//       has_favorite: false
	//     };
	//   });
	// }

	addNode(node) {
		// let { nodes } = this.state;

		// autiomatically asign a larger ID
		// TODO check for uniqueness and/or implement a better method
		let currId = Object.size(this.nodes) + 1;

		console.log("adding currId: " + currId);


		// dummy definition of a new node
		let newNode = {
			key: currId,
			outlets: [
				{
					id: 'o-' + currId + '-0',
					data_type: 'string',
					name: 'val',
					to: ''
				}
			],
			inlets: [
				{
					id: 'i-' + currId + '-0',
					data_type: 'string',
					name: 'argument'
				}, {
					id: 'i-' + currId + '-1',
					data_type: 'string',
					name: 'argument2'
				}, {
					id: 'i-' + currId + '-2',
					data_type: 'string',
					name: 'argument3'
				}
			],
			type: 'input',
			coords: [0, 0]
		};
		this.setState(function(prevState) {
			// milad help, there's gotta be a better way to do this
			// esp since I cheated and brough lodash
			let copy = JSON.parse(JSON.stringify(prevState));
			let nodeCopy = JSON.parse(JSON.stringify(prevState.nodes));

			// flex
			copy.nodes = _.assign(nodeCopy, new nodedef(currId, newNode));

			return copy;
		});

	}

	createRelationship(rel) {
		let toId = rel.inlet.id.split('-')[1];
		let fromId = rel.outlet.id.split('-')[1];

		let outletIndex = rel.outlet.id.split('-')[2];
		let inletIndex = rel.inlet.id.split('-')[2];

		console.log(fromId + ' -> ' + toId);

		this.setState((prevState) => {
			let oldOutlet = prevState.nodes[fromId].outlets[outletIndex];

			let newOutlet = _.assign(oldOutlet, {to: rel.inlet.id});

			prevState.nodes[fromId].outlets[outletIndex] = newOutlet;

			// console.log(prevState);

			return prevState;
		});
	}

	setNodeCoords(data) {
		this.setState((prevState) => {
			let copy = JSON.parse(JSON.stringify(prevState));
			prevState.nodes[data.node] = _.assign(copy.nodes[data.node], {coords: data.coords});
			return prevState;
		});
	}

	////////////////////////////////////////
	// DANGER ZONE: STATIC PUBLIC METHODS //
	////////////////////////////////////////

	getNode(id) {
		var {nodes} = this.getState();
		// advantage of storing in object, boom
		if (nodes[id] !== null)
			return nodes[id];
		else
			return null;
		}

	getHandleCoords(string) {
		string = string.split('-');
		let nodeId = string[1];
		let typeStr = string[0];
		let handleIndex = string[2];

		let thisNodeCoords = this.state.nodes[nodeId].coords;
		let typeString,
			yOffset;

		if (typeStr == 'i') {
			typeString = 'inlets';
			yOffset = thisNodeCoords[1];
		} else {
			typeString = 'outlets';
			yOffset = thisNodeCoords[1] + 125;
		}
		let totalHandlesOfType = this.state.nodes[nodeId][typeString].length;
		let coords = [];
		let xOffset = thisNodeCoords[0];

		let halfway = ((totalHandlesOfType - 1) / 2);

		if (handleIndex <= halfway) {
			xOffset = xOffset + 64 - ((halfway - handleIndex) * 21);
		} else {
			xOffset = xOffset + 64 + ((handleIndex - halfway) * 21);
		}
		// xOffset = xOffset + 64;
		coords = [xOffset, yOffset];


		return coords;
	}
}

module.exports = alt.createStore(NodeStore, 'NodeStore');
