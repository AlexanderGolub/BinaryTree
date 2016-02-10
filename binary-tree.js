'use strict';

class BinaryTree {
	constructor() {
		this.root = null;
	}

	insert(data) {
		if (!this.root) this.root = new Node(data);
		else this.placeNode(this.root, data);
	}

	placeNode(element, data) {
		var dir = data < element.data ? 'left' : 'right';
		if (!element[dir]) element[dir] = new Node(data);
		else this.placeNode(element[dir], data);
	}

	contains(data) {
		var iter = this.root;
		while (1) {
			if (!iter) return false;
			if (iter.data === data) return true;
			else iter = data < iter.data ? iter.left : iter.right;
		}
	}

	remove(data) {
		var iter = this.root;
		var prevNode = null;
		while (1) {
			if (!iter) return;
			if (iter.data === data) {
				if (iter === this.root) {
					this.removeRoot();
					return;
				}
				var dir = prevNode.data > iter.data ? 'left' : 'right';
				this.removeNode(prevNode, dir, iter);
				return;
			}
			else {
				prevNode = iter;
				iter = data < iter.data ? iter.left : iter.right;
			}
		}
	}

	removeRoot() {
		var iterRight = this.root.right;
		if (!iterRight) {
			this.root = this.root.left;
			return;
		}
		else {
			while (iterRight.left) iterRight = iterRight.left;
			iterRight.left = this.root.left;
			this.root = this.root.right;
			return;
		}
	}

	removeNode(prevNode, dir, node) {
		var iterRight = node.right;
		if (!iterRight) {
			prevNode[dir] = node.left;
			return;
		}
		else {
			while (iterRight.left) iterRight = iterRight.left;
			prevNode[dir] = iterRight;
			iterRight.left = node.left;
			return;
		}
	}

	size() {
		this.elemetsNum = 0;
		if (this.root) this.sizeCounter(this.root);
		return this.elemetsNum;
	}

	sizeCounter(element){
		this.elemetsNum++;
		if (element.right) this.sizeCounter(element.right);
		if (element.left) this.sizeCounter(element.left);
	}	

	isEmpty() {
		return !this.root;
	}
}

