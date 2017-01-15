var NodeActions = require('../actions/NodeActions');

// uses hack defined in html script
// we say var es5Require = require
// to escape webpack from mangling the package
const ipcRenderer = es5Require('electron').ipcRenderer;

var mockData = [
  { id: 0, name: 'Abu Dhabi' },
  { id: 1, name: 'Berlin' },
  { id: 2, name: 'Bogota' },
  { id: 3, name: 'Buenos Aires' },
  { id: 4, name: 'Cairo' },
  { id: 5, name: 'Chicago' },
  { id: 6, name: 'Lima' },
  { id: 7, name: 'London' },
  { id: 8, name: 'Miami' },
  { id: 9, name: 'Moscow' },
  { id: 10, name: 'Mumbai' },
  { id: 11, name: 'Paris' },
  { id: 12, name: 'San Francisco' }
];

var LocationSource = {
  fetchNodes(filePath) {
    return {
      remote() {
        return new Promise(function (resolve, reject) {
          // simulate an asynchronous flow where data is fetched on
          // a remote server somewhere.
					// responder to r version event emitter from ipcMain
					ipcRenderer.on('updateFile', (event, arg) => {
						if (typeof arg === 'string') {
							reject('There is a problem loading your file. Please check it for corruption' +
								'with your text editor of choice.');
						} else {
							resolve(arg);
						}
					});
					// request that r-version logic on the backend
					ipcRenderer.send('request-updateFile', filePath);
        });
      },

      local() {
        // Never check locally, always fetch remotely.
        return null;
      },

      success: NodeActions.updateNodes,
      error: NodeActions.nodesFailed,
      loading: NodeActions.fetchNodes
    }
  }
};

module.exports = LocationSource;
