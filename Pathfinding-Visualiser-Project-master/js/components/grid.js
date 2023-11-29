let drawing = true;
let startMouseDown = false;
let endMouseDown = false;

class Grid {
    constructor(rows, cols, root, nodeWidth, nodeHeight) {
        this.rows = rows;
        this.cols = cols;
        this.root = root;
        this.nodeWidth = nodeWidth;
        this.nodeHeight = nodeHeight;
        this.h = nodeHeight * rows;
        this.drawing = true;
        this.w = nodeWidth * cols + nodeWidth;
        this.nodes = [];

        for (let i = 0; i < rows; i++) {
            let row = document.createElement("div");
            row.id = "row";
            this.nodes[i] = [];
            for (let x = 0; x < cols; x++) {
                let node = new Node(x, i, nodeWidth, nodeHeight, false, row, false, false, this);
                this.nodes[i].push(node);
            }
            this.root.append(row);
        }

        this.start = this.nodes[Math.floor(rows / 2)][Math.floor(cols / 5)];
        this.end = this.nodes[Math.floor(rows / 2)][Math.floor(cols / 5) * 4];

        this.start.setIcon("img/start.png");
        this.start.obstacle = false;
        this.start.start = true;

        this.end.obstacle = false;
        this.end.setIcon("img/end.png");
        this.end.node.style.backgroundSize = "calc(100% - 5px)";
        this.end.end = true;

        // this.place = null;

        this.targets = [this.start, this.end];

        this.addAllEventListeners();
        this.addStartDragEventListeners();
        this.addEndDragEventListeners();

        this.root.style.width = this.w + "px";
        this.root.style.height = this.h + "px";

        // this.boundMouseEnterEventFunctionStart = this.nodeMouseEnterEventFunctionStart.bind(this);
        // this.boundMouseEnterEventFunctionEnd = this.nodeMouseEnterEventFunctionEnd.bind(this);

        this.currentAlgo = null
    }

    setAlgo(algo) {
        this.currentAlgo = algo;
    }

    addStop() {
        // this.place = this.nodes[Math.floor(rows / 2)][Math.floor(cols / 5)]
    }

    addAllEventListeners() {
        this.root.addEventListener("mousedown", (e) => {
            e.preventDefault();
            this.addEventListeners();
        });

        this.root.addEventListener("mouseup", (e) => {
            e.preventDefault();
            this.removeEventListeners();
        });

        for (let i = 0; i < this.nodes.length; i++) {
            for (let x = 0; x < this.nodes[i].length; x++) {
                if (!this.nodes[i][x].start && !this.nodes[i][x].end) this.nodes[i][x].node.addEventListener("click", this.setAsObstacle);
            }
        }
    }

    addEventListeners() {
        if (this.drawing) {
            for (let i = 0; i < this.nodes.length; i++) {
                for (let x = 0; x < this.nodes[i].length; x++) {
                    if (!this.nodes[i][x].start && !this.nodes[i][x].end) {
                        // this.nodes[i][x].node.addEventListener("mouseenter", this.setAsObstacle);
                        this.nodes[i][x].node.addEventListener("mouseleave", this.setAsObstacle);
                    }
                }
            }
        }
    }

