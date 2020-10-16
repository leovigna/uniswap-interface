import React from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { TYPE } from '../../theme'
import { RowBetween } from '../../components/Row'

import { CardSection } from '../../components/earn/styled'
///import { useActiveWeb3React } from '../../hooks'

const PageWrapper = styled(AutoColumn)``

const TopSection = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

export default function Blank() {
  //const { account, chainId } = useActiveWeb3React()

  return (
    <PageWrapper gap="lg" justify="center">
      <TopSection gap="md">
        <CardSection>
          <AutoColumn gap="md">
            <RowBetween>
              <TYPE.white fontWeight={600}>Title</TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white fontSize={14}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ipsum optio quasi architecto, quo quisquam nisi vero molestias esse nobis odio ex doloremque, officiis quibusdam aliquid nulla ipsa excepturi hic?
                </TYPE.white>
            </RowBetween>
          </AutoColumn>
        </CardSection>
      </TopSection>
    </PageWrapper>
  )
}
