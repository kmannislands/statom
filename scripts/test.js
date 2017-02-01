// jshint esversion: 6
var Application = require('spectron').Application;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var path = require('path');

global.before(function () {
    chai.should();
    chai.use(chaiAsPromised);
});

var electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');

console.log(electronPath);


if (process.platform === 'win32') {
    electronPath += '.cmd';
}

var appPath = path.join(__dirname, '..');

var app = new Application({
	path: electronPath,
	args: [appPath]
});


describe('application launch', function () {
  beforeEach(function () {
    return app.start();
  });

  // beforeEach(function () {
  //   chaiAsPromised.transferPromiseness = app.transferPromiseness;
  // });

  afterEach(function () {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  it('opens a window', function () {
    return app.client.waitUntilWindowLoaded()
      .getWindowCount().should.eventually.equal(1)
      .browserWindow.isMinimized().should.eventually.be.false
      .browserWindow.isDevToolsOpened().should.eventually.be.false
      .browserWindow.isVisible().should.eventually.be.true
      .browserWindow.isFocused().should.eventually.be.true
      .browserWindow.getBounds().should.eventually.have.property('width').and.be.above(0)
      .browserWindow.getBounds().should.eventually.have.property('height').and.be.above(0);
  });
});
