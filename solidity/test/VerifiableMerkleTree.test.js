const { expect } = require('chai');
const { deploy, deployBytes } = require('../scripts/hardhat.utils.js');
const {
    calculateSubtrees,
    calculateUpdateProof,
    calculateMassUpdateProof,
    mimcSponge,
    utils,
    verify
} = require('vmtjs');

const {
    unsafeRandomLeaves,
    toVmtUpdateSolidityInput,
    toVmtMassUpdateSolidityInput,
} = utils;

const MerkleTreeWithHistory = require('../build/MerkleTreeWithHistory.json');
const updateVerifier = require('../circuits/out/update_verifier.json');
const massUpdateVerifier = require('../circuits/out/mass_update_verifier.json');

describe('[START] - VerifiableMerkleTree.test.js', function() {
    before(async () => {
        this.merkleTreeWithHistory = await deployBytes(
            'MerkleTreeWithHistory',
            [],
            MerkleTreeWithHistory.bytecode
        );
        this.incrementalTree = await deploy("MerkleTree", [], {
            MerkleTreeLib: this.merkleTreeWithHistory.address
        });

        this.verifiableTree = await deploy("VerifiableMerkleTree");

        this.getFilledSubtrees = async function(tree) {
            const filledSubtrees=[];
            for (let i = 0; i < 20; i++) {
                filledSubtrees.push(
                    (await tree.filledSubtrees(i)).toString()
                );
            }
            return filledSubtrees;
        };

        this.leaves = unsafeRandomLeaves(11).map(bn => bn.toString());
        this.startSubtrees = calculateSubtrees(mimcSponge, 20, []);
        this.singleEndSubtrees = calculateSubtrees(mimcSponge, 20, [this.leaves[0]]);
        this.endSubtrees = calculateSubtrees(mimcSponge, 20, this.leaves);
    });

    it('should insert 1 leaf to the incremental merkle tree', async () => {
        const incrementalStartSubtrees = await this.getFilledSubtrees(this.incrementalTree);
        incrementalStartSubtrees.forEach((subtree, i) => {
            expect(subtree).to.be.equal(this.startSubtrees[i]);
        })

        await this.incrementalTree.insert(this.leaves[0]);

        incrementalEndSubtrees = await this.getFilledSubtrees(this.incrementalTree);
        incrementalEndSubtrees.forEach((subtree, i) => {
            expect(subtree).to.be.equal(this.singleEndSubtrees[i]);
        });
    });

    it('should generate a zero knowledge proof for a single deposit', async () => {
        console.time('update proof');
        this.updateProof = await calculateUpdateProof(
            "./circuits/out/update.wasm",
            "./circuits/out/update_final.zkey",
            0,
            this.leaves[0],
            this.startSubtrees,
            this.singleEndSubtrees
        );
        console.timeEnd('update proof');
        const result = await verify(
            updateVerifier,
            this.updateProof.publicSignals,
            this.updateProof.proof
        );
        expect(result).to.be.true;
    });

    it('should update the VerifiableMerkleTree for a single deposit', async () => {
        const { proof, publicSignals } = this.updateProof;
        const { p, newSubtrees } = toVmtUpdateSolidityInput(proof, publicSignals);

        const verifiableStartSubtrees = await this.getFilledSubtrees(this.verifiableTree);
        verifiableStartSubtrees.forEach((subtree, i) => {
            expect(subtree).to.be.equal(this.startSubtrees[i]);
        });
        await this.verifiableTree.update(p, this.singleEndSubtrees);

        verifiableSingleEndSubtrees = await this.getFilledSubtrees(this.verifiableTree);
        verifiableSingleEndSubtrees.forEach((subtree, i) => {
            expect(subtree).to.be.equal(this.singleEndSubtrees[i]);
        });
    });

    it('should insert 10 leaves to the incremental merkle tree', async () => {
        const incrementalStartSubtrees = await this.getFilledSubtrees(this.incrementalTree);
        incrementalStartSubtrees.forEach((subtree, i) => {
            expect(subtree).to.be.equal(this.startSubtrees[i]);
        })

        this.leaves.slice(1).forEach(async leaf => {
            await this.incrementalTree.insert(leaf);
        });

        incrementalEndSubtrees = await this.getFilledSubtrees(this.incrementalTree);
        incrementalEndSubtrees.forEach((subtree, i) => {
            expect(subtree).to.be.equal(this.endSubtrees[i]);
        });
    });

    it('should generate a zero knowledge proof for 10 leaves', async() => {
        console.time('mass update proof');
        this.massUpdateProof = await calculateMassUpdateProof(
            "./circuits/out/mass_update.wasm",
            "./circuits/out/mass_update_final.zkey",
            0,
            this.leaves,
            this.startSubtrees,
            this.endSubtrees
        );
        console.timeEnd('mass update proof');
        const result = await verify(
            massUpdateVerifier,
            this.massUpdateProof.publicSignals,
            this.massUpdateProof.proof
        );
        expect(result).to.be.true;
    });

    it('should update the VerifiableMerkleTree for 10 deposits', async () => {
        const { proof, publicSignals } = this.massUpdateProof;
        const { p } = toVmtMassUpdateSolidityInput(proof, publicSignals)

        const verifiableStartSubtrees = await this.getFilledSubtrees(this.verifiableTree);
        verifiableStartSubtrees.forEach((subtree, i) => {
            expect(subtree).to.be.equal(this.startSubtrees[i]);
        })

        await this.verifiableTree.massUpdate(
            p,
            this.leaves,
            this.endSubtrees
        );

        verifiableEndSubtrees = await this.getFilledSubtrees(this.verifiableTree);
        verifiableEndSubtrees.forEach((subtree, i) => {
            expect(subtree).to.be.equal(this.endSubtrees[i]);
        })

    });
});