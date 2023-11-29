async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getNeighbours(node) {
	let neighbours = [];
	let cols = grid.cols;
	let rows = grid.rows;
	let g = grid.nodes;
	let x = node.y;
	let y = node.x;

	if (x - 2 >= 1 && !g[x - 2][y].visited) {
        neighbours.push(g[x - 2][y]);
    }
	if (y - 2 >= 1 && !g[x][y - 2].visited) {
        neighbours.push(g[x][y - 2]);
    }
    if (y + 2 < cols - 1 && !g[x][y + 2].visited) {
        neighbours.push(g[x][y + 2]);
	}
    if (x + 2 < rows - 1 && !g[x + 2][y].visited) {
		neighbours.push(g[x + 2][y]);
	}

	return neighbours;
}

function removeWall(current, neighbour) {
	let cx = current.x;
	let cy = current.y;
	let nx = neighbour.x;
	let ny = neighbour.y;

	// console.log({cx, cy, nx, ny, current, neighbour})

	if (cx == nx && ny > cy) {
		// console.log(grid.nodes[cy - 1][cx], {current, neighbour})
		grid.nodes[cy + 1][cx].removeWall();
	} else if (cx == nx) {
		// console.log(grid.nodes[cy - 1][cx], {current, neighbour});
		grid.nodes[cy - 1][cx].removeWall();
	} else if (nx < cx) {
		// console.log(grid.nodes[cy][cx - 1], {current, neighbour});
		grid.nodes[cy][cx - 1].removeWall();
	} else {
		// console.log(grid.nodes[cy][cx + 1], {current, neighbour});
		grid.nodes[cy][cx + 1].removeWall();
	}
}