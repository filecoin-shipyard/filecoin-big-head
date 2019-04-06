import React, { useState, useEffect } from 'react'
import { render, Box, Color } from 'ink'
import InkBox from 'ink-box'
import BigText from 'ink-big-text'

const Counter = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let effectCount = count
    const intervalId = setInterval(() => { setCount(effectCount++) }, 1000)
    return () => clearInterval(intervalId)
  }, true)

  const { columns, rows } = process.stdout

  return (
    <Box flexDirection="column" width={columns} height={rows - 1}>
      <Box>
        Label:
      </Box>
      <Box textWrap="truncate">
        <Color green>
          {count} tests passed
        </Color>
        {'x'.repeat(200)}
      </Box>
      <Box flexGrow={1} textWrap="truncate">
        Test...............................................................
        <BigText text={String(count)} font="huge" />
      </Box>
    </Box>
  )
}

render(<Counter/>);
