// jshint esversion: 6
import React from "react";
import ReactDOM from "react-dom";
import {TabGroup, TabItem, Button} from "react-photonkit";

import StatCanvas from "./statcanvas.jsx";

class TabBar extends React.Component {
	render() {
		return (
			<div>
				<TabGroup activeKey={1} draggable={true}>
					{/* Render a tab per tab prop element */}
					{this.props.tabs.map(tab => (
						<TabItem title={tab.title + " " + tab.key} eventKey={tab.key} key={tab.key}>
							<div>
								<StatCanvas tabNum={tab.key} />
							</div>
						</TabItem>
					))}
				</TabGroup>

			</div>
		);
	}
}

export default TabBar;
