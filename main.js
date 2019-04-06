import React, { useState, useEffect } from 'react'
import { render, Box, Color } from 'ink'
import InkBox from 'ink-box'
import BigText from 'ink-big-text'
import useFilecoinHead from './useFilecoinHead'

const color = process.argv[2] || 'cyan'

const Main = () => {
  const [_, height, updateTime] = useFilecoinHead()

  const { columns, rows } = process.stdout

  if (!updateTime) {
    return <Box>Loading...</Box>
  }
  return (
    <Box flexDirection="column" width={columns} height={rows - 1}>
      <Box>
        <Color keyword={color}>
          <BigText text={`${height}`} font="huge" />
        </Color>
      </Box>
      <Box>
        {Math.floor((Date.now() - updateTime) / 1000)}s ago
      </Box>
    </Box>
  )
}

render(<Main/>)
