import { Grid } from "./grid.js";
import { Cell } from "./cell.js";

const gameBoard = document.querySelector(".game-board");

const grid = new Grid(gameBoard);
grid.getRandomSpaceCell().linkCell(new Cell(gameBoard));
grid.getRandomSpaceCell().linkCell(new Cell(gameBoard));

setupInput();

function setupInput() {
    document.addEventListener("keydown", handleInput, { once: true });
}

function handleInput(event) {
    switch (event.code) {
        case "ArrowUp":
            if (!canMoveUp()) {
                return setupInput();
            }
            moveUp();
            break;

        case "ArrowDown":
            if (!canMoveDown()) {
                return setupInput();
            }
            moveDown();
            break;

        case "ArrowLeft":
            if (!canMoveLeft()) {
                return setupInput();
            }
            moveLeft();
            break;

        case "ArrowRight":
            if (!canMoveRight()) {
                return setupInput();
            }
            moveRight();
            break;

        default:
            return setupInput();
    }

    grid.getRandomSpaceCell().linkCell(new Cell(gameBoard));

    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
        alert("Game Over, try again!");
    }

    setupInput();
}

function moveUp() {
    slideCells(grid.cellsByColumn);
}

function moveDown() {
    slideCells(grid.cellsByColumnReverse);
}

function moveLeft() {
    slideCells(grid.cellsByRows);
}

function moveRight() {
    slideCells(grid.cellsByRowsReverse);
}

function slideCells(groupedCells) {
    groupedCells.forEach((element) => {
        slideCellsInGroup(element);
    });

    grid.spaceCells.forEach((cell) => {
        if (cell.hasCellToMerge()) {
            cell.mergeCells();
        }
    });
}

function slideCellsInGroup(group) {
    for (let i = 1; i < group.length; i++) {
        if (group[i].isEmpty()) {
            continue;
        }
        const cellToMove = group[i];

        let targetCell;
        let j = i - 1;
        while (j >= 0 && group[j].canAccept(cellToMove.linkedCell)) {
            targetCell = group[j];
            j--;
        }

        if (!targetCell) continue;

        if (targetCell.isEmpty()) {
            targetCell.linkCell(cellToMove.linkedCell);
        } else {
            targetCell.linkCellToMerge(cellToMove.linkedCell);
        }

        cellToMove.unlinkCell();
    }
}

function canMoveUp() {
    return canMove(grid.cellsByColumn);
}

function canMoveDown() {
    return canMove(grid.cellsByColumnReverse);
}
function canMoveLeft() {
    return canMove(grid.cellsByRows);
}

function canMoveRight() {
    return canMove(grid.cellsByRowsReverse);
}

function canMove(groupedCells) {
    return groupedCells.some((group) => canMoveInGroup(group));
}

function canMoveInGroup(group) {
    return group.some((cell, index) => {
        if (index === 0) {
            return false;
        }

        if (cell.isEmpty()) {
            return false;
        }

        const targetCell = group[index - 1];
        return targetCell.canAccept(cell.linkedCell);
    });
}
