import React, { useEffect } from 'react'
import { Box, AppContext, StdinContext } from 'ink'

function WatchForExitKey ({ stdin, setRawMode, exit }) {
  useEffect(() => {
    setRawMode(true)
    stdin.on('data', data => {
      if (
        data === 'q' ||
        data === '\x1b' // Escape key
      ) {
        exit()
      }
    })
  }, true)

  return null
}

export default function WatchForExitKeyWithStdin () {
  return (
    <AppContext.Consumer>
      {({ exit }) => (
        <StdinContext.Consumer>
          {({stdin, setRawMode}) => (
            <WatchForExitKey
              stdin={stdin}
              setRawMode={setRawMode}
              exit={exit}/>
          )}
        </StdinContext.Consumer>
      )}
    </AppContext.Consumer>
  )
}
