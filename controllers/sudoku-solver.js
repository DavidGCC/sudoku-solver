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

    validateCoord(row, column) {
        if (!/^[A-I]$/.test(row) || !/^[1-9]$/.test(column)) {
            return { valid: false, message: "Invalid coordinate" };
        }
        return { valid: true, message: "valid coordinate"};
    }

    validateValue(value) {
        if (!/^[1-9]$/.test(value)) {
            return { valid: false, message: "Invalid value" };
        }
        return { valid: true, message: "valid value" };
    }

    validateColRowVal(puzzleString, row, column, value) {
        const validate = this.validate(puzzleString);
        column = String(column);
        value = String(value);
        if (!validate.valid) {
            return validate;
        }
        const validateCoord = this.validateCoord(row, column);
        const validateValue = this.validateValue(value);
        if (!validateValue.valid) return validateValue;
        if (!validateCoord.valid) return validateCoord;
        return { valid: true, message: "valid row col and value" };
    }

    checkRowPlacement(puzzleString, row, column, value) {
        const validate = this.validateColRowVal(puzzleString, row, column, value);
        column = String(column);
        value = String(value);
        if (!validate.valid) return validate;
        const rowString = puzzleString.substr(9 * (row.charCodeAt(0) - 65), 9);
        if (rowString.includes(value) && rowString[Number(column) - 1] !== value) {
            return { valid: false, conflict: "row" }
        }
        return { valid: true, conflict: null }
    }

    checkColPlacement(puzzleString, row, column, value) {
        const validate = this.validateColRowVal(puzzleString, row, column, value);
        column = String(column);
        value = String(value);
        if (!validate.valid) return validate;
        let colString = "";
        for (let i = 0; i < 9; i++) {
            colString += puzzleString[Number(column) - 1 + 9 * i];
        }
        if (colString.includes(value) && colString[Number(row.charCodeAt(0) - 65)] !== value) {
            return { valid: false, conflict: "column" }
        }
        return { valid: true, conflict: null }
    }

    checkRegionPlacement(puzzleString, row, column, value) {
        const validate = this.validateColRowVal(puzzleString, row, column, value);
        value = String(value);
        column = String(column - 1);
        row = row.charCodeAt(0) - 65;
        if (!validate.valid) return validate;
        let regionString = "";
        for (let i = 0; i < 3; i++) {
            const colIterator = Number(column) - Number(column) % 3;
            const rowIterator = (Number(row) - Number(row) % 3) + i * 9;
            regionString += puzzleString[colIterator + rowIterator] + puzzleString[colIterator + rowIterator + 1] 
            + puzzleString[colIterator + rowIterator + 2];
        }
        if (regionString.includes(value) && regionString[Number(column) % 3 + Number(row) % 3 * 3] !== value) {
            return { valid: false, conflict: "region" }
        }
        return { valid: true, conflict: null };
    }

    checkInput(puzzleString, row, column, value) {
        const valRow = this.checkRowPlacement(puzzleString, row, column, value);
        const valCol = this.checkColPlacement(puzzleString, row, column, value);
        const valReg = this.checkRegionPlacement(puzzleString, row, column, value);
        if (!valRow.valid || !valCol.valid || !valReg.valid) {
            return false;
        }
        return true;
    }

    rowToIndex(row) {
        return row.charCodeAt(0) - 65;
    }

    solve(puzzleString) {
        
    }
}

module.exports = SudokuSolver;

