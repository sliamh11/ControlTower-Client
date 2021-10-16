class Node<T>{
    data: T;
    next: Node<T>;
    previous: Node<T>;

    constructor(data: T) {
        this.data = data;
        this.next = null;
        this.previous = null;
    }
}

export class LinkedList<T extends Node<T>>{
    firstNode: Node<T>;
    lastNode: Node<T>;
    count: number;

    constructor() {
        this.firstNode = null;
        this.lastNode = null;
        this.count = 0;
    }

    clear = () => {
        this.firstNode = null;
        this.lastNode = null;
        this.count = 0;
    }

    addFirst = (value: T) => {
        if (value) {
            const node = new Node(value);
            if (this.firstNode === null) {
                this.firstNode = node;
                this.lastNode = node;
            } else {
                this.firstNode.previous = node;
                node.next = this.firstNode;
                this.firstNode = node;
            }
            this.count++;
        }
        else {
            throw new Error("Argument Exception");
        }
    }

    addLast = (value: T) => {
        if (value) {
            const node = new Node(value);
            if (this.lastNode === null) {
                this.addFirst(value);
            } else {
                this.lastNode.next = node;
                node.previous = this.lastNode;
                this.lastNode = node;
            }
            this.count++;
        }
        else {
            throw new Error("Argument Exception");
        }
    }

    removeFirst = () => {
        if (this.count === 0)
            return;

        if (this.firstNode === this.lastNode) {
            this.firstNode = null;
            this.lastNode = null;
        } else {
            this.firstNode.next.previous = null;
            this.firstNode = this.firstNode.next;
        }
        this.count--;
    }

    removeLast = () => {
        if (this.count === 0)
            return;

        if (this.firstNode === this.lastNode) {
            this.removeFirst();
        } else {
            this.lastNode.previous.next = null;
            this.lastNode = this.lastNode.previous;
            this.count--;
        }
    }
}