#!/usr/bin/env node

import buildOptions from 'minimist-options'
import minimist from 'minimist'
import React, { useState, useEffect } from 'react'
import { render, Box } from 'ink'
import InkBox from 'ink-box'
import BigText from 'ink-big-text'
import useFilecoinHead from './useFilecoinHead'
import InkWatchForExitKey from './inkWatchForExitKey'

const options = buildOptions({
	color: {
		type: 'string',
		alias: 'c',
		default: 'cyan'
	},
	font: {
		type: 'string',
		alias: 'f',
		default: 'huge'
	}
})

const args = minimist(process.argv.slice(2), options)

const colors = args.color.split(',')
if (!colors[1]) colors[1] = colors[0]

const Main = () => {
  const [_, height, updateTime] = useFilecoinHead({ interval: 5000 })

  const { columns, rows } = process.stdout

  if (!updateTime) {
    return <Box>Loading...</Box>
  }

  return (
    <Box flexDirection="column" width={columns} height={rows - 1}>
      <Box>
        <BigText
          text={`${height}`}
          font={args.font}
          colors={colors} />
      </Box>
      <Box>
        {Math.floor((Date.now() - updateTime) / 1000)}s ago
      </Box>
      <InkWatchForExitKey />
    </Box>
  )
}

async function run () {
  const { waitUntilExit } = render(<Main/>)

  try {
    await waitUntilExit()
    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

run()
