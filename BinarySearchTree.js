// Sumit Ghosh: [Implementation of Binary Search Tree in Javascript, geeksforgeeks](https://www.geeksforgeeks.org/implementation-binary-search-tree-javascript/)
class BSTNode {
    constructor(obj, weight) {
        this.data = {obj: obj, weight: weight};
        this.left = null;
        this.right = null;
    }

    /**
     * Compares the current node instance with the one on the input
     * @param {BSTNode} other node to compare to.
     * @returns The result of the comparation
     */
    compareTo(other) {
        let cmp = this.data.weight - other.data.weight;
        if (cmp < 0) {
            return -1;
        }
        else if (cmp == 0) {
            return 0;
        }
        else {
            return 1;
        }
    }

    toString() {
        if (typeof this.data.obj == "number") {
            let s = "" + this.data.obj;
            while(s.length < 3) {
                s = "0" + s;
            }
            return s;
        }
        return this.data.obj.toString();
    }
}

// Binary Search tree class
class BinarySearchTree {
	constructor() {
		this.root = null; // root of a binary seach tree
        this.size = 0;
	}

	// function to be implemented
	/** 
     * Helper method which creates a new node to be inserted and calls insertNode 
     * */ 
    insert(obj, value=obj) {
        var newNode = new BSTNode(obj, value); // Creating a node and initailising with data
        if(this.root === null) { // root is null then node will be added to the tree and made root.
            this.root = newNode;
        }
        else { // find the correct position in the tree and add the node
            this.insertNode(this.root, newNode);
            this.size++;
            return newNode;
        }
    }

    /**
     * Method to insert a node in a tree. It moves over the tree to find the location. To insert a node with a given data
     * */
    insertNode(node, newNode) {
        // if(newNode.data < node.data) { // if the data is less than the node data move left of the tree
        if (newNode.compareTo(node) == -1) {
            if(node.left === null) { // if left is null insert node here
                node.left = newNode;
            }
            else { // if left is not null recur until null is found
                this.insertNode(node.left, newNode);
            }
        }

        else { // if the data is more than the node data move right of the tree
            if(node.right === null) { // if right is null insert node here
                node.right = newNode;
            }
            else { // if right is not null recur until null is found
                this.insertNode(node.right,newNode);
            }
        }
    }

    /**
     * Helper method that calls the removeNode with a given data
     */
    remove(data) {
        // root is re-initialized with root of a modified tree.
        this.root = this.removeNode(this.root, data);
        this.size++;
    }

    
    /**
     * Method to remove node with a given data. It recur over the tree to find the data and removes it
     */
    removeNode(node, nodeToRemove) {
        if(node === null) { // if the root is null then tree is empty
            return null;
        }
        // else if(key < node.data) { // if data to be delete is less than roots data then move to left subtree
        else if(node.compareTo(key) == 1) { // if data to be delete is less than roots data then move to left subtree
            node.left = this.removeNode(node.left, key);
            return node;
        }
        // else if(key > node.data) { // if data to be delete is greater than roots data then move to right subtree
        else if(node.compareTo(key) == -1) { // if data to be delete is greater than roots data then move to right subtree
            node.right = this.removeNode(node.right, key);
            return node;
        }
        else { // if data is similar to the root's data then delete this node
            if(node.left === null && node.right === null) { // deleting node with no children
                node = null;
                return node;
            }

            if(node.left === null) { // deleting node with one children
                node = node.right;
                return node;
            }
            else if(node.right === null) {
                node = node.left;
                return node;
            }

            // Deleting node with two children
            // minumum node of the rigt subtree is stored in aux
            var aux = this.findMinNode(node.right);
            node.data = aux.data;

            node.right = this.removeNode(node.right, aux.data);
            return node;
        }

    }


	// Helper function

