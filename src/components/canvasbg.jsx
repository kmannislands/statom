// jshint esversion: 6
import React from 'react';
import d3 from 'd3';


const xMax = (data)  => d3.max(data, (d) => d[0]);
const yMax = (data)  => d3.max(data, (d) => d[1]);


// const lineFunction = d3.svg.line()
// 		.x(function(d) { return d.x; })
// 		.y(function(d) { return d.y; })
// 		.interpolate("monotone");

const xScale = (props) => {
  return d3.scale.linear()
    .domain([0, xMax(props.data)])
    .range([props.padding, props.width - props.padding * 2]);
};


const yScale = (props) => {
  return d3.scale.linear()
    .domain([0, yMax(props.data)])
    .range([props.height - props.padding, props.padding]);
};
const marshalProps = (props) => {
  const scales = { xScale: xScale(props), yScale: yScale(props) };
  return Object.assign({}, props, scales);
};

const makePathArr = (contents) => {
	for(let i; i < Object.size(contents); i++) {
		pathArr.push(contents[i]);
	}
};

export default (props) => {
  const pathArr = makePathArr(this.props.contents);
  return(<svg width={props.width} height={props.height}>
    {pathArr}
  </svg>);
}
