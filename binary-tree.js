'use strict';

var elements_count = 0;

class BinaryTree {
	constructor() {
		this.root = null;
	}

	insert(data) {
		if(this.root == null)
			this.root = new Node(data);
		else
			this.place_node(this.root, data);
	}

	place_node(element, data) {
		var dir = (data < element.data) ? 'left' : 'right';
		if(element[dir] == null)
			element[dir] = new Node(data);
		else
			this.place_node(element[dir], data);
	}

	contains(data) {
		var iter = this.root;
		while(1) {
			if(iter == null)
				return false;
			if(iter.data == data)
				return true;
			else
				iter = (data < iter.data) ? iter.left : iter.right;
		}
	}

	remove(data) {
		var iter = this.root;
		var prev_node = null;
		while(1) {
			if(iter == null)
				return;
			if(iter.data == data) {
				if(iter == this.root) {
					this.remove_root();
					return;
				}
				var dir = (prev_node.data > iter.data) ? 'left' : 'right';
				this.remove_node(prev_node, dir, iter);
				return;
			}
			else {
				prev_node = iter;
				iter = (data < iter.data) ? iter.left : iter.right;
			}
		}
	}

	remove_root() {
		var iter_right = this.root.right;
		if(iter_right == null) {
			this.root = this.root.left;
			return;
		}
		else {
			while(iter_right.left != null)
				iter_right = iter_right.left;
			iter_right.left = this.root.left;
			this.root = iter_right;
			return;
		}
	}

	remove_node(prev_node, dir, node) {
		var iter_right = node.right;
		if(iter_right == null) {
			prev_node[dir] = node.left;
			return;
		}
		else {
			while(iter_right.left != null)
				iter_right = iter_right.left;
			prev_node[dir] = iter_right;
			iter_right.left = node.left;
			return;
		}
	}

	size() {
		this.elements_count = 0;
		if(this.root)
			this.recursive_size_counter(this.root);
		return this.elements_count;
	}

	recursive_size_counter(element){
		this.elements_count++;
		if(element.right)
			this.recursive_size_counter(element.right);
		if(element.left)
			this.recursive_size_counter(element.left);
	}	

	isEmpty() {
		return (this.root == null) ? true: false;
	}
}

