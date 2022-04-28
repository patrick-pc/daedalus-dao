import { useAddress, useMetamask, useEditionDrop } from '@thirdweb-dev/react'
import { useState, useEffect } from 'react'

function App() {
  // Use the hooks thirdweb give us.
  const address = useAddress()
  const connectWithMetamask = useMetamask()
  console.log('👋 Address:', address)

  // Initialize our editionDrop contract
  const editionDrop = useEditionDrop(
    '0x41DFb5F8F3545628b41695d526aAe22D1347ff81'
  )
  // State variable for us to know if user has our NFT.
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false)
  // isClaiming lets us easily keep a loading state while the NFT is minting.
  const [isClaiming, setIsClaiming] = useState(false)

  useEffect(() => {
    // If they don't have a connected wallet, exit!
    if (!address) {
      return
    }

    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 0)
        if (balance.gt(0)) {
          setHasClaimedNFT(true)
          console.log('🌟 this user has a membership NFT!')
        } else {
          setHasClaimedNFT(false)
          console.log("😭 this user doesn't have a membership NFT.")
        }
      } catch (error) {
        setHasClaimedNFT(false)
        console.error('Failed to get balance', error)
      }
    }
    checkBalance()
  }, [address, editionDrop])

  const mintNft = async () => {
    try {
      setIsClaiming(true)
      await editionDrop.claim('0', 1)
      console.log(
        `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`
      )
      setHasClaimedNFT(true)
    } catch (error) {
      setHasClaimedNFT(false)
      console.error('Failed to mint NFT', error)
    } finally {
      setIsClaiming(false)
    }
  }

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

  // Render mint nft screen.
  return (
    <div className='mint-nft'>
      <h1>Mint your free DaedalusDAO Membership NFT</h1>
      <button disabled={isClaiming} onClick={mintNft}>
        {isClaiming ? 'Minting...' : 'Mint your nft (FREE)'}
      </button>
    </div>
  )
}

export default App
