import React from 'react'
import { render, Box, Color } from 'ink'
import InkBox from 'ink-box'

class Counter extends React.Component {
	constructor() {
		super();

		this.state = {
			i: 0
		};
	}

	render() {
    /*
        <InkBox borderStyle="round" borderColor="cyan" float="center" padding={1}>
          <Color green>
            {this.state.i} tests passed
          </Color>
        </InkBox>
        */
    const { columns, rows } = process.stdout
		return (
      <Box flexDirection="column" width={columns} height={rows - 1}>
        <Box>
          Label:
        </Box>
        <Box flexGrow={1} textWrap="truncate">
          <Color green>
            {this.state.i} tests passed
          </Color>
          {'x'.repeat(200)}
        </Box>
      </Box>
		)
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
