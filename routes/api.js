'use strict';

const router = require('express').Router();
const SudokuSolver = require('../controllers/sudoku-solver.js');
const solver = new SudokuSolver();

// SOLVE endpoint










// CHECK endpoint

router.post("/check", (req, res, next) => {
    const { puzzle, coordinate, value } = req.body;
    if (!puzzle || !coordinate || !value) {
        res.json({
            error: "Required field(s) missing"
        });
        next("missing fields")
    }
    const validatePuzzle = puzzle ? solver.validate(puzzle) : null;
    if (!validatePuzzle?.valid) {
        res.json({
            error: validatePuzzle.message
        });
        next("invalid puzzle");
    }
    const validateValue = value ? solver.validateValue(value) : null;
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
}, (req, res) => {
    console.log("Dd");
});


module.exports = router;