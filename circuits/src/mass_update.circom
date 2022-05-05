include "./merkle_tree_updater.circom";

template TreeUpdater(levels) {
    signal input newIndex;
    signal input newLeaf;
    signal input filledSubtrees[levels];
    signal output newSubtrees[levels];

    component tree = MerkleTreeUpdater(levels);
    tree.index <== newIndex;
    tree.leaf <== newLeaf;

    for (var j = 0; j < levels; j++) {
        tree.filledSubtrees[j] <== filledSubtrees[j];
    }

    for (var i = 0; i < levels; i++) {
        newSubtrees[i] <== tree.newSubtrees[i];
    }
}

template MassUpdate(levels, numUpdates) {
    signal input startIndex;
    signal input leaves[numUpdates];
    signal input startSubtrees[levels];
    signal input endSubtrees[levels];

    component trees[numUpdates];

    for (var i = 0; i < numUpdates; i++) {
        trees[i] = TreeUpdater(levels);
        trees[i].newIndex <== startIndex + i;
        trees[i].newLeaf <== leaves[i];

        for (var j = 0; j < levels; j++) {
            trees[i].filledSubtrees[j] <== i == 0 ? startSubtrees[j] : trees[i - 1].newSubtrees[j];
        }
    }

    for (var k = 0; k < levels; k++) {
        endSubtrees[k] === trees[numUpdates - 1].newSubtrees[k];
    }
}

component main = MassUpdate(20, 10);