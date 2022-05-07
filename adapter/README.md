# Chainlink VMT Adapter
This repository contains external adapters that perform computations for Verifiable Merkle Trees.

## Structure
Adapter logic callable by the chainlink node is contained in [endpoints](./src/endpoints/). The `app.js` file imports and exposes adapter logic at an endpoint matching its name using `camelCase` capitalization.

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