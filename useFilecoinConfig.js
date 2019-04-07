import React, { useState, useEffect } from 'react'
import Filecoin from 'filecoin-api-client'

const fc = Filecoin()

export default function useFilecoinConfig (key) {
  const [value, setValue] = useState()

  useEffect(() => {
    async function run () {
      const value = await fc.config.get(key)
      setValue(value)
    }
    run()
  }, true)

  return [value]
}
