// jshint esversion: 6
import React from 'react';

import {Actionbar, ButtonGroup, Button} from 'react-photonkit';

require("../styles/components/stattools.scss");

class StatTools extends React.Component {
	passToParent(val) {
		if (typeof this.props[val] === 'function') {
			return this.props[val];
		}
	}
	render() {
		return (
			<div className="stat-toolbar">
				<Actionbar>
				<div className="pull-right">
					<ButtonGroup>
						<Button glyph="minus"
							onClick={this.passToParent("zoomOut").bind(this)}
						/>
						<Button glyph="plus"
							onClick={this.passToParent("zoomIn").bind(this)}
						/>
						<Button glyph="cw"/>
						<Button glyph="plus-squared"
						onClick={this.passToParent("addNode").bind(this)}/>
					</ButtonGroup>
				</div>
				</Actionbar>
			</div>
	);
	}
}

export default StatTools;
