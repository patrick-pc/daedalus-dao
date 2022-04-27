import sdk from './1-initialize-sdk.js'
import { readFileSync } from 'fs'

const editionDrop = sdk.getEditionDrop('0x41DFb5F8F3545628b41695d526aAe22D1347ff81')

;(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: 'Daedalus Hammer',
        description: 'This NFT will give you access to DaedalusDAO!',
        image: readFileSync('scripts/assets/hammer.png'),
      },
    ])
    console.log('✅ Successfully created a new NFT in the drop!')
  } catch (error) {
    console.error('failed to create the new NFT', error)
  }
})()
