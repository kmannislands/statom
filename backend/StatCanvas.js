// jshint esversion: 6
// this is roughly isomorphic to the front-end actions and stores
// implemented my own js structure here inspired by flux state

const _ = require('lodash');

const ipcMain = require('electron').ipcMain;

const StatCanvasActions = require('./actions/StatCanvasActions.js');

const Node = require('./Node.js');

function nodedef(id, node) {
	this[id] = node;
}

module.exports = class StatCanvas {
	constructor() {
		this.filePath = "";
		this.nodes = {};
		this.values = {};

		// TODO bind to ipcMain
		// ipcMain.on(StatCanvasActions.ADD_NODE, this.addNode);
		// ipcMain.on(StatCanvasActions.UPDATE_NODE, this.updateNode);
		// ipcMain.on(StatCanvasActions.GET_NODE, this.getNode);
	}

	////////////////////
	// ERROR HANDLERS //
	////////////////////

	// TODO Add real error handling

	nodeError(err) {
			throw new Error(err);
	}

	///////////////////////
	// PRIVATE FUNCTIONS //
	///////////////////////

	setNodeVal(data) {
		console.log(data);
		return;
	}

	//////////////
	// HANDLERS //
	//////////////

	addNode(node) {
		for (var key in node) {
			this.nodes = _.assign(this.nodes, new nodedef(key, new Node(node[key])));
		}
	}

	updateNode(node) {
		for (var key in node) {
			// node updated in the store
			this.nodes[key].updateVals(node[key]);

			// call here with a bogus input arr
			// would have to be passed in from
			// parents, though
			this.nodes[key].call([1,2,3])
			.then(
				this.setNodeVal
			)
			.catch(
				this.nodeError
			);
		}
	}

	getAllNodes() {
		return this.nodes;
	}

}
