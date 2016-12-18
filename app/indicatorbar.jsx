// jshint esversion: 6
import React from "react";

require("../styles/components/indicatorbar.scss");

class IndicatorBar extends React.Component {
	render() {
		return (
				<div className="indicator-bar">
					<table>
						<tbody>
							<tr>
								{this.props.toIndicate.map((indi)=> (
									<td>{indi.title} : {indi.value}</td>
								))}
							</tr>
						</tbody>
					</table>
				</div>
			);
	}
}

export default IndicatorBar;
