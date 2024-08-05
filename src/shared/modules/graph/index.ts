import { Node } from "./node";

class Vertex<T> extends Node<T> {
	private neighbors = new Array<Node<T>>();

	public addNeighbor(node: Node<T>): void {
		this.neighbors.push(node);
	}

	public removeNeighbor(node: Node<T>): Node<T> | undefined {
		const index = this.neighbors.findIndex((value) => value === node);
		return this.neighbors.remove(index);
	}

	public clearNeighbors(): void {
		this.neighbors.clear();
	}

	public hasNeighbor(node: Node<T>): boolean {
		return this.neighbors.includes(node);
	}
}

export class DirectedGraph<T> {
	private vertices = new Map<T, Vertex<T>>();

	public addVertex(value: T): Vertex<T> {
		if (this.vertices.has(value)) {
			return this.vertices.get(value)!;
		}

		const vertex = new Vertex(value);
		this.vertices.set(value, vertex);
		return vertex;
	}

	public removeVertex(value: T): Vertex<T> | undefined {
		const target = this.vertices.get(value);
		if (!target) return;
		target.clearNeighbors();

		this.vertices.delete(value);
		this.vertices.forEach((value) => {
			if (!value.hasNeighbor(target)) return;
			value.removeNeighbor(target);
		});
	}

	public addEdge(from: T, to: T): void {
		const source = this.addVertex(from);
		const destination = this.addVertex(to);

		source.addNeighbor(destination);
	}

	public removeEdge(from: T, to: T): void {
		const source = this.vertices.get(from);
		if (!source) return;
		const destination = this.vertices.get(to);
		if (!destination) return;

		source.removeNeighbor(destination);
	}
}
