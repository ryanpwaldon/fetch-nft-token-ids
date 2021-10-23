import { providers } from 'ethers'
import { Injectable, OnApplicationBootstrap } from '@nestjs/common'

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor() {}

  onApplicationBootstrap() {
    const provider = new providers.WebSocketProvider(`https://mainnet.infura.io/${process.env.INFURA_PROJECT_ID}`)
  }
}
