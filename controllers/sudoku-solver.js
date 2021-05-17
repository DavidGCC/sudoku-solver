class SudokuSolver {

    validate(puzzleString) {
        if (puzzleString.length !== 81) {
            return { message: "Expected puzzle to be 81 characters long", valid: false };
        }
        if (!/^[0-9\.]{81}$/.test(puzzleString)) {
            return { message: "Invalid characters in puzzle", valid: false };
        }
        return { message: "valid", valid: true };
    }

    validateColRowVal(row, column, value) {
        const validate = this.validate(puzzleString);
        column = String(column);
        value = String(value);
        if (!validate.valid) {
            return validate;
        }
        if (!/^[A-I]$/.test(row) || !/^[1-9]$/.test(column)) {
            return { valid: false, message: "Invalid coordinate" };
        }
        if (!/^[1-9]$/.test(value)) {
            return { valid: false, message: "Invalid value" };
        }
    }

    checkRowPlacement(puzzleString, row, column, value) {
        column = String(column);
        value = String(value);
        const validate = this.validateColRowVal(row, column, value);
        if (!validate.valid) return validate;
        const rowString = puzzleString.substr(9 * (row.charCodeAt(0) - 65), 9);
        if (rowString.includes(value) && rowString[Number(column) - 1] !== value) {
            return { valid: false, conflict: "row" }
        }
        return { valid: true, conflict: null }
    }

    checkColPlacement(puzzleString, row, column, value) {
        column = String(column);
        value = String(value);
        const validate = this.validateColRowVal(row, column, value);
        if (!validate.valid) return validate;
        let colString = "";
        for (let i = 0; i < 9; i++) {
            colString += puzzleString[Number(value) - 1 + 9 * i];
        }
        if (colString.includes(value) && colString[Number(row.charCodeAt(0) - 65)] !== value) {
            return { valid: false, conflict: "column" }
        }
        return { valid: true, conflict: null }
    }

    checkRegionPlacement(puzzleString, row, column, value) {
        column = String(column - 1);
        value = String(value);
        row = row.charCodeAt(0) - 65;
        const validate = this.validateColRowVal(row, column, value);
        if (!validate.valid) return validate;
        let regionString = "";
        for (let i = 0; i < 3; i++) {
            const colIterator = Number(column) - Number(column) % 3;
            const rowIterator = Number(row) - Number(row) % 3 + i;
            regionString += puzzleString[colIterator + rowIterator] + puzzleString[colIterator + rowIterator + 1] 
                + puzzleString[colIterator + rowIterator + 2];
        }
        if (regionString.includes(value) && regionString[Number(column) % 3 + Number(row) % 3 * 3] !== value) {
            return { valid: false, conflict: "region" }
        }
        return { valid: true, conflict: null };
    }

    solve(puzzleString) {

    }
}

module.exports = SudokuSolver;

