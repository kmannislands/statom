// jshint esversion: 6
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;

// iPc's
const ipcMain = require('electron').ipcMain;
const ipcRenderer = require('electron').ipcRenderer;


// import backend js
const StatCanvas = require('./StatCanvas');
const Node = require('./Node');

// Variables to be used in testing
let TestCanvas, TestNode;

global.before(function () {
    chai.should();
    chai.use(chaiAsPromised);
});

describe('Statcanvas', function() {
    describe('the constructor', function() {
				beforeEach(function() {
					TestCanvas = new StatCanvas();
				});

				it('creates an object', function() {
					TestCanvas.should.exist;
				});

        it('the object exposes a list of nodes', function() {
          TestCanvas.getAllNodes().should.be.a('object');
        });

				it('the object has a list of values', function() {
					TestCanvas.should.have.property("values");
				});
    });
		describe('addNode()', function() {
			beforeEach(function() {
				TestCanvas = new StatCanvas();
			});
			it('should create a new node in the state', function(){
				TestCanvas.addNode({ nodeId1: {
			    inlets: [],
			    outlets: [],
			    type: 'lm()'
			  }});
		 		TestCanvas.getAllNodes().should.have.property("nodeId1");
				return TestCanvas.getAllNodes().nodeId1.should.be.a('object');
			});
			it('should not modify the any other nodes in state when adding', function() {
				let beforeNodes = TestCanvas.getAllNodes();
				let randomId = '';
				while(beforeNodes.has(randomId)) {
					randomId = Math.random().toString(36).substring(7);
				}
				TestCanvas.addNode(new nodedef(randomId, {
					inlets: [],
					outlets: [],
					type: 'nls()'
				}));
			});
		});

});

// TODO Determine a good R function for unit testing each of
// the various aspects of the node class itself

describe('Node', function() {
    beforeEach(function() {
      TestNode = null;
      TestNode = new Node({
        inlets: [
          {
            id: 'i-0-0',
            data_type: 'model',
            name: 'x'
          }, {
            id: 'i-0-1',
            data_type: 'data_frame',
            name: 'data'
          }
        ],
        outlets: [
          {
            id: 'o-0-0',
            to: "i-1-0"
          }
        ],
        type: 'lm()'
      });
    });
    describe('constructor', function() {

        it('should take on node structure from object on construction', function() {
          TestNode.should.have.property("inlets").with.a.lengthOf(2);
					TestNode.should.have.property("fn");
					return TestNode.should.have.property("outlets").with.a.lengthOf(1);
        });
    });
		describe('call()', function() {
      it('should return a promise', function(){
        return TestNode.call([1,2,3]).should.to.be.a('promise');
      });
      it('should resolve to an object with value and data type', function() {
        return Promise.all([
					TestNode.call([1,2,3]).should.eventually.have.property("data_type"),
	        TestNode.call([1,2,3]).should.eventually.have.property("value")
				]);
      });
      // TODO figure out error handling quite a bit better
			it('should throw an error when you ask it to do something wrong', function() {

      });
		});
});
