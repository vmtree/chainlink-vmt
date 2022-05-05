#!/bin/bash

if [ ! -f "./out/mass_update.r1cs" ] \
    || [ ! -f "./out/mass_update.wasm" ] \
    || [ ! -f "./out/mass_update.sym" ]
then
    npx circom ./src/mass_update.circom \
		--r1cs=./out/mass_update.r1cs \
		--sym=./out/mass_update.sym \
		--wasm=./out/mass_update.wasm -v
    echo mass_update circuit compiled!
else
    echo mass_update circuit already compiled!
fi

if [ -f "./ptau/powersOfTau28_hez_final_19.ptau" ]; then
    echo "powersOfTau28_hez_final_19.ptau up to date"
else
    wget https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_19.ptau \
        -O ./ptau/powersOfTau28_hez_final_19.ptau    
fi

if [ ! -f "./out/mass_update_0000.zkey" ]
then
    npx snarkjs g16s \
		./out/mass_update.r1cs \
		./ptau/powersOfTau28_hez_final_19.ptau \
		./out/mass_update_0000.zkey -v
    echo mass_update groth16 setup complete!
else
    echo mass_update groth16 setup already complete!
fi

if [ ! -f "./out/mass_update_final.zkey" ]
then
    npx snarkjs zkc \
		./out/mass_update_0000.zkey ./out/mass_update_final.zkey -v \
		-e='jason parser'
    echo mass_update contribution complete!
else
    echo mass_update contribution already complete!
fi

if [ ! -f "./out/mass_update_verifier.json" ]
then
    npx snarkjs zkev \
		./out/mass_update_final.zkey \
		./out/mass_update_verifier.json
    echo mass_update verifier json exported!
else
    echo mass_update verifier json already exported!
fi


if [ ! -f "./out/mass_update_verifier.sol" ]
then
	npx snarkjs zkesv \
		./out/mass_update_final.zkey \
		./out/mass_update_verifier.sol
    python3 ./scripts/export_mass_update_vkey.py
    echo mass_update verifier contract exported!
else
    echo mass_update verifier contract already exported!
fi