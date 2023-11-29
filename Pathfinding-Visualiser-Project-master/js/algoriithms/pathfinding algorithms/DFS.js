"use strict";

async function dfs(start, end, t) {
	let s = [start];

	grid.setAlgo(dfs);
	drawing = false;
	grid.drawing = false;
	for (let row of grid.nodes) {
		for (let node of row) {
			node.visited = false;
			node.previous = null;
			node.removeColor();
		}
	}

	let v;
	if (t == 0) {
		while (s.length != 0) {
			v = s.pop();
			console.log(v.node);
			if (v === end) {
				console.log("done");
				retracePath(v, 0);
				break;
				return;
			}
			if (!v.visited) {
				v.setColour("red", true);
				v.visited = true;
				for (let neighbour of v.neighbors) {
					if (!neighbour.visited && !neighbour.obstacle) {
						s.push(neighbour);
						neighbour.previous = v;
					}
				}
			}
		}
	} else {
		while (s.length != 0) {
			v = s.pop();
			console.log(v.node);
			if (v === end) {
				console.log("done");
				retracePath(v, 100);
				break;
				return;
			}
			if (!v.visited) {
				v.setColour("red");
				v.visited = true;
				for (let neighbour of v.neighbors) {
					if (!neighbour.visited && !neighbour.obstacle) {
						s.push(neighbour);
						neighbour.previous = v;
						await sleep(t);
					}
				}
			}
		}
	}
}