// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./ProofLib.sol";

contract UpdateVerifier {
    using ProofLib for ProofLib.G1Point;
    using ProofLib for ProofLib.G2Point;

    function updateVerifyingKey() internal pure returns (ProofLib.VerifyingKey memory vk) {
// VERIFYING_KEY
    }

    function _verifyUpdateProof(
        uint[8] calldata p,
        uint[42] memory input
    ) internal view returns (bool r) {
        ProofLib.Proof memory proof;
        proof.A = ProofLib.G1Point(p[0], p[1]);
        proof.B = ProofLib.G2Point([p[2], p[3]], [p[4], p[5]]);
        proof.C = ProofLib.G1Point(p[6], p[7]);
        ProofLib.VerifyingKey memory vk = updateVerifyingKey();
        ProofLib.G1Point memory vk_x = ProofLib.G1Point(0, 0);
        for (uint i = 0; i < 42;) {
            if (input[i] >= ProofLib.snark_scalar_field)
                revert ProofLib.GteSnarkScalarField();
            vk_x = vk.IC[i+1].scalar_mul(input[i]).addition(vk_x);
            unchecked { i += 1; }
        }
        vk_x = vk.IC[0].addition(vk_x);
        return proof.A.negate().pairingProd4(
            proof.B,
            vk.alfa1,
            vk.beta2,
            vk_x,
            vk.gamma2,
            proof.C,
            vk.delta2
        );
    }

}