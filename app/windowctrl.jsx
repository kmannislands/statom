// jshint esversion: 6
import React from "react";
import ReactDom from "react-dom";
import {
	Window,
	Content,
	PaneGroup,
	Pane,
	Form,
	TabGroup,
	Actionbar,
	Toolbar,
	ButtonGroup,
	Button,
	TabItem
} from "react-photonkit";

import Header from "./header.jsx";
import Footer from "./footer.jsx";
import Sidebar from "./sidebar.jsx";
import Node from "./node.jsx";
import TabBar from "./tabbar.jsx";
import StatCanvas from "./statcanvas.jsx";
import Chart from "./chart.jsx";

class WindowCtrl extends React.Component {
	// Initialize function
	constructor(props) {
		super(props);

		// HERE'S HOW TO BIND FUNCTIONS SO THEY
		// MODIFY THE PARENT STATE WHEN FIRED FROM
		// CHILD COMPONENTS
		this.addTab = this.addTab.bind(this);
		this.removeTab = this.removeTab.bind(this);


		// Initialize state
		this.state = {
			tabs: [
			],
			sampleData: [
				{id: '5fbmzmtc', x: 7, y: 41, z: 6},
  			{id: 's4f8phwm', x: 11, y: 45, z: 9},
				{id: 'sadffdsa', x: 5, y: 56, z: 2},
  			{id: 's4234fds', x: 13, y: 89, z: 3},
			]
		};
	}
	componentDidMount() {
	}
	addTab() {
		console.log(this.state);
		let currId = (this.state.tabs.length + 1);
		let newTab = {
      title: "tab",
      key: currId
    };
    this.setState((prevState) => (
			{ tabs: prevState.tabs.concat(newTab) }
		));
	}
	removeTab() {
		console.log("TODO determine active tab");
		// if (this.state.tabs.length > 1) {
			this.setState((prevState) => (
				{ tabs: prevState.tabs.slice(0, (prevState.tabs.length - 1)) }
			));
		// }
	}
	render() {
		return (
			<Window>
			 <Header addTab={this.addTab}
			 removeTab={this.removeTab}/>
				<Content>
					<PaneGroup>
						<Pane>
							<TabBar tabs={this.state.tabs}
							/>
						</Pane>

					</PaneGroup>
				</Content>
				<Footer/>
			</Window>
		);
	}
}

export default WindowCtrl;
