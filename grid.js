import { SpaceCell } from "./spaceCell.js";

const GRID_SIZE = 4;
const CELLS_COUNT = GRID_SIZE ** 2;

export class Grid {
    constructor(gameBoard) {
        this.spaceCells = [];
        this.initSpaceCells(gameBoard);
        this.cellsByColumn = this.groupCellsByColumn();
        this.cellsByColumnReverse = this.cellsByColumn.map((column) =>
            [...column].reverse()
        );
        this.cellsByRows = this.groupCellsByRows();
        this.cellsByRowsReverse = this.cellsByRows.map((row) =>
            [...row].reverse()
        );
    }

    initSpaceCells(gameBoard) {
        for (let i = 0; i < CELLS_COUNT; i++) {
            this.spaceCells.push(
                new SpaceCell(
                    gameBoard,
                    i % GRID_SIZE,
                    Math.floor(i / GRID_SIZE)
                )
            );
        }
    }

    getRandomSpaceCell() {
        const randomSpaceCell = this.spaceCells.filter((spaceCell) =>
            spaceCell.isEmpty()
        );
        const randomIndex = Math.floor(Math.random() * randomSpaceCell.length);
        return randomSpaceCell[randomIndex];
    }

    groupCellsByColumn() {
        return this.spaceCells.reduce((groupedCells, cell) => {
            groupedCells[cell.y] = groupedCells[cell.y] || [];
            groupedCells[cell.y][cell.x] = cell;
            return groupedCells;
        }, []);
    }

    groupCellsByRows() {
        return this.spaceCells.reduce((groupedCells, cell) => {
            groupedCells[cell.x] = groupedCells[cell.x] || [];
            groupedCells[cell.x][cell.y] = cell;
            return groupedCells;
        }, []);
    }
}
