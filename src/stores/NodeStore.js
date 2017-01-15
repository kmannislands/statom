// jshint esversion: 6
var alt = require('../alt');
var NodeActions = require('../actions/NodeActions');
var NodeSource = require('../sources/NodeSource');

class LocationStore {
  constructor() {
    this.nodes = {};
    this.errorMessage = null;

    this.bindListeners({
      handleUpdateNodes: NodeActions.UPDATE_NODES,
      handleFetchNodes: NodeActions.FETCH_NODES,
      handleNodesFailed: NodeActions.NODES_FAILED,
      addNode: NodeActions.ADD_NODE
    });

    this.exportPublicMethods({
      getNode: this.getNode
    });

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
		let { nodes } = this.getState();

		// autiomatically asign a larger ID
		// TODO check for uniqueness and/or implement a better method
		let currId = Object.size(nodes) + 1;

		console.log("adding currId: " + currId);

		let newNode = {
			key: currId,
			outlets: [
				{
					id: currId + '-outlet',
					data_type: 'string',
					name: 'val'
				}
			],
			inlets: [
				{
					id: currId + '-inlet',
					data_type: 'string',
					name: 'argument'
				},
				{
					id: currId + '-inlet1',
					data_type: 'string',
					name: 'argument2'
				},
				{
					id: currId + '-inlet2',
					data_type: 'string',
					name: 'argument3'
				}
			],
			type: 'input'
		};
		this.setState(function(prevState){
			// milad help, there's gotta be a better way to do this
			// esp since I cheated and brough lodash
			let copy = JSON.parse(JSON.stringify(prevState));
			let nodeCopy = JSON.parse(JSON.stringify(prevState.nodes));

			// flex
			copy.nodes = _.assign(nodeCopy, new node(currId,newNode));

			return copy;
		});

  }

  getNode(id) {
    var { nodes } = this.getState();
		// advantage of storing in object, boom
    if (nodes[id] !== null) return nodes[id];
		else return null;
  }
}

module.exports = alt.createStore(NodeStore, 'NodeStore');
