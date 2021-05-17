const SudokuSolver = require("../controllers/sudoku-solver");
const solver = new SudokuSolver();


const allFieldValidator = (req, res, next) => {
    const { puzzle, coordinate, value } = req.body;
    if (!puzzle || !coordinate || typeof value === "undefined") {
        res.json({
            error: "Required field(s) missing"
        });
        next("missing fields")
    }
    next();
}
 
const puzzleValidator = (req, res, next) => {
    const { puzzle } = req.body;
    if (!puzzle) {
        res.json({
            error: "Required field(s) missing"
        });
        next("missing fields");
    }

    const validatePuzzle = puzzle ? solver.validate(puzzle) : null;
    if (!validatePuzzle?.valid) {
        res.json({
            error: validatePuzzle.message
        });
        next("invalid puzzle");
    }
    next();
}

const placementValidator = (req, res, next) => {
    const { coordinate, value } = req.body;
    const validateValue = typeof value !== "undefined" ? solver.validateValue(value) : null;
    if (!validateValue.valid) {
        res.json({
            error: validateValue.message
        });
        next("invalid value");
    }
    const validateCoord = coordinate ? solver.validateCoord(coordinate[0], coordinate[1]) : null;
    if (!validateCoord?.valid) {
        res.json({
            error: validateCoord.message
        });
        next("invalid coordinate")
    }
    next();
}

module.exports = { allFieldValidator, puzzleValidator, placementValidator };