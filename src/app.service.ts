import { config } from 'src/app.config'
import { providers, Contract, BigNumber } from 'ethers'
import { Injectable, OnApplicationBootstrap } from '@nestjs/common'

@Injectable()
export class AppService implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    const provider = new providers.InfuraProvider(undefined, process.env.INFURA_PROJECT_ID)
    const contract = new Contract(config.contractAddress, config.abi, provider)
    const tokenSupply: BigNumber = await contract.totalSupply()
    const tokenIdsRequests = []
    for (let i = 0; i < tokenSupply.toNumber(); i++) tokenIdsRequests.push(contract.tokenByIndex(i))
    const tokenIdsAsBigNumbers: BigNumber[] = await Promise.all(tokenIdsRequests)
    const tokenIds = tokenIdsAsBigNumbers.map((item) => item.toNumber())
    console.log(JSON.stringify(tokenIds))
    console.log(`✅ Done`)
  }
}
