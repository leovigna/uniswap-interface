//@ts-nocheck
import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { Box, Flex, Text } from 'rebass'
import { useMedia } from 'react-use'
import { ChainId } from '@multiswap/sdk'

const Divider = styled(Box)`
  height: 1px;
  background-color: ${({ theme }) => theme.divider};
`

const TextWrapper = styled(Text)`
  color: ${({ color, theme }) => theme[color]};
`

const PageButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2em;
  margin-bottom: 2em;
`

const Arrow = styled.div`
  color: ${({ theme }) => theme.primary1};
  opacity: ${(props) => (props.faded ? 0.3 : 1)};
  padding: 0 20px;
  user-select: none;
  :hover {
    cursor: pointer;
  }
`

const List = styled(Box)`
  -webkit-overflow-scrolling: touch;
`

const DashGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 1fr 1fr 0.5fr 0.5fr 1fr;
  grid-template-areas: 'name rpc chainId symbol explorer';
  padding: 0 1.125rem;

  > * {
    justify-content: flex-end;

    &:first-child {
      justify-content: flex-start;
      text-align: left;
      width: 100px;
    }
  }

  @media screen and (min-width: 680px) {
    display: grid;
    grid-gap: 1em;
    grid-template-columns: 1fr 1fr 0.5fr 0.5fr 1fr;
    grid-template-areas: 'name symbol chainId symbol explorer';

    > * {
      justify-content: flex-end;
      width: 100%;

      &:first-child {
        justify-content: flex-start;
      }
    }
  }

  @media screen and (min-width: 1080px) {
    display: grid;
    grid-gap: 0.5em;
    grid-template-columns: 1fr 1fr 0.5fr 0.5fr 1fr;
    grid-template-areas: 'name rpc chainId symbol explorer';
  }
`

const ListWrapper = styled.div``

const ClickableText = styled(Text)`
  text-align: end;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
  user-select: none;
  color: ${({ theme }) => theme.text1};

  @media screen and (max-width: 640px) {
    font-size: 0.85rem;
  }
`

const DataText = styled(Flex)`
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.text1};

  & > * {
    font-size: 14px;
  }

  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`

enum SORT_FIELD {
  NAME = "name",
  SYMBOL = "symbol",
  CHAINID = "chainId"
}

export interface Network {
  name: string,
  rpc: string,
  chainId: ChainId,
  symbol: string,
  explorer: string
}

// @TODO rework into virtualized list
function TopTokenList({ networks, itemMax = 10 }: { networks: Network[], itemMax?: number }) {
  // page state
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  // sorting
  const [sortDirection, setSortDirection] = useState(false)
  const [sortedColumn, setSortedColumn] = useState(SORT_FIELD.CHAINID)

  const below1080 = useMedia('(max-width: 1080px)')
  const below680 = useMedia('(max-width: 680px)')
  const below600 = useMedia('(max-width: 600px)')

  useEffect(() => {
    setMaxPage(1) // edit this to do modular
    setPage(1)
  }, [networks])

  useEffect(() => {
    if (networks) {
      let extraPages = 1
      if (networks.length % itemMax === 0) {
        extraPages = 0
      }
      setMaxPage(Math.floor(networks.length / itemMax) + extraPages)
    }
  }, [networks, itemMax])

  const filteredList = useMemo(() => {
    return (
      networks
        .sort((a, b) => {
          if (sortedColumn === SORT_FIELD.SYMBOL || sortedColumn === SORT_FIELD.NAME || sortedColumn === SORT_FIELD.CHAINID) {
            return a[sortedColumn] > b[sortedColumn] ? (sortDirection ? -1 : 1) * 1 : (sortDirection ? -1 : 1) * -1
          }
          return parseFloat(a[sortedColumn]) > parseFloat(b[sortedColumn])
            ? (sortDirection ? -1 : 1) * 1
            : (sortDirection ? -1 : 1) * -1
        })
        .slice(itemMax * (page - 1), page * itemMax)
    )
  }, [itemMax, page, sortDirection, sortedColumn])

  const ListItem = ({ item, index }: { item: Network, index: number }) => {
    return (
      <DashGrid style={{ height: '48px' }} focus={true}>
        <DataText area="name" fontWeight="500">{item.name}</DataText>
        <DataText area="rpc">{item.rpc}</DataText>
        <DataText area="chainId">{item.chainId}</DataText>
        <DataText area="symbol">{item.symbol}</DataText>
        <DataText area="explorer">{item.explorer}</DataText>
      </DashGrid>
    )
  }

  return (
    <ListWrapper>
      <DashGrid center={true} style={{ height: 'fit-content', padding: '0 1.125rem 1rem 1.125rem' }}>
        <Flex alignItems="center" justifyContent="flexStart">
          <ClickableText
            color="text"
            area="name"
            fontWeight="500"
            onClick={(e) => {
              setSortedColumn(SORT_FIELD.NAME)
              setSortDirection(sortedColumn !== SORT_FIELD.NAME ? true : !sortDirection)
            }}
          >
            {below680 ? 'Symbol' : 'Name'} {sortedColumn === SORT_FIELD.NAME ? (!sortDirection ? '↑' : '↓') : ''}
          </ClickableText>
        </Flex>
        <Flex alignItems="center" justifyContent="flexStart" area="rpc">RPC</Flex>
        <Flex alignItems="center" justifyContent="flexStart">
          <ClickableText
            area="chainId"
            onClick={(e) => {
              setSortedColumn(SORT_FIELD.CHAINID)
              setSortDirection(sortedColumn !== SORT_FIELD.CHAINID ? true : !sortDirection)
            }}
          >
            Chain Id {sortedColumn === SORT_FIELD.CHAINID ? (!sortDirection ? '↑' : '↓') : ''}
          </ClickableText>
        </Flex>
        <Flex alignItems="center" justifyContent="flexStart">
          <ClickableText
            area="symbol"
            onClick={(e) => {
              setSortedColumn(SORT_FIELD.SYMBOL)
              setSortDirection(sortedColumn !== SORT_FIELD.SYMBOL ? true : !sortDirection)
            }}
          >
            Symbol {sortedColumn === SORT_FIELD.SYMBOL ? (!sortDirection ? '↑' : '↓') : ''}
          </ClickableText>
        </Flex>
        <Flex alignItems="center" justifyContent="flexStart" area="explorer">Explorer</Flex>
      </DashGrid>
      <Divider />
      <List p={0}>
        {filteredList &&
          filteredList.map((item, index) => {
            return (
              <div key={index}>
                <ListItem key={index} index={(page - 1) * itemMax + index + 1} item={item} />
                <Divider />
              </div>
            )
          })}
      </List>
      <PageButtons>
        <div onClick={() => setPage(page === 1 ? page : page - 1)}>
          <Arrow faded={page === 1 ? true : false}>←</Arrow>
        </div>
        <TextWrapper fontWeight={400} fontSize={14} color={'text1'}>{'Page ' + page + ' of ' + maxPage}</TextWrapper>
        <div onClick={() => setPage(page === maxPage ? page : page + 1)}>
          <Arrow faded={page === maxPage ? true : false}>→</Arrow>
        </div>
      </PageButtons>
    </ListWrapper>
  )
}

export default TopTokenList
