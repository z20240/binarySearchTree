import {BST, Node} from './binary_sorting_tree'

let bst = new BST();

bst.insert(10, 10);
bst.insert(1, 1);
bst.insert(7, 7);
bst.insert(5, 5);
bst.insert(3, 3);
bst.insert(4, 4);
bst.insert(8, 8);
bst.insert(9, 9);
bst.insert(6, 6);
bst.insert(2, 2);

bst.traceTree();

console.log(require('util').inspect(bst.bst, true, null));

console.log("===size:", bst.size())

// console.log(bst.findById(20))

console.log(bst.deleteByVal(8));

bst.traceTree();

console.log(require('util').inspect(bst.bst, true, null));


console.log("rank", bst.getRankById(7));