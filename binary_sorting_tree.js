export class Node {
    constructor(id, val) {
        this.id = id;
        this.val = val;
        this.left = null;
        this.right = null;
        this.rank = null;
    }

    /**
     * @param {Node} node
     */
    copyFrom(node) {
        this.id = node.id;
        this.val = node.val;
    }
}

export class BST {
    constructor() {
        this.bst = null;
    }

    /**
     * @param {number} id
     * @param {number} val
     */
    insert(id, val) {
        if (!this.bst) this.bst = this._newNode(id, val);
        else this._insertSuit(this.bst, this._newNode(id, val));
    }

    /**
     * @param {number} id
     * @param {number} val
     */
    updateById(id, val) {
        this._deleteById(this.bst, id);
        this._insertSuit(this.bst, this._newNode(id, val));
    }

    /**
     * @param {number} id
     */
    deleteById(id) {
        return this._deleteById(this.bst, id);
    }

    /**
     * @param {number} val
     */
    deleteByVal(val) {
        return this._deleteByVal(this.bst, val);
    }

    traceTree() {
        this._traceNode(this.bst);
    }

    /**
     * @param {number} val
     */
    findByVal(val) {
        return this._findByVal(this.bst, val);
    }

    /**
     * @param {number} id
     */
    findById(id) {
        return this._findById(this.bst, id);
    }

    /**
     * @param {number} val
     */
    getRankByVal(val) {

        let rank = 0;
        let node = this.bst;

        while (node) {

            // move to left subtree
            if (val < node.val) {
                node = node.left;
            }

            else if (val > node.val) {
                rank += (1 + this._size(node.left));
                node = node.right;
            }

            else return this._size(this.bst) - (rank + this._size(node.left));
        }
        return -1; // not found
    }

    /**
     * @param {number} id
     */
    getRankById(id) {

        let rank = 0;
        let node = this.bst;

        if (!this._findById(this.bst,id)) return -1;

        while (node) {

            // move to left subtree
            if ( node.left && (this._findById(node.left, id)) ) {
                node = node.left;
            }

            else if ( node.right && (this._findById(node.right, id)) ) {
                rank += (1 + this._size(node.left));
                node = node.right;
            }

            else return this._size(this.bst) - (rank + this._size(node.left));
        }
    }

    size() {
        return this._size(this.bst);
    }


    /**
     * @param  {number} id
     * @param  {number} val
     * @returns
     */
    _newNode(id, val) {
        let node = new Node(id, val);
        return node;
    }

    /**
     * @param {Node} node
     * @param {Node} n_node
     */
    _insertLeft(node, n_node) {
        node.left = n_node;
        return node;
    }

    /**
     * @param {Node} node
     * @param {Node} n_node
     */
    _insertRight(node, n_node) {
        node.right = n_node;
        return node;
    }

    /**
     * @param {Node} node
     * @param {Node} new_node
     */
    _insertSuit(node, new_node) {

        if (new_node.val > node.val) {
            if (node.right) this._insertSuit(node.right, new_node);
            else this._insertRight(node, new_node);
        } else {
            if (node.left) this._insertSuit(node.left, new_node);
            else this._insertLeft(node, new_node);
        }

        return node;
    }

    /**
     * @param {Node} node
     * @param {number} id
     */
    _findById(node, id) {
        let n = null;

        if (!node) return null;

        if (node.id == id) return node;

        if (node.left && (n = this._findById(node.left, id))) return n;

        if (node.right && (n = this._findById(node.right, id))) return n;

        else return null;
    }

    /**
     * @param {Node} node
     * @param {number} val
     */
    _findByVal(node, val) {
        if (!node) return null;

        if (node.val == val) {
            node.rank = this._size(this.bst) - this._size(node.left);
            return node;
        }

        if (val > node.val && node.right) return this._findByVal(node.right, val);

        if (val <= node.val && node.left) return this._findByVal(node.left, val);

        else return null;
    }

    /**
     * @param {Node} node
     */
    _minVal(node) {
        if (!node.left) return node;

        else return this._minVal(node.left);
    }

    /**
     * @param {Node} node
     */
    _maxVal(node) {
        if (!node.right) return node;

        else return this._maxVal(node.right);
    }

    /**
     * @param {Node} node
     */
    _size(node) {
        let l_size = 0, r_size = 0;
        if (!node) return 0;

        if (node.left) l_size = this._size(node.left);
        if (node.right) r_size = this._size(node.right);

        return l_size + r_size + 1;
    }

    /**
     * @param {Node} node
     */
    _traceNode(node) {
        if (node && node.left) this._traceNode(node.left);

        console.log(node.val);

        if (node && node.right) this._traceNode(node.right);
    }

    /**
     * @param {Node} node
     * @param {number} id
     */
    _deleteById(node, id) {

        if (!node) return node;

        // 如果目標在左子樹，就往左繼續跑
        if ( node.left && this._findById(node.left, id) ) {

            node.left = this._deleteById(node.left, id);
            return node;

        // 如果目標在右子樹，就往右繼續跑
        } else if ( node.right && this._findById(node.right, id) ) {

            node.right = this._deleteById(node.right, id);
            return node;

        } else {

            // 若整棵樹都沒有相符合的節點就 return null
            if (node.id != id) return null;

            // 若是沒有左子樹，就把右子樹上移
            if (!node.left) {
                let l_n = node.right;
                node = null;
                return l_n;
            }

            // 若是沒有右子樹，就把左子樹上移
            if (!node.right) {
                let r_n = node.left;
                node = null;
                return r_n;
            }

            // 若是左右都有子樹，找右子樹的最小(也可以是左子樹的最大)作為新節點
            let n = this._minVal(node.right);

            node.copyFrom(n);
            node.right = this._deleteById(node.right, n.id);

            return node;
        }
    }

    /**
     * @param {Node} node
     * @param {number} val
     */
    _deleteByVal(node, val) {
        let l_n = null, r_n = null, n = null;

        if (!node) return node;

        if (val < node.val) node.left = this._deleteByVal(node.left, val);

        else if (val > node.val) node.right = this._deleteByVal(node.right, val);

        else {

            if (!node.left) {
                r_n = node.right;
                node = null;
                return r_n;
            }

            if (!node.right) {
                l_n = node.left;
                node = null;
                return l_n;
            }

            // 若是左右都有子樹，找右子樹的最小(也可以是左子樹的最大)作為新節點

            let n = this._minVal(node.right);

            node.copyFrom(n);
            node.right = this._deleteByVal(node.right, n.val);
        }

        return node;
    }
}