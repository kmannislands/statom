// jshint esversion: 6
import React from 'react';
const d3 = require('d3');

import NodeStore from '../stores/NodeStore';

const lineFunction = function(data) {
	return d3.svg.line()
			.x(function(d) { return d[0]; })
			.y(function(d) { return d[1]; })
			.interpolate('bundle');
};

const assembleLine = function(startCoords, endCoords) {
	// trigonometry time

	// make an array of the coordinates to
	let lineArr = [];
	lineArr.push(startCoords);

	// distance between the two handles
	let distance = Math.pow(Math.pow((startCoords[1] - endCoords[1]), 2) +
		Math.pow((startCoords[0] - endCoords[0]), 2), 0.5);

	// angle between the two handles
	let angleRadians = Math.atan2(endCoords[1] - startCoords[1],
		endCoords[0] - startCoords[0]);
	if (angleRadians <= Math.PI ) {
		let firstQuarter = [
			// start at half the angle between the two,
			// quarter of the way there
			startCoords[0] + (Math.sin(angleRadians / 2) * (distance / 4)),
			startCoords[1] + (Math.cos(angleRadians / 2) * (distance /4))
		];
		lineArr.push(firstQuarter);
		let lastQuarter = [
			// start at half the angle between the two,
			// quarter of the way there
			endCoords[0] + (Math.sin(Math.PI - (angleRadians / 2)) * (distance / 4)),
			endCoords[1] + (Math.cos(Math.PI - (angleRadians / 2)) * (distance /4))
		];
		lineArr.push(lastQuarter);
	}



	lineArr.push(endCoords);

	return lineArr;
};



const makePathArr = (contents) => {
	let pathArr = [];
	let pathCount = 0;

	for (var key in contents) {
		if (contents.hasOwnProperty(key)) {
			var value = contents[key];
			for (let i = 0; i < value.outlets.length; i++) {
				if (value.outlets[i].to !== "") {
					// iterating over outlets with a defined to attributes

					// get the coordinates for each handle from id
					let endCoords = NodeStore.getHandleCoords(value.outlets[i].to);
					let startCoords = NodeStore.getHandleCoords(value.outlets[i].id);

					// make an array of the coordinates for later d3
					let lineArr = assembleLine(startCoords,endCoords);

					pathArr.push(
						<path key={pathArr.length}
							data-val={value.outlets[i].toString()}
							// create the svg path instructions w d3
							d={lineFunction()(lineArr)}
							stroke="#000"
							fill="none">
						</path>);
				} else continue;
			}
		}
	}
	return pathArr;
};

export default (props) => {
  const pathArr = makePathArr(props.contents);
  return(<svg className="canvasBG" width={props.width} height={props.height}>
    {pathArr}
  </svg>);
}
