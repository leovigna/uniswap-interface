import { ChainId } from '@multiswap/sdk'
import MULTICALL_ABI from './abi.json'

import constants from '../index';

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: constants[ChainId.MAINNET].MULTICALL_ADDRESS,
  [ChainId.ROPSTEN]: constants[ChainId.ROPSTEN].MULTICALL_ADDRESS,
  [ChainId.RINKEBY]: constants[ChainId.RINKEBY].MULTICALL_ADDRESS,
  [ChainId.GÖRLI]: constants[ChainId.GÖRLI].MULTICALL_ADDRESS,
  [ChainId.KOVAN]: constants[ChainId.KOVAN].MULTICALL_ADDRESS,
  [ChainId.RSK_MAINNET]: constants[ChainId.RSK_MAINNET].MULTICALL_ADDRESS,
  [ChainId.RSK_TESTNET]: constants[ChainId.RSK_TESTNET].MULTICALL_ADDRESS,
  [ChainId.LOCAL]: constants[ChainId.LOCAL].MULTICALL_ADDRESS
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
