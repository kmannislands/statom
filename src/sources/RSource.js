// jshint esversion: 6
var RActions = require('../actions/RActions');

// uses hack defined in html script
// we say var es5Require = require
// to escape webpack from mangling the package
const ipcRenderer = es5Require('electron').ipcRenderer;

var RSource = {
  fetchNodes(filePath) {
    return {
      remote() {
        return new Promise(function (resolve, reject) {
          // simulate an asynchronous flow where data is fetched on
          // a remote server somewhere.
					// responder to r version event emitter from ipcMain
					ipcRenderer.on('updateRDef', (event, arg) => {
						if (typeof arg === 'string') {
							reject('There is a problem loading the R language definition');
						} else {
							console.log(arg);
							resolve(arg);
						}
					});
					// request that r-version logic on the backend
					ipcRenderer.send('request-updateRDef', {test:'test'});
        });
      },

      local() {
        // Never check locally, always fetch remotely.
        return null;
      },

      success: RActions.updateRDef,
      error: RActions.rDefFailed,
      loading: RActions.fetchRDef
    };
  }
};

module.exports = RSource;
