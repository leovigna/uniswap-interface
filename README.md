# Uniswap Interface

[![Lint](https://github.com/Uniswap/uniswap-interface/workflows/Lint/badge.svg)](https://github.com/Uniswap/uniswap-interface/actions?query=workflow%3ALint)
[![Tests](https://github.com/Uniswap/uniswap-interface/workflows/Tests/badge.svg)](https://github.com/Uniswap/uniswap-interface/actions?query=workflow%3ATests)
[![Styled With Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

An open source interface for Uniswap -- a protocol for decentralized exchange of Ethereum tokens.

- Website: [uniswap.org](https://uniswap.org/)
- Interface: [app.uniswap.org](https://app.uniswap.org)
- Docs: [uniswap.org/docs/](https://uniswap.org/docs/)
- Twitter: [@UniswapProtocol](https://twitter.com/UniswapProtocol)
- Reddit: [/r/Uniswap](https://www.reddit.com/r/Uniswap/)
- Email: [contact@uniswap.org](mailto:contact@uniswap.org)
- Discord: [Uniswap](https://discord.gg/Y7TF6QA)
- Whitepaper: [Link](https://hackmd.io/C-DvwDSfSxuh-Gd4WKE_ig)

## Accessing the Uniswap Interface

To access the Uniswap Interface, use an IPFS gateway link from the
[latest release](https://github.com/Uniswap/uniswap-interface/releases/latest), 
or visit [app.uniswap.org](https://app.uniswap.org).

## Listing a token

Please see the
[@uniswap/default-token-list](https://github.com/uniswap/default-token-list) 
repository.

## Development

### Install Dependencies

```bash
yarn
```

### Run

```bash
yarn start
```

### Configuring the environment (optional)

To have the interface default to a different network when a wallet is not connected:

1. Make a copy of `.env` named `.env.local`
2. Change `REACT_APP_NETWORK_ID` to `"{YOUR_NETWORK_ID}"` **[DEPRECATED]**
3. Change `REACT_APP_NETWORK_URL` to e.g. `"https://{YOUR_NETWORK_ID}.infura.io/v3/{YOUR_INFURA_KEY}"` **[DEPRECATED]**
4. Change `REACT_APP_INFURA_ID` to your Infura ID (for Ethereum Mainnet & Testnets)
5. Customize [constants/index.ts](./src/constants/index.ts)

Note that the interface only works on testnets where both 
[Uniswap V2](https://uniswap.org/docs/v2/smart-contracts/factory/) and 
[multicall](https://github.com/makerdao/multicall) are deployed.
The interface will not work on other networks.

#### Custom Contracts
To add your own custom tokens, staking, and governance contracts. See the [constants/index.ts](./src/constants/index.ts) file.

#### Custom Networks (multi-network setup)
This repo was original forked from [Uniswap/uniswap-interface](https://github.com/Uniswap/uniswap-interface). This fork presents an example integration with a local Ganache Test Ethereum blockchain (ChainId.LOCAL = 5777). Use this as an example to easily launch Uniswap on your own EVM blockchain.

All required contracts must already be deployed on your network. See [Uniswap/uniswap-v2-core](https://github.com/Uniswap/uniswap-v2-core) for the original V2 contracts, and [leovigna/uniswap-v2-core/tree/truffle-typechain-migrate](https://github.com/leovigna/uniswap-v2-core/tree/truffle-typechain-migrate) for an easy to deploy forked version integrated with Truffle and Typechain. Note this does not deploy the Uniswap Governance and Staking contracts. You will also need a deployed Multicall contract. Find a Truffle and Typechain compatible forked version at [leovigna/multicall/tree/truffle-typechain-migrate](https://github.com/leovigna/multicall/tree/truffle-typechain-migrate).

To add your custom network (eg. local blockchain or L2 chain), you will have to edit [constants/index.ts](./src/constants/index.ts) to update the `ChainId` enum. Once you've added the new ChainId value, make sure to update all required parameters (eg. tokens, ROUTER_ADDRESS, NETWORK_URL etc...).

You will also have to patch the `@multiswap/sdk` module by editing [types/@multiswap/sdk.d.ts](./src/types/@multiswap/sdk.d.ts).

## Contributions

**Please open all pull requests against the `master` branch.** 
CI checks will run against all PRs.

## Accessing Uniswap Interface V1

The Uniswap Interface supports swapping against, and migrating or removing liquidity from Uniswap V1. However,
if you would like to use Uniswap V1, the Uniswap V1 interface for mainnet and testnets is accessible via IPFS gateways 
linked from the [v1.0.0 release](https://github.com/Uniswap/uniswap-interface/releases/tag/v1.0.0).
