import React, { useState, useEffect } from 'react'
import { render, Box, Color } from 'ink'
import InkBox from 'ink-box'
import BigText from 'ink-big-text'
import Filecoin from 'filecoin-api-client'

const fc = Filecoin()

const color = process.argv[2] || 'cyan'

const Counter = () => {
  const [headBlocks, setHeadBlocks] = useState()
  const [height, setHeight] = useState()
  const [updateTime, setUpdateTime] = useState(0)

  useEffect(() => {
    const state = {
      timeoutId: null,
      height
    }
    async function doWork () {
      const headCids = await fc.chain.head()
      const headBlocks = {}
      let newHeight
      for (const cid of headCids) {
        const block = await fc.show.block(cid)
        headBlocks[cid.toString()] = block
        newHeight = block.height
      }
      setHeadBlocks(headBlocks)
      if (newHeight !== state.height) {
        state.height = newHeight
        setHeight(state.height)
        setUpdateTime(Date.now())
      }
    }
    function schedule () {
      state.timeoutId = setTimeout(async () => {
        await doWork()
        schedule()
      }, 1000)
    }
    schedule()
    return () => clearTimeout(state.timeoutId)
  }, true)

  const { columns, rows } = process.stdout

  /*
    {headBlocks && Object.keys(headBlocks).map(cid => {
      const block = headBlocks[cid]
      return <Box key={cid}>{cid} {block.height}</Box>
    })}
  */

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

render(<Counter/>);
