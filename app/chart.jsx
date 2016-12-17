// jshint esversion: 6
import React from "react";
import {d3Chart} from '../scripts/d3chart.js';
import ReactDOM from "react-dom";

class Chart extends React.Component {
  constructor() {
			super();
	    this.data = React.PropTypes.array;
	    this.domain = React.PropTypes.object;
	}

  componentDidMount() {
    var el = ReactDOM.findDOMNode(this);
    d3Chart.create(el, {
      width: '100%',
      height: '300px'
    }, this.getChartState());
  }

  componentDidUpdate() {
    var el = ReactDOM.findDOMNode(this);
    d3Chart.update(el, this.getChartState());
  }

  getChartState() {
    return {
      data: this.props.data,
      domain: this.props.domain
    };
  }

  componentWillUnmount() {
    var el = ReactDOM.findDOMNode(this);
    d3Chart.destroy(el);
  }

  render() {
    return (
      <div className="Chart"></div>
    );
  }
}

export default Chart;
