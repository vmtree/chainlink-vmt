# Chainlink VMT
This repository contains external adapters that perform computations for Verifiable Merkle Trees.

## Structure
Adapter logic callable by the chainlink node is contained in [endpoints](./src/endpoints/). The `app.js` file imports and exposes adapter logic at an endpoint matching its name using `camelCase` capitalization.

We need to look at [each of the functions defined in vmt-js](https://github.com/Nobody-Labs/vmt-js/tree/main/src) to understand how to apply the vmt code. We need to [update the contracts](https://github.com/Nobody-Labs/twister-vmt) to have a chainlink interface and to collect commitments.

## Install
```sh
$ git clone https://github.com/Nobody-Labs/chainlink-vmt
$ cd chainlink-vmt
$ yarn
```

## Run
```sh
$ yarn start
Now listening on http://localhost:8080
```

## Send a request
Need to add a js script