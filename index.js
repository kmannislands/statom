// jshint esversion: 6
'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');
const Menu = require('menu');
const template = require('./scripts/menu');

const jsonfile = require('jsonfile');

// shouldn't have to manually include this but we do, thanks babel
const Buffer = require("buffer").Buffer;
const fs = require("fs");

const ipcMain = require('ipc-main');

// R core
const R = require("r-script");

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;
var menu = Menu.buildFromTemplate(template);

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const is2nd = process.argv.indexOf('--2nd') >= 0;
	var opts = {
		width: 1200,
		height: 600,
		'accept-first-mouse': true,
		'title-bar-style': 'hidden'
	};
  if (is2nd) {
    setOptsForDualScreen(opts);
  }

	const win = new BrowserWindow(opts);
	if (process.env.DEV) {
		win.loadUrl('http://localhost:8000/dev.html');
		win.openDevTools();
	} else {
		win.loadUrl(`file://${__dirname}/index.html`);
	}
	win.on('closed', onClosed);

	if (menu) {
		Menu.setApplicationMenu(menu);
		menu = null;
	}

	return win;
}

function setOptsForDualScreen(opts) {
  var atomScreen = require('screen');
  var displays = atomScreen.getAllDisplays();
  var d2 = displays.length > 1 ? displays[1] : null;
  if (d2) {
    opts.x = d2.bounds.x + (d2.size.width - opts.width) / 2;
    opts.y = d2.bounds.y + (d2.size.height - opts.height) / 2;
  }
}

app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate-with-no-open-windows', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();


	// dev environment live reloader shiet
	if (process.env.DEV) {
		const watcher = require('./scripts/watcher.js');
		watcher.watch(app, ['./index.js', './scripts']);
	}
});

// TODO: come up with a seperate file for ipcMain event handling
// Or an object wrapper or something

// Respond to request for r version from frontend
ipcMain.on('request-r-version', (event, arg) => {
	R("r/version.r")
	.data({
		flag: '1'
	})
	.call(function(err, d) {
		if (err){
			event.sender.send('r-version', new Buffer(err).toString());
		} else event.sender.send('r-version', d);
	});
});

// reads a file for the first time
ipcMain.on('request-updateFile', (event, arg) => {
	let ret;
	jsonfile.readFile(arg, function(err, obj) {
		if (err)	{
			ipcMain.sender.send('updateFile',
				"Error: problem reading your file.");
		}
		else ipcMain.sender.send('updateFile', obj);
	});
});

ipcMain.on('synchronous-message', (event, arg) => {
  // console.log(arg);  // prints "ping"
  event.returnValue = 'sync: print this string in react frontend --thanks, the backend';
});
