// jshint esversion: 6
import React from "react";
import { Toolbar, Actionbar, Button, ButtonGroup } from "react-photonkit";

class Header extends React.Component {
	addNode() {
		console.log("Clicked!");
	}

  render() {
    return (
      <Toolbar title="epp">
        <Actionbar>
          <ButtonGroup>
            <Button glyph="home" />
            <Button glyph="plus-squared"
						onClick={this.addNode.bind(this)} />
          </ButtonGroup>
        </Actionbar>
      </Toolbar>
    );
  }
}

export default Header;
