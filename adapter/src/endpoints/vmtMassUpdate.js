const path = require('path');
const {
    calculateSubtrees,
    calculateMassUpdateProof,
    mimcSponge,
    utils,
} = require('vmtjs');

const { toVmtMassUpdateSolidityInput: toSolInput } = utils;
const wasmPath = path.resolve(`${__dirname}/../zk-stuff/massUpdate.wasm`);
const zkeyPath = path.resolve(`${__dirname}/../zk-stuff/massUpdate.zkey`);

module.exports = async function vmtMassUpdate(req, res, next) {
    if (!req.body.data) {
        return res.status(400).json({
            error: 'expected `data` in body of request'
        });
    }

    const { startIndex, leaves, filledSubtrees } = req.body.data;

    if (
        (typeof startIndex !== 'number')
        || (!Array.isArray(leaves) || leaves.length !== 10)
        || (!Array.isArray(filledSubtrees) || filledSubtrees.length !== 20)
    ) {
        return res.status(400).json({
            error: 'malformed request'
        });
    }

    try {
        const endSubtrees = calculateSubtrees(
            mimcSponge,
            20,
            leaves,
            filledSubtrees
        );

        const { proof, publicSignals } = await calculateMassUpdateProof(
            wasmPath,
            zkeyPath,
            startIndex,
            leaves,
            filledSubtrees,
            endSubtrees
        );

        const { p, newSubtrees } = toSolInput(proof, publicSignals);
        return res.status(200).json({
            data: {
                proof: p,
                newFilledSubtrees: newSubtrees
            }
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            error: 'something went wrong'
        })
    }
}