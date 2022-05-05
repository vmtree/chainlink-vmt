include "./merkle_tree_updater.circom";

template Update(levels) {
    signal input index;
    signal input leaf;
    signal input filledSubtrees[levels];
    signal input newSubtrees[levels];

    component tree = MerkleTreeUpdater(levels);
    tree.index <== index;
    tree.leaf <== leaf;

    for (var j = 0; j < levels; j++) {
        tree.filledSubtrees[j] <== filledSubtrees[j];
    }

    for (var i = 0; i < levels; i++) {
        tree.newSubtrees[i] === newSubtrees[i];
    }
}

component main = Update(20);