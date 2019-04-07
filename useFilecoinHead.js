import React, { useState, useEffect } from 'react'
import Filecoin from 'filecoin-api-client'

const fc = Filecoin()

export default function useFilecoinHead ({
  interval = 1000,
  flashDuration
}) {
  const [headBlocks, setHeadBlocks] = useState()
  const [height, setHeight] = useState()
  const [updateTime, setUpdateTime] = useState()
  const [lastFlashTime, setLastFlashTime] = useState()

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
        if (flashDuration > 0) {
          setTimeout(() => {
            setLastFlashTime(Date.now())
          }, flashDuration + 100)
        }
      }
    }
    function schedule () {
      state.timeoutId = setTimeout(async () => {
        await doWork()
        schedule()
      }, interval)
    }
    doWork().then(schedule)
    return () => clearTimeout(state.timeoutId)
  }, true)

  return [headBlocks, height, updateTime, lastFlashTime]
}
