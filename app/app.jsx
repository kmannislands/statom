// jshint esversion: 6
import React from "react";
import ReactDom from "react-dom";
import { Window, Content, PaneGroup ,Pane, Form, TabGroup, TabItem } from "react-photonkit";

import Header from "./header.jsx";
import Footer from "./footer.jsx";
import Sidebar from "./sidebar.jsx";
import Chart from "./chart.jsx";
import Node from "./node.jsx";
// import StatTab from "./stattab.jsx";


// sample data for test chart
var sampleData = [
  {id: '5fbmzmtc', x: 7, y: 41, z: 6},
  {id: 's4f8phwm', x: 11, y: 45, z: 9},
  // ...
];

var domain = {x: [0, 30], y: [0, 100]};


require('../index.scss');

ReactDom.render(
  <Window>
    <Header />

    <Content>
      <PaneGroup>
        <Sidebar />
				<Pane>
				<TabGroup activeKey={1}
						draggable={true}>
					<TabItem title="Tab 1"
						eventKey={1}
						>
							{/* <StatTab></StatTab> */}
						</TabItem>
					<TabItem title="Tab 2"
						eventKey={2}
						>
							<div className="padded-more">
			          Second Tab of Shit
			        </div>
						</TabItem>

				</TabGroup>
				</Pane>

      </PaneGroup>
    </Content>
    <Footer />
  </Window>
  , document.querySelector("#main"));
