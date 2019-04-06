import React from 'react'
import { render, Box, Color } from 'ink'
import InkBox from 'ink-box'
import Gradient from 'ink-gradient'
import BigText from 'ink-big-text'

class Counter extends React.Component {
	constructor() {
		super();

		this.state = {
			i: 0
		};
	}

	render() {
    const { columns, rows } = process.stdout
		return (
      <Box flexDirection="column" width={columns} height={rows - 1}>
        <Box>
          Label:
        </Box>
        <Box textWrap="truncate">
          <Color green>
            {this.state.i} tests passed
          </Color>
          {'x'.repeat(200)}
        </Box>
        <Box flexGrow={1} textWrap="truncate">
          Test...............................................................
          <BigText text={String(this.state.i)} font="huge" />
        </Box>
      </Box>
		)
	}

	componentDidMount() {
		this.timer = setInterval(() => {
			this.setState({
				i: this.state.i + 1
			});
		}, 500);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}
}

render(<Counter/>);
