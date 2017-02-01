// jshint esversion: 6

const R = require('r-script');

module.exports = class Node {
	constructor(node) {
  	this.fn = node.type;
    this.inlets = node.inlets;
    this.outlets = node.outlets;
  }

  updateVals(node) {
  	// don't let them change the function type,
    // just othet attrs
  	this.inlets = node.inlets;
    this.outlets = node.outlets;
  }

  call(inputArr) {
  	return (new Promise(function(resolve, reject){
			// TODO figure out greater R structure to work with this
    	// here is there R code would go on backend
      // R('lm.R')
      // .data(inputArr)
      // .call((data, err) => {
      //   if (err) reject(err);
      //   else resolve(data);
      // });

      // delay half a sec to simulate async R call
      setTimeout(function() {
      	resolve({
        	value: inputArr[0]*2,
          data_type: 'numerical'
        });
      }, 500);
    }));

  }
}
