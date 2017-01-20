// jshint esversion: 6
import React from 'react';

import {Actionbar, ButtonGroup, Button} from 'react-photonkit';

import NodeActions from '../actions/NodeActions';

require("../styles/components/stattools.scss");

class StatTools extends React.Component {

	render() {
		return (
			<div className="stat-toolbar">
				<Actionbar>
				<div className="pull-right">
					<ButtonGroup>
						<Button glyph="minus"
							// onClick={this.passToParent("zoomOut").bind(this)}
						/>
						<Button glyph="plus"
							// onClick={this.passToParent("zoomIn").bind(this)}
						/>
						<Button glyph="cw"/>
						<Button glyph="plus-squared"
							onClick={ function() {
								NodeActions.addNode();
							}  }
						/>
					</ButtonGroup>
				</div>
				</Actionbar>
			</div>
	);
	}
}

export default StatTools;
