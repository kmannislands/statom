// jshint esversion: 6
var alt = require('../alt');

class RActions {

	updateRDef(rdef) {
		return rdef;
	}

	fetchRDef(rdef) {
		return rdef;
	}

	rDefFailed(errorMessage) {
		return errorMessage;
	}
}

module.exports = alt.createActions(RActions);
