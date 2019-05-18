#!/usr/bin/env node

import meow from 'meow'
import React, { useState, useEffect } from 'react'
import { render, Box } from 'ink'
import BigText from 'ink-big-text'
import useFilecoinConfig from '@jimpick/use-filecoin-config'
import useFilecoinHead from '@jimpick/use-filecoin-head'
import useFilecoinNetworkInfo from './useFilecoinNetworkInfo'
import InkWatchForExitKey from '@jimpick/ink-watch-for-exit-key'

const cli = meow(
  `
    Usage
      $ filecoin-big-head [options]

    Options
      -color <color1,...>
      -c <color1,...>

        Colors:
          cyan cyanBright black red redBright green greenBright
          yellow yellowBright blue blueBright magenta magentaBright
          white whiteBright gray
          #ff8800 (any valid hex color)
          #f80 (short form is supported as well)
          candy

      -font <name>
      -f <name>

        Fonts: (from dominikwilkowski/cfonts)
          huge block simple simpleBlock 3d simple3d chrome

      -flash-duration <seconds>     (default: 2.5)
      -flash-color <color1,color2>

      -interval <seconds>           (default: 5)
      -i <seconds>

        Interval to poll local filecoin node

      -net-interval <seconds>       (default: 30)

        Interval to poll devnet block explorer API

      --no-nickname
      --no-seconds
      --no-net-info
  `,
  {
    flags: {
      color: {
        type: 'string',
        alias: 'c',
        default: 'cyan'
      },
      font: {
        type: 'string',
        alias: 'f',
        default: 'huge'
      },
      flashDuration: {
        type: 'string',
        alias: 'fd',
        default: '2.5'
      },
      flashColor: {
        type: 'string',
        alias: 'fc',
        default: 'yellow'
      },
      interval: {
        type: 'string',
        alias: 'i',
        default: '5'
      },
      netInterval: {
        type: 'string',
        alias: 'i',
        default: '30'
      },
      nickname: {
        type: 'boolean',
        default: true
      },
      seconds: {
        type: 'boolean',
        default: true
      },
      netInfo: {
        type: 'boolean',
        default: true
      }
    }
  }
)

const args = cli.flags
const colors = args.color.split(',')
if (!colors[1]) colors[1] = colors[0]
const flashColors = args.flashColor.split(',')
if (!flashColors[1]) flashColors[1] = colors[1]
const flashDuration = Number(args.flashDuration) * 1000 
const interval = Number(args.interval) * 1000 
const netInterval = Number(args.netInterval) * 1000 

const Main = () => {
  const [nickname] = useFilecoinConfig('heartbeat.nickname')
  const [, height, updateTime] = useFilecoinHead({
    interval,
    flashDuration
  })
  const [netName, , netHeight] = useFilecoinNetworkInfo({
    interval: netInterval
  })

  const { columns, rows } = process.stdout

  if (!updateTime) {
    return <Box>Loading...</Box>
  }

  const displayColors = (Date.now() < updateTime + flashDuration) ?
    flashColors : colors

  const seconds = args.seconds ?
    <Box>
      {Math.floor((Date.now() - updateTime) / 1000)}s ago
    </Box>
    : null

  const netInfo = args.netInfo ?
    <Box>
      {netName}: {netHeight >= 0 ? netHeight : 'Loading...'}
    </Box>
    : null

  return (
    <Box flexDirection="column" width={columns} height={rows - 1}>
      <Box>
        {args.nickname && nickname && nickname}
      </Box>
      <Box>
        <BigText
          text={`${height}`}
          font={args.font}
          colors={displayColors} />
      </Box>
      <Box>
        <Box flexGrow={1}>{seconds}</Box>
        <Box>{netInfo}</Box>
      </Box>
      <InkWatchForExitKey />
    </Box>
  )
}

async function run () {
  const { rerender, waitUntilExit } = render(<Main/>)

  process.on('SIGWINCH', () => rerender(<Main/>))

  try {
    await waitUntilExit()
    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

run()
