#!/usr/bin/env node

import meow from 'meow'
import React, { useState, useEffect } from 'react'
import { render, Box } from 'ink'
import BigText from 'ink-big-text'
import useFilecoinConfig from './useFilecoinConfig'
import useFilecoinHead from './useFilecoinHead'
import InkWatchForExitKey from './inkWatchForExitKey'

const cli = meow(
  `
    Usage
      $ filecoin-big-head [options]

    Options
      -color <color1,...>
      -c <color1,...>

        Colors:
          cyan cyanBright black red redBright green greeBright
          yellow yellowBright blue blueBright magenta magentaBright
          white whiteBright gray
          #ff8800 (any valid hex color)
          #f80 (short form is supported as well)
          candy

      -font <name>
      -f <name>

        Fonts: (from dominikwilkowski/cfonts)
          huge block simple simpleBlock 3d simple3d chrome

      -flash-duration <seconds>
      -flash-color <color1,color2>

      --no-nickname
      --no-seconds
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
      nickname: {
        type: 'boolean',
        default: true
      },
      seconds: {
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

const Main = () => {
  const [nickname] = useFilecoinConfig('heartbeat.nickname')
  const [_, height, updateTime] = useFilecoinHead({
    interval: 5000,
    flashDuration
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
      {seconds}
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
