"use strict";

async function bfs(start, end, t) {
	let q = [start];

	grid.setAlgo(bfs);

	for (let row of grid.nodes) {
		for (let node of row) {
			node.previous = null;
			node.visited = false;
			node.removeColor();
		}
	}

	if (t != 0) {
		while (q.length !== 0) {
			let v = q.pop();
			v.visited = true;
			v.setColour("GREEN");
			if (v === end) {
				await retracePath(v, t);
				break;
				return;
			}

			for (let neighbour of v.neighbors) {
				if (!neighbour.visited && !neighbour.obstacle) {
					neighbour.visited = true;
					neighbour.previous = v;
					q.unshift(neighbour);
					await sleep(t);
				}
			}
		}
	} else {
		while (q.length !== 0) {
			let v = q.pop();
			v.visited = true;
			v.setColour("GREEN", true);
			if (v === end) {
				await retracePath(v, t);
				break;
				return;
			}

			for (let neighbour of v.neighbors) {
				if (!neighbour.visited && !neighbour.obstacle) {
					neighbour.visited = true;
					neighbour.previous = v;
					q.unshift(neighbour);
				}
			}
		}
	}
}