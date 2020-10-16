import React from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { TYPE } from '../../theme'
import { RowBetween } from '../../components/Row'
///import { useActiveWeb3React } from '../../hooks'
import NetworksList, { Network } from '../../components/NetworkList'
import { ChainId } from '@multiswap/sdk'

const PageWrapper = styled(AutoColumn)``

const TopSection = styled(AutoColumn)`
  max-width: 960px;
  width: 100%;
`

const networks: Network[] = [
  {
    name: 'Ethereum Mainnet',
    symbol: 'ETH',
    chainId: ChainId.MAINNET,
    rpc: '(included)',
    explorer: 'https://etherscan.com'
  },
  {
    name: 'RSK Mainnet',
    symbol: 'RBTC',
    chainId: ChainId.RSK_MAINNET,
    rpc: 'https://public-node.rsk.co',
    explorer: 'https://explorer.rsk.co'
  }
]

export default function Networks() {
  //const { account, chainId } = useActiveWeb3React()

  return (
    <PageWrapper gap="lg" justify="center">
      <TopSection gap="md">
        <AutoColumn gap="md">
          <RowBetween>
            <TYPE.white fontWeight={600}>Networks</TYPE.white>
          </RowBetween>
          <RowBetween>
            <TYPE.white fontSize={14}>
              The networks listed below are supported by the Multiswap UI. Add them to Metamask under the "Custom Networks" tab.
              </TYPE.white>
          </RowBetween><br />
          <NetworksList networks={networks} />
        </AutoColumn>
      </TopSection>
    </PageWrapper>
  )
}
