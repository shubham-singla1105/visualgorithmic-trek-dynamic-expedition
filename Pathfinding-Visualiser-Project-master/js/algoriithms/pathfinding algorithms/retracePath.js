
"use strict";
/**
 * reteace the path of the given solved maze
 *
 * @param {Node} lastNode
 * @param {Number} animationTime
 */
function retracePath(lastNode, animationTime) {
    // making a temperory copy of the lastNode node
    let temp = lastNode;
    let path = [temp];
    // while the last node has a previous node push it to the path array
    while (temp.previous != undefined) {
        path.unshift(temp.previous);
        temp = temp.previous;
    }
    // Animate the path
    if (animationTime !== 0) {
        let i = 0;
        console.log(path.length);
        const interval = setInterval(() => {
            // if there is no other node left
            if (i === path.length) {
                clearInterval(interval);
                return;
            }
            // change the direction of the node according to the next node
            if (path[i + 1]) {
                if (path[i + 1].x > path[i].x) path[i].rotate(0);
                if (path[i + 1].x < path[i].x) path[i].rotate(180);
                if (path[i + 1].y > path[i].y) path[i].rotate(90);
                if (path[i + 1].y < path[i].y) path[i].rotate(-90);
            }
            // remove the icon of the previous node and set the icon of the current node
            // path[i].node.style.animation = "0.4s nodeAnimation";
            if (i > 0) path[i - 1].removeIcon();
            path[i].setColour("#ffeb3b", true);
            path[i].setIcon("img/start.png");
            // path[i].node.style.animation = "1s pathAnimation";
            // setTimeout(() => {
            //     path[i].node.style.animation = "";
            // }, 1100);
            grid.completed();
            i++;
        }, animationTime);
    } else {
        let i = 0;
        console.log(path.length);
        while(true) {
            // if there is no other node left
            if (i === path.length) {
                return;
            }
            // change the direction of the node according to the next node
            if (path[i + 1]) {
                if (path[i + 1].x > path[i].x) path[i].rotate(0);
                if (path[i + 1].x < path[i].x) path[i].rotate(180);
                if (path[i + 1].y > path[i].y) path[i].rotate(90);
                if (path[i + 1].y < path[i].y) path[i].rotate(-90);
            }
            // remove the icon of the previous node and set the icon of the current node
            if (i > 0) path[i - 1].removeIcon();
            path[i].setColour("#ffeb3b", true);
            path[i].setIcon("img/start.png");
            i++;
            grid.completed();
        }

    }
}
