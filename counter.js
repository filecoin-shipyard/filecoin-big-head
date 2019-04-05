import React from 'react'
import {render, Color} from 'ink'
import Box from 'ink-box'

class Counter extends React.Component {
	constructor() {
		super();

		this.state = {
			i: 0
		};
	}

	render() {
		return (
      <Box borderStyle="round" borderColor="cyan" float="center" padding={1}>
        <Color green>
          {this.state.i} tests passed
        </Color>
      </Box>
		);
	}

	componentDidMount() {
		this.timer = setInterval(() => {
			this.setState({
				i: this.state.i + 1
			});
		}, 100);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}
}

render(<Counter/>);