    /**
     * finds the max depth of the tree (longest branch)
     */
    findDepth(node=null, currentDepth=0) {
        if (node == null && currentDepth == 0) {
            node = this.getRootNode();
        }
        else if (node == null) {
            return 0;
        }

        if (node.left == null && node.right == null) {
            return currentDepth;
        }
        else {
            return Math.max(
                this.findDepth(node.left, currentDepth + 1),
                this.findDepth(node.right, currentDepth + 1)
            )
        }
    }

    /**
     * finds the minimum node in tree searching starts from given node
     * */ 
    findMinNode(node) {
        if(node.left === null) { // if left of a node is null then it must be minimum node
            return node;
        }
        else {
            return this.findMinNode(node.left);
        }
    }

	/**
     * returns root of the tree
     * */ 
    getRootNode() {
        return this.root;
    }



    /**
     * Performs inorder traversal of a tree
     * */
    inorder(node) {
        if(node !== null) {
            this.inorder(node.left);
            console.log(node.data);
            this.inorder(node.right);
        }
    }

	/**
     * Performs preorder traversal of a tree
     *  */	
    preorder(node) {
        if(node !== null) {
            console.log(node.data);
            this.preorder(node.left);
            this.preorder(node.right);
        }
    }
		
	/**
     * Performs postorder traversal of a tree
     *  */
    postorder(node) {
        if(node !== null) {
            this.postorder(node.left);
            this.postorder(node.right);
            console.log(node.data);
        }
    }

	/**
     * search for a node with given data
     * */
    search(node, data) {
        if(node === null) { // if trees is empty return null
            return null;
        }
        else if(data < node.data) { // if data is less than node's data move left
            return this.search(node.left, data);
        }
        else if(data > node.data) { // if data is less than node's data move left
            return this.search(node.right, data);
        }
        else { // if data is equal to the node data return node
            return node;
        }
    }

    


    // PRINT FUNCTIONS

    printLine(node, t) {
        let nodeName = node.toString();
        let typeConversor = ["└", "├", "─"];
        return typeConversor[t] + "──" + nodeName;
    }

    recursivePrintArr(node=this.root, type=2) {
        if (node == null) {
            return [];
        }

        let leftType = (node.right == null)? 0 : 1;
        
        let left = this.recursivePrintArr(node.left, leftType);

        let symbol = "│  ";
        if (node.right == null) {
            symbol = "   ";
        }
        for (let i = 1; i < left.length; i++) {
            left[i] = symbol + left[i];
        }

        let right = this.recursivePrintArr(node.right, 0);
        for (let i = 1; i < right.length; i++) {
            right[i] = "   " + right[i];
        }

        return [this.printLine(node, type), ...left, ...right];
    }

    recursivePrint(node=this.root, type=2) {
        let treeArr =  this.recursivePrintArr(node, type);
        
        let result = treeArr[0] + "\n";
        for (let i = 1; i < treeArr.length; i++) {
            result += "   " + treeArr[i] + "\n";
        }
        return result;
    }


    isLastNode(node) {
        if (node.left != null || node.right != null) return false;
        return true;
    }

    printTreeNode(node) {
        if (node == null) return [];

        if (this.isLastNode(node)) {
            return [node.toString()];
        }
    
        let l = this.printTreeNode(node.left);
        let r = this.printTreeNode(node.right);

        let newArr = this.mergeArr(l, r);

        let bracket = " │";
        if (r.length > 0 && l.length > 0) {
            bracket = " ├─"
            for (let j = bracket.length; j < l[0].length + 2; j++) {
                bracket += "─";
            }
            bracket += "┐";
        }
        newArr.unshift(bracket);
        newArr.unshift(node.toString());

        // Normalice size of the lines
        let len = newArr[newArr.length - 1].length;
        for (let i = 0; i < newArr.length - 1; i++) {
            for (let j = newArr[i].length; j < len; j++) {
                newArr[i] += " ";
            }
        }
        return newArr;
    }

