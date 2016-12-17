// jshint esversion: 6
import React from "react";

class CanvasToolbar extends React.Component {

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
      <div className="stat-node"></div>
    );
  }
}

export default StatCanvas;
