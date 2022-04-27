import { useAddress, useMetamask } from '@thirdweb-dev/react'

function App() {
  // Use the hooks thirdweb give us.
  const address = useAddress()
  const connectWithMetamask = useMetamask()
  console.log('👋 Address:', address)

  if (!address) {
    return (
      <div className='landing'>
        <h1>Welcome to DaedalusDAO</h1>
        <button onClick={connectWithMetamask} className='btn-hero'>
          Connect your wallet
        </button>
      </div>
    )
  }

  return (
    <div className='landing'>
      <h1>👀 wallet connected, now what!</h1>
    </div>
  )
}

export default App
