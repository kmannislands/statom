// jshint esversion: 6
import React from "react";
import {Toolbar, Actionbar, Button, ButtonGroup} from "react-photonkit";

class Header extends React.Component {
	passToParent(val) {
		if (typeof this.props[val] === 'function') {
			// console.log("firing parent fn " + val);
			return this.props[val];
		}
	}
	render() {
		return (
			<Toolbar title="epp">
				<Actionbar>
					<ButtonGroup>
						<Button glyph="home"/>
						<Button glyph="floppy" />
						<Button glyph="folder" />
					</ButtonGroup>
					<div className="pull-right">
						<ButtonGroup>
							<Button glyph="plus-squared" onClick={this.passToParent("addTab").bind(this)}/>
							<Button glyph="cancel-squared" onClick={this.passToParent("removeTab").bind(this)}/>
						</ButtonGroup>
					</div>
				</Actionbar>
			</Toolbar>
		);
	}
}

export default Header;
