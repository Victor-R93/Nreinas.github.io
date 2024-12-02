document.getElementById('queenForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const numQueens = parseInt(document.getElementById('numQueens').value);
    if (numQueens > 8 || numQueens < 1) {
        alert('Por favor, elige un número entre 1 y 8.');
        return;
    }

    const solutions = [];
    const board = Array(numQueens).fill(-1);

    function isSafe(row, col) {
        for (let i = 0; i < row; i++) {
            if (board[i] === col || Math.abs(board[i] - col) === row - i) {
                return false;
            }
        }
        return true;
    }

    function solveNQueens(row) {
        if (row === numQueens) {
            solutions.push([...board]);
            return;
        }

        for (let col = 0; col < numQueens; col++) {
            if (isSafe(row, col)) {
                board[row] = col;
                solveNQueens(row + 1);
                board[row] = -1;
            }
        }
    }

    solveNQueens(0);

    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';
    boardDiv.style.gridTemplateColumns = `repeat(${numQueens}, 40px)`;
    boardDiv.style.gridTemplateRows = `repeat(${numQueens}, 40px)`;

    if (solutions.length > 0) {
        solutions[0].forEach((col, row) => {
            for (let i = 0; i < numQueens; i++) {
                const cell = document.createElement('div');
                cell.className = `cell ${(row + i) % 2 === 0 ? 'white' : 'black'}`;
                if (i === col) cell.textContent = '♛';
                boardDiv.appendChild(cell);
            }
        });

        document.getElementById('solutionCount').textContent = `Número de soluciones encontradas: ${solutions.length}`;
    } else {
        document.getElementById('solutionCount').textContent = 'No hay soluciones disponibles.';
    }
});
