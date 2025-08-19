class Node {

    constructor (value, left, right) {
        this.value = value;
        this.left = left;
        this.right = right;
    }

    show() {
        if(this.value !== null) {
            return this.value;
        }
    }
}


class BST {

    constructor() {
        this.root = null;
    }

    insert(value) {

        const newNode = new Node(value, null, null);

        if (this.root === null) {
            this.root = newNode;
            return;
        }
    
        let current = this.root;
    
        while (true) {
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return;
                } 
                else {
                    current = current.left;
                }
            } 
            else {
                if (current.right === null) {
                    current.right = newNode;
                    return;
                } 
                else {
                    current = current.right;
                }
            }
        }
    }

    find(value) {

        let current = this.root;
    
        while (current !== null) {
            if (value === current.value) {
                return current;
            }
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
    
        return null;
    }

    delete(value) {

        let current = this.root;
        let parent = null;

        while (current != null) {

            if (value < current.value) {
                parent = current;
                current = current.left;
            } else if (value > current.value) {
                parent = current;
                current = current.right;
            } else { 

                if(current.right === null || current.left === null) {
                    if(parent == null) {
                        this.root = null;
                    } else if (parent.left === current) {
                        parent.left = null;
                    } else {
                        parent.right = null;
                    }
                } 
                return true;
            }
        }
    }

    countEdges(node) {

        if(node === null) {
            return 0;
        }

        let leftEdges = this.countEdges(node.left);
        let rightEdges = this.countEdges(node.right);

        return leftEdges + rightEdges + 1;


    }

    // from node to leaf
    height(value) {

        const node = this.find(value);
        if(node === null) {
            return null;
        }

        function getHeight(node) {

            if(node === null) {
                return -1;
            }
            const leftHeight = getHeight(node.left);
            const rightHeight = getHeight(node.right);

            return 1 + Math.max(leftHeight, rightHeight);
        }

        return getHeight(node);
    }

    // from node to root
    depth(value) {

        const node = this.find(value);

        if(node === null) {
            return null;
        }

        function getDepth(current, currentDepth) {
            if(current === null) {
                return -1;
            }

            if(current === node) {
                return currentDepth;
            }

            if(value < current.value) {
                return getDepth(current.left, currentDepth + 1);
            }
            return getDepth(current.right, currentDepth + 1);
        }

        return getDepth(this.root, 0);

    }

    isBalanced(root) {

        if(root === null) {
            return true;
        }

        let lHeight = this.isBalanced(root.left);
        let rHeight = this.isBalanced(root.right);

        if(lHeight === -1 || rHeight === -1 || Math.abs(lHeight - rHeight) > 1) {
            return false;
        }

        return Math.max(lHeight, rHeight) + 1;

    }

    rebalance(node, tree) {

        tree.root = null;

        tree.insert(this.inOrderRecursive(node));

        return tree;
    }

    // buildBalancedBST(array, tree) {

    //     if(array.length === 0) {
    //         return;
    //     }

    //     const mid = Math.floor(array.length / 2);
    //     tree.insert(array[mid].value);

    //     this.buildBalancedBST(array.slice(0, mid), tree);
    //     this.buildBalancedBST(array.slice(mid + 1), tree);
    // }



    itterativeLevelOrderForEach(node) {

        let myQueue = [];

        if(this.root == null) {
            return;
        }

        myQueue.push(this.root);

        while(myQueue.length > 0) {

            let current = myQueue.shift();
            console.log(current.show());

            if(current.left !== null) {
                myQueue.push(current.left);
            }

            if(current.right !== null) {
                myQueue.push(current.right);
            }
        }
    }

    inOrderRecursive(node) {

        if(!(node == null)) {
            this.inOrderRecursive(node.left);
            console.log(node.show());
            this.inOrderRecursive(node.right);
        }

    }

    inOrderItterative(node) {

        let stack = [];

        let result = [];

        let current = this.root;

        while (stack.length > 0 || current !== null) {

            while(current !== null) {

                stack.push(current);
                current = current.left;

            }

            current = stack.pop();
            result.push(current.value);
            console.log(current.value);

            current = current.right

        }
        return result;
    }

    preOrderRecursive(node) {
        
        if(!(node == null)) {
            console.log(node.show());
            this.preOrderRecursive(node.left);
            this.preOrderRecursive(node.right);
        }
    }

    postOrderRecursive(node) {

        if(!(node == null)) {
            this.postOrderRecursive(node.left);
            this.postOrderRecursive(node.right);
            console.log(node.show());
        }``
    }

    getEdgeCount() {
        return this.countEdges(this.root) - 1;  // Subtract 1 to get the actual number of edges
    }

}


let newBST = new BST();

for(let i = 0; i < 100; i++) {
    let randDigit = Math.floor(Math.random() * 100);
    newBST.insert(randDigit);
}

newBST.insert(200);
newBST.insert(111);

if (newBST.isBalanced(newBST.root) === false) {
    console.log("Tree was not balanced")
    console.log("Rebalancing... ")
    newBST.rebalance(newBST.root, newBST);
} 
else {
    console.log("Tree was originaly balanced: ");
    console.log("Is Balanced: ", newBST.isBalanced(newBST.root));
}


console.log("Level Order: ");
console.log(newBST.itterativeLevelOrderForEach(newBST.root));

console.log("Pre Order: ");
console.log(newBST.preOrderRecursive(newBST.root));

console.log("Post Order: ");
console.log(newBST.postOrderRecursive(newBST.root))

console.log("In Order: ");
console.log(newBST.inOrderRecursive(newBST.root));