    mergeArr(a, b) {
        let i = 0;
        let newArr = [];
        for (; i < a.length && i < b.length; i++) {
            newArr.push(a[i] + " " + b[i]);
        }
        let offSl = "", offSr = "";
        for (let j = 0; a.length > 0 && j <= a[a.length - 1].length; j++) {
            offSl += " ";
        }

        for (let j = 0; b.length > 0 && j <= b[b.length - 1].length; j++) {
            offSr += " ";
        }

        for (; i < a.length; i++) {
            newArr.push(a[i] + offSr);
        }
        for (; i < b.length; i++) {
            newArr.push(offSl + b[i]);
        }
        return newArr;
    }

    printTree(node=this.root) {
        return this.printTreeNode(node).join("\n");
    }
}


function testBinarySearchTree() {
    // create an object for the BinarySearchTree
    var BST = new BinarySearchTree();

    // Inserting nodes to the BinarySearchTree
    BST.insert(15);
    BST.insert(25);
    BST.insert(10);
    BST.insert(7);
    BST.insert(22);
    BST.insert(17);
    BST.insert(13);
    BST.insert(5);
    BST.insert(9);
    BST.insert(27);
                            
    //		 15
    //		 / \
    //	 10 25
    //	 / \ / \
    //	 7 13 22 27
    //	 / \ /
    // 5 9 17

    var root = BST.getRootNode();
                
    // prints 5 7 9 10 13 15 17 22 25 27
    BST.inorder(root);
                
    // Removing node with no children
    BST.remove(5);
                
                
    //		 15
    //		 / \
    //	 10 25
    //	 / \ / \
    //	 7 13 22 27
    //	 \ /
    //	 9 17
                
                            
    var root = BST.getRootNode();
                
    // prints 7 9 10 13 15 17 22 25 27
    BST.inorder(root);
                
    // Removing node with one child
    BST.remove(7);
                
    //		 15
    //		 / \
    //	 10 25
    //	 / \ / \
    //	 9 13 22 27
    //		 /
    //		 17
                
                
    var root = BST.getRootNode();

    // prints 9 10 13 15 17 22 25 27
    BST.inorder(root);
                
    // Removing node with two children
    BST.remove(15);
        
    //		 17
    //		 / \
    //	 10 25
    //	 / \ / \
    //	 9 13 22 27

    var root = BST.getRootNode();
    console.log("inorder traversal");

    // prints 9 10 13 17 22 25 27
    BST.inorder(root);
                
    console.log("postorder traversal");
    BST.postorder(root);
    console.log("preorder traversal");
    BST.preorder(root);
}


