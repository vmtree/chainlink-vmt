#!/bin/bash

if [ ! -f "./circuits/out/update.r1cs" ] \
    || [ ! -f "./circuits/out/update.wasm" ] \
    || [ ! -f "./circuits/out/update.sym" ]
then
    npx circom ./circuits/update.circom \
		--r1cs=./circuits/out/update.r1cs \
		--sym=./circuits/out/update.sym \
		--wasm=./circuits/out/update.wasm -v
    echo update circuit compiled!
else
    echo update circuit already compiled!
fi

if [ ! -f "./circuits/out/update_0000.zkey" ]
then
    npx snarkjs g16s \
		./circuits/out/update.r1cs \
		./circuits/ptau/powersOfTau28_hez_final_15.ptau \
		./circuits/out/update_0000.zkey -v
    echo update groth16 setup complete!
else
    echo update groth16 setup already complete!
fi

if [ ! -f "./circuits/out/update_final.zkey" ]
then
    npx snarkjs zkc \
		./circuits/out/update_0000.zkey ./circuits/out/update_final.zkey -v \
		-e='jason parser'
    echo update contribution complete!
else
    echo update contribution already complete!
fi

if [ ! -f "./circuits/out/update_verifier.json" ]
then
    npx snarkjs zkev \
		./circuits/out/update_final.zkey \
		./circuits/out/update_verifier.json
    echo update verifier json exported!
else
    echo update verifier json already exported!
fi


if [ ! -f "./circuits/out/update_verifier.sol" ]
then
	npx snarkjs zkesv \
		./circuits/out/update_final.zkey \
		./circuits/out/update_verifier.sol
    python3 ./scripts/export_update_vkey.py
    echo update verifier contract exported!
else
    echo update verifier contract already exported!
fi