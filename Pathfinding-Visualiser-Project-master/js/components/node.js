/**
 * @author Karan Gandhi
 * @email karangandhi.programming@gmail.com
 * @create date 2019-12-26 19:51:57
 * @desc Node class
 */

"use strict";

/**
 * Creats a Node for the grid
 *
 * @class Node
 */
class Node {
    /**
     * Creates an instance of Node.
     *
     * @param {number} x
     * @param {number} y
     * @param {number} h
     * @param {number} w
     * @param {boolean} obstacle
     * @param {Dom Element} root
     * @param {boolean} start
     * @param {boolean} end
     * @param {Dom Element} grid
     * @memberof Node
     */
    constructor(x, y, h, w, obstacle, root, start, end, grid) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.obstacle = false;
        this.root = root;
        this.previous = undefined;
        this.f = 0;
        this.h = 0;
        this.g = 0;
        this.neighbors = [];
        this.mneighbours = [];
        this.mwalls = [];
        this.visited = false;
        this.node = document.createElement("div");
        this.node.style.position = "absolute";
        this.node.style.left = x * w + "px";
        this.node.style.top = y * h + "px";
        this.node.style.height = h + "px";
        this.node.style.width = h + "px";
        this.node.id = "col";
        this.node.pgrid = grid;
        this.node.obj = this;
        if (this.obstacle) {
            this.node.classList.toggle("obstacle");
        }
        this.root.append(this.node);
        this.start = false;
        this.end = false;
        this.grid = grid;
    }

    /**
     * Gets the neighbours of the cell
     *
     * @param {Dom Element} grid
     * @memberof Node
     */
    addNeighbours(grid) {
        let y = this.x;
        let x = this.y;
        let g = grid.nodes;
        let cols = grid.cols;
        let rows = grid.rows;

        this.neighbors.length = 0;

        if (x - 1 >= 0) {
            this.neighbors.push(g[x - 1][y]);
        }
        if (y - 1 >= 0) {
            this.neighbors.push(g[x][y - 1]);
        }
        if (y + 1 < cols) {
            this.neighbors.push(g[x][y + 1]);
        }
        if (x + 1 < rows) {
            this.neighbors.push(g[x + 1][y]);
        }
    }

    addMWalls(grid) {
        let y = this.x;
        let x = this.y;
        let g = grid.nodes;
        let cols = grid.cols;
        let rows = grid.rows;

        this.mwalls.length = 0;

        if (x - 1 >= 0) {
            this.mwalls.push(g[x - 1][y]);
        }
        if (y - 1 >= 0) {
            this.mwalls.push(g[x][y - 1]);
        }
        if (y + 1 < cols) {
            this.mwalls.push(g[x][y + 1]);
        }
        if (x + 1 < rows) {
            this.mwalls.push(g[x + 1][y]);
        }
    }

    /**
     * chreck the neighbours and return a random one
     *
     * @param {Grid} grid
     * @returns {Node}
     * @memberof Node
     */
    checkNeighbours(grid) {
        let y = this.x;
        let x = this.y;
        let g = grid.nodes;
        let cols = grid.cols;
        let rows = grid.rows;

        this.mneighbours.length = 0;

        if (x - 2 >= 0 && !g[x - 2][y].visited) {
            this.mneighbours.push(g[x - 2][y]);
        }
        if (y - 2 >= 0 && !g[x][y - 2].visited) {
            this.mneighbours.push(g[x][y - 2]);
        }
        if (y + 2 < cols && !g[x][y + 2].visited) {
            this.mneighbours.push(g[x][y + 2]);
        }
        if (x + 2 < rows && !g[x + 2][y].visited) {
            this.mneighbours.push(g[x + 2][y]);
        }

        if (this.mneighbours.length > 0) {
            let r = Math.ceil(Math.random() * this.mneighbours.length) - 1;
            return this.mneighbours[r];
        } else {
            return undefined;
        }
    }

    /**
     * sets the colour of the current cell
     *
     * @param {String} color
     * @memberof Node
     */
    setColour(color, dontAnimate) {
        this.node.style.backgroundColor = color;
        // this.animate();
        this.node.style.border = "none";
        if (!dontAnimate) {
            this.node.style.animation = "1s visitedNodeAnimation";
            setTimeout(() => {
                this.node.style.animation = "";
            },1100)
        }
    }

    removeColor() {
        this.node.style.backgroundColor = "";
        this.node.style.border = "";
    }

    /**
     * sets the icon path of the cell
     *
     * @param {String} path
     * @memberof Node
     */
    setIcon(path) {
        this.node.style.backgroundImage = `url("${path}")`;
    }

    removeIcon() {
        this.node.style.backgroundImage = "none";
    }

    setObstacle() {
        if (drawing && !this.start && !this.end) {
            if (!this.obstacle) {
                // this.obstacle = true;
                this.setWall();
                // let i = setInterval(() => this.obstacle = true);
                // setTimeout(() => clearInterval(i), 1000);
            } else {
                this.removeWall();
                // this.obstacle = false;
            }
            // this.node.classList.toggle("obstacle");
        }
    }

    animate() {
        // this.node.style.transition = "0s";
        // this.node.style.transform = "scale(0)";
        // setTimeout(() => {
        //     this.node.style.transition = "0.4s";
        //     this.node.style.transform = "scale(1)";            
        // }, 2);
        // this.node.style.transform = "scale(0.1)";
        // setTimeout(() => (this.node.style.transform = "scale(1)"), 400);
        // let i = 0;
        // let interval = setInterval(() => {
        //     if (i === 1) clearInterval(interval);
        //     this.node.style.transform = `scale(${i})`;
        //     i += 0.1;
        // }, 100);
    }

    setWall() {
        this.obstacle = true;
        this.node.classList.add("obstacle");
    }

    removeWall() {
        this.obstacle = false;
        this.node.classList.remove("obstacle");
    }

    rotate(deg) {
        this.node.style.transform = `rotate(${deg}deg)`;
    }

    unvisitedNeighbours(grid) {
        let y = this.x;
        let x = this.y;
        let g = grid.nodes;
        let cols = grid.cols;
        let rows = grid.rows;
        let unvisitedn = true;

        // if (!(x - 2 >= 0 && !g[x - 2][y].visited)) {
        //     unvisitedn = false;
        // }
        // if (!(y - 2 >= 0 && !g[x][y - 2].visited)) {
        //     unvisitedn = false;
        // }
        // if (!(y + 2 < cols && !g[x][y + 2].visited)) {
        //     unvisitedn = false;
        // }
        // if (!(x + 2 < rows && !g[x + 2][y].visited)) {
        //     unvisitedn = false;
        // }

        // return unvisitedn;
        let w = x - 2 >= 0 && !g[x - 2][y].visited, // if it exists and is not visited then true
            e = x + 2 < rows && !g[x + 2][y].visited,
            n = y - 2 >= 0 && !g[x][y - 2].visited,
            s = y + 2 > cols && !g[x][y + 2].visited;

        return n && s && e && w;
    }

    getAbsolutePosition() {
        let obj = this.node;
        let x = obj.offsetLeft;
        let y = obj.offsetTop;
        while (obj.offsetParent) {
            x = x + obj.offsetParent.offsetLeft;
            y = y + obj.offsetParent.offsetTop;
            if (obj == document.getElementsByTagName("body")[0]) break;
            else obj = obj.offsetParent;
        }
        return [x, y];
    }

    invert() {
        this.node.classList.toggle("inverted");
    }
}