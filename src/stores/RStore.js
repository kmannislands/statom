// jshint esversion: 6
var alt = require('../alt');
var RActions = require('../actions/RActions');
var RSource = require('../sources/RSource');

class RStore {
	constructor() {
		this.def = {};
		this.errorMessage = null;

		this.bindListeners({
			handleUpdateRDef: RActions.UPDATE_RDEF,
			handleFetchRDef: RActions.FETCH_RDEF,
			handleRDefFailed: RActions.R_DEF_FAILED
		});

		// Be careful with this shit
		// Exporting public functions can undermine unidirectional flow
		// MAKE SURE: No direct getters or setters
		this.exportPublicMethods({getTemplate: this.getTemplate});

		// this connects the store to the node source
		this.exportAsync(RSource);
	}

	handleUpdateRDef(obj) {
		this.def = obj;
		this.errorMessage = null;
	}

	handleFetchRDef() {
		this.def = {};
	}

	handleRDefFailed(errorMessage) {
		this.errorMessage = errorMessage;
	}


	////////////////////////////////////////
	// DANGER ZONE: STATIC PUBLIC METHODS //
	////////////////////////////////////////

	getTemplate(id) {
		return this.def[id];
	}

}

module.exports = alt.createStore(RStore, 'RStore');