    removeEventListeners() {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let x = 0; x < this.nodes[i].length; x++) {
                if (!this.nodes[i][x].start && !this.nodes[i][x].end) {
                    // this.nodes[i][x].node.removeEventListener("mouseenter", this.setAsObstacle);
                    this.nodes[i][x].node.removeEventListener("mouseleave", this.setAsObstacle);
                }
            }
        }
    }

    // Start node
    addStartDragEventListeners() {
        let grid = this;
        this.start.node.addEventListener('mousedown', this.startNodeMouseDownEventFunction);
        for (let node of this.getAllNodes()) node.addEventListener('mouseup', this.removeStartNeighboursEnterExitListener);
    }

    startNodeMouseDownEventFunction(e) {
        this.pgrid.drawing = false;
        startMouseDown = true;
        this.pgrid.start.node.addEventListener("mouseleave", grid.onStartDrag);
        this.pgrid.addStartNeighboursEnterExitListener(e);
    }

    onStartDrag(e) {
        this.pgrid.drawing = false;
    }

    addStartNeighboursEnterExitListener(e) {
        for (let node of this.getAllNodes()) {
            node.addEventListener('mouseenter', node.pgrid.startNeighbourEnterListener);
            node.addEventListener('mouseleave', node.pgrid.startNeighbourExitListener);
        }
    }

    startNeighbourEnterListener(e) {
        if (!this.obj.end && drawing && startMouseDown) {

            let pstart = this.pgrid.start;
            // pstart.setColour("Red");
            pstart.start = false;
            this.obj.start = true;
            if (pstart.wasWall) {
                pstart.setWall();
                pstart.wasWall = false;
            }
            this.pgrid.start.start = false;
            this.obj.start = true;
            this.obj.setIcon("img/start.png");
            this.pgrid.start.removeIcon();
            pstart.node.removeEventListener('mousedown', this.pgrid.startNodeMouseDownEventFunction);
            this.pgrid.start = this.obj;
            if (this.obj.obstacle) {
                this.obj.removeWall();
                this.obj.wasWall = true;
            }
            this.pgrid.targets[0] = this.pgrid.start;
            for (let node of this.pgrid.getAllNodes()) node.removeEventListener('mouseup', this.pgrid.removeStartNeighboursEnterExitListener);
            this.pgrid.addStartDragEventListeners();
            if (this.pgrid.currentAlgo) this.pgrid.currentAlgo(this.pgrid.start, this.pgrid.end, 0);
        }
    }

    removeStartNeighboursEnterExitListener(e) {
        this.pgrid.drawing = true;
        drawing = true;
        startMouseDown = false;
        for (let neighbour of this.pgrid.getAllNodes()) {
            neighbour.removeEventListener('mouseenter', this.pgrid.startNeighbourEnterListener);
            neighbour.removeEventListener('mouseleave', this.pgrid.startNeighbourExitListener);
        }
    }

    // end node

    addEndDragEventListeners() {
        let grid = this;
        this.end.node.addEventListener('mousedown', this.endNodeMouseDownEventFunction);
        for (let node of this.getAllNodes()) node.addEventListener('mouseup', this.removeEndNeighboursEnterExitListener);
    }

    endNodeMouseDownEventFunction(e) {
        this.pgrid.drawing = false;
        this.pgrid.end.node.addEventListener("mouseleave", grid.onEndDrag);
        this.pgrid.addEndNeighboursEnterExitListener(e);
    }

    onEndDrag(e) {
        this.pgrid.drawing = false;
    }

    addEndNeighboursEnterExitListener(e) {
        for (let node of this.getAllNodes()) {
            node.addEventListener('mouseenter', this.endNeighbourEnterListener);
            node.addEventListener('mouseleave', this.endNeighbourExitListener);
        }
    }

    endNeighbourEnterListener(e) {
        if (!this.obj.start && drawing) {
            let pend = this.pgrid.end;
            if (pend.wasWall) {
                pend.setWall();
                pend.wasWall = false;
            }
            pend.end = false;
            this.obj.end = true;
            this.obj.setIcon("img/end.png");
            this.pgrid.end.removeIcon();
            pend.node.removeEventListener('mousedown', this.pgrid.endNodeMouseDownEventFunction);
            for (let node of this.pgrid.getAllNodes()) node.removeEventListener('mouseup', this.pgrid.removeEndNeighboursEnterExitListener);
            this.pgrid.end = this.obj;
            if (this.obj.obstacle) {
                this.obj.removeWall();
                this.obj.wasWall = true;
            }
            this.pgrid.targets[1] = this.pgrid.end;
            this.pgrid.addEndDragEventListeners();
            if (this.pgrid.currentAlgo) this.pgrid.currentAlgo(this.pgrid.start, this.pgrid.end, 0);
        }
    }

    removeEndNeighboursEnterExitListener(e) {
        this.pgrid.drawing = true;
        for (let neighbour of this.pgrid.getAllNodes()) {
            neighbour.removeEventListener('mouseenter', this.pgrid.endNeighbourEnterListener);
        }
    }

    resetPath() {
        for (let node of this.getAllNodes()) {
            node.obj.removeColor();
            node.obj.f = 0;
            node.obj.h = 0;
            node.obj.g = 0;
            node.obj.visited = false;
            node.obj.previous = null;
        }
    }

    replaceELement(arr, a, b) {
        let indexN = 0;
        let indexR = 0;

        for (let row of arr) {
            for (let node of row) {
                if (node === a) {
                    indexN = row.indexOf(node);
                    indexR = arr.indexOf(row);
                }
            }
        }

        if (indexN >= 0 && indexR >= 0) {
            arr[indexR][indexN] = b;
        } else {
            console.log(indexN);

            throw Error("No Such Element in array");
        }
    }

    setAsObstacle(e) {
        // console.log(e.target.obj.start);
        if (!e.target.obj.start && !e.target.obj.end && this.pgrid.drawing) {
            e.target.obj.setObstacle();
            e.target.obj.animate();
        }
    }

    addNodeN() {
        for (let i = 0; i < this.rows; i++) {
            for (let x = 0; x < this.cols; x++) {
                this.nodes[i][x].addNeighbours(this);
            }
        }
    }

    addNodeMN() {
        for (let i = 0; i < this.rows; i++) {
            for (let x = 0; x < this.cols; x++) {
                this.nodes[i][x].addMNeighbours(this);
            }
        }
    }

    addNodeMW() {
        for (let i = 0; i < this.rows; i++) {
            for (let x = 0; x < this.cols; x++) {
                this.nodes[i][x].addMWalls(this);
            }
        }
    }

    getAllNodes() {
        let all = [];
        for (let row of this.nodes) {
            for (let node of row) {
                all.push(node.node);
            }
        }
        return all;
    }

    findNode(DOM) {
        for (let row of this.nodes) {
            for (let node of row) {
                if (node.node === DOM) {
                    return node;
                }
            }
        }
    }

    completed() {
        this.start.setIcon("img/start.png");
        this.end.setIcon("img/end.png");
        this.drawing = true;
        drawing = true
        // for (let row of this.nodes) {
        //     for (let node of row) {
        //         // node.g = 0;
        //         // node.f = 0;
        //         // node.h = 0;
        //     }
        // }
    }

    invert() {
        for (let row of this.nodes) {
            for (let node of row) {
                if (!node.start && !node.end) node.invert();
            }
        }
    }

    getCurrentNode(x, y) {
        for (let row of this.nodes) {
            for (let node of row) {
                let [cx, cy] = node.getAbsolutePosition();
                if (cx < x && cx + this.nodeWidth > x && cy < y && cy + this.nodeHeight > y) {
                    return node;
                }
            }
        }
        return null;
    }

    clearBoard() {
        for (let row of this.nodes) {
            for (let node of row) {
                node.removeWall();
                node.removeColor();
            }
        }
    }
}
