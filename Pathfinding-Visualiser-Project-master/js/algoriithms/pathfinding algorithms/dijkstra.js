("use strict");

function dijkstra(start, end, t) {
    grid.setAlgo(dijkstra);
    grid.resetPath();
    let ngrid = grid.nodes;
    let Q = [];
    let time = t;
    let current = undefined;
    let wallsurround = false;
    grid.drawing = false;
    drawing = false;
    grid.removeEventListeners();

    for (let row of ngrid) {
        for (let cell of row) {
            cell.g = Infinity;
            cell.previous = undefined;
            if (!cell.obstacle) {
                Q.push(cell);
            }
            if (cell === start) {
                cell.g = 0;
            }
        }
    }

    if (time !== 0) {
        let interval = setInterval(async () => {
            if (Q.length > 0) {
                let index = 0;
                for (let i = 0; i < Q.length; i++) {
                    if (Q[i].g < Q[index].g) {
                        index = i;
                    }
                }

                current = Q[index];

                if (!current.obstacle && current.g !== Infinity) {
                    Q.splice(Q.indexOf(current), 1);
                    if (current === end) {
                        console.log("done");
                        grid.completed();
                        clearInterval(interval);
                        retracePath(current, 100);
                        return;
                    }
                    for (let i = 0; i < current.neighbors.length; i++) {
                        let neighbour = current.neighbors[i];
                        if (!neighbour.obstacle) {
                            let tempG = current.g + 1;
                            if (tempG < neighbour.g) {
                                neighbour.g = tempG;
                                neighbour.previous = current;
                            }
                        } else {
                            continue;
                        }
                    }
                } else {
                    wallsurround = true;
                    Q.length = 0;
                }
            } else {
                console.log("no solution");
                clearInterval(interval);
                grid.completed();
                return;
            }

            if (!wallsurround) {
                current.setColour("#3f51b5");
            }
        }, time);
    }
    else {
        while(true) {
            if (Q.length > 0) {
                let index = 0;
                for (let i = 0; i < Q.length; i++) {
                    if (Q[i].g < Q[index].g) {
                        index = i;
                    }
                }

                current = Q[index];

                if (!current.obstacle && current.g !== Infinity) {
                    Q.splice(Q.indexOf(current), 1);
                    if (current === end) {
                        console.log("done");
                        retracePath(current, 0);
                        grid.completed();
                        return;
                    }
                    for (let i = 0; i < current.neighbors.length; i++) {
                        let neighbour = current.neighbors[i];
                        if (!neighbour.obstacle) {
                            let tempG = current.g + 1;
                            if (tempG < neighbour.g) {
                                neighbour.g = tempG;
                                neighbour.previous = current;
                            }
                        } else {
                            continue;
                        }
                    }
                } else {
                    wallsurround = true;
                    Q.length = 0;
                }
            } else {
                console.log("no solution");
                console.log(Q);
                grid.completed();
                return;
            }

            if (!wallsurround) {
                current.setColour("#3f51b5", true);
            }
        }
    }
}