if (!module.parent) {
    // create an object for the BinarySearchTree
    var BST = new BinarySearchTree();

    // Inserting nodes to the BinarySearchTree
    BST.insert(15);
    BST.insert(25);
    BST.insert(10);
    BST.insert(7);
    BST.insert(22);
    BST.insert(17);
    BST.insert(13);
    BST.insert(5);
    BST.insert(9);
    BST.insert(27);

    // |      15
    // |     /  \
    // |    10   25
    // |   / \   / \
    // |  7  13 22  27
    // | / \    /
    // |5   9  17 


    // |                  015
    // |           ________-________
    // |          /                 \
    // |        010                 025
    // |      ___-___             ___-___
    // |     /       \           /       \
    // |   007       013       022       027
    // |   _-_       _-_       _-_       _-_ 
    // |  /   \     /   \     /   \     /   \
    // |005   009 000   000 170   000 000   000

    // 015
    //  ├───────────┐
    // 010         025
    //  ├───────┐   ├───┐
    // 007     013 022 027
    //  ├───┐       │
    // 005 009     017

    // |                                                                               r                                                                               |
    // |                                         ______________________________________|______________________________________                                         |
    // |                                        /                                      |                                      \                                        |
    // |                                      000                                      |                                      000                                      |
    // |                     __________________|__________________                     |                     __________________|__________________                     |
    // |                    /                                     \                    |                    /                                     \                    |
    // |                  000                  |                  000                  |                  000                  |                  000                  |
    // |           ________|________           |           ________|________           |           ________|________           |           ________|________           |
    // |          /                 \          |          /                 \          |          /                 \          |          /                 \          |
    // |        010                 025        |        010                 025        |        010                 025        |        010                 025        |
    // |      ___|___             ___|___      |      ___|___             ___|___      |      ___|___             ___|___      |      ___|___             ___|___      |
    // |     /       \           /       \     |     /       \           /       \     |     /       \           /       \     |     /       \           /       \     |
    // |   007       013       022       027   |   007       013       022       027   |   007       013       022       027   |   007       013       022       027   |
    // |   _|_       _|_       _|_       _|_   |   _|_       _|_       _|_       _|_   |   _|_       _|_       _|_       _|_   |   _|_       _|_       _|_       _|_   |
    // |  /   \     /   \     /   \     /   \  |  /   \     /   \     /   \     /   \  |  /   \     /   \     /   \     /   \  |  /   \     /   \     /   \     /   \  |
    // |005   009 017   000 000   000 000   000|005   009 017   000 000   000 000   000|005   009 017   000 000   000 000   000|005   009 017   000 000   000 000   000|



    // |                                                                               r                                                                               |
    // |                                         ______________________________________|______________________________________                                         |
    // |                                        /                                      |                                      \                                        |
    // |                                      000                                      |                                      000                                      |
    // |                     __________________|__________________                     |                     __________________|__________________                     |
    // |                    /                  |                  \                    |                    /                                     \                    |
    // |                  000                  |                  000                  |                  000                  |                  000                  |
    // |           ________|________           |           ________|________           |           ________|________           |           ________|________           |
    // |          /        |        \          |          /                 \          |          /                 \          |          /                 \          |
    // |        010        |        025        |        010                 025        |        010                 025        |        010                 025        |
    // |      ___|___      |      ___|___      |      ___|___             ___|___      |      ___|___             ___|___      |      ___|___             ___|___      |
    // |     /   |   \     |     /   |   \     |     /       \           /       \     |     /       \           /       \     |     /       \           /       \     |
    // |   007   |   013   |   022   |   027   |   007       013       022       027   |   007       013       022       027   |   007       013       022       027   |
    // |   _|_   |   _|_   |   _|_   |   _|_   |   _|_       _|_       _|_       _|_   |   _|_       _|_       _|_       _|_   |   _|_       _|_       _|_       _|_   |
    // |  / | \  |  / | \  |  / | \  |  / | \  |  /   \     /   \     /   \     /   \  |  /   \     /   \     /   \     /   \  |  /   \     /   \     /   \     /   \  |
    // |005 | 009|017 | 000|000 | 000|000 | 000|005   009 017   000 000   000 000   000|005   009 017   000 000   000 000   000|005   009 017   000 000   000 000   000|

    // test();

    // BST.print();
    // console.log(BST.recursivePrint());
    // console.log("---------------\n├──15\n    ├──10\n       ├──7\n          ├──5\n          └──9\n       └──13\n    └──25\n       ├──22\n          └──17\n       └──27");
    
    console.log(BST.printTree())
    // console.log("---------------\n                  000\n           ________-________\n          /                 \\\n        010                 025\n      ___-___             ___-___\n     /       \\           /       \\\n   007       013       022       027\n   _-_       _-_       _-_       _-_ \n  /   \\     /   \\     /   \\     /   \\\n005   009 017   000 000   000 000   000");
    console.log("---------------\n015\n ├───────────┐\n010         025\n ├───────┐   ├───┐\n007     013 022 027\n ├───┐       │\n005 009     017");


    console.log("\n\ntest2\n")
    let b1 = new BinarySearchTree();
    b1.insert(5);
    // b1.insert(3);
    // b1.insert(2);
    // b1.insert(4);
    b1.insert(8);
    b1.insert(9);
    b1.insert(7);


    // console.log(b1.recursivePrint());
    console.log(b1.printTree());
}
