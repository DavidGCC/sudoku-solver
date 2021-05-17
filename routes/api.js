'use strict';

const router = require('express').Router();
const SudokuSolver = require('../controllers/sudoku-solver.js');
const solver = new SudokuSolver();

const { allFieldValidator, placementValidator, puzzleValidator } = require("../middlewares/validatorMiddleware");

// SOLVE endpoint










// CHECK endpoint

router.post("/check", allFieldValidator, puzzleValidator, placementValidator, (req, res) => {
    const { puzzle, coordinate, value } = req.body;
    const checkRow = solver.checkRowPlacement(puzzle, coordinate[0], coordinate[1], value);
    const checkCol = solver.checkColPlacement(puzzle, coordinate[0], coordinate[1], value);
    const checkReg = solver.checkRegionPlacement(puzzle, coordinate[0], coordinate[1], value);
    const conflict = [checkRow.conflict, checkCol.conflict, checkReg.conflict].filter(c => c && 1);
    if (conflict.length >= 1) {
        res.json({
            valid: false,
            conflict
        });
        return;
    }
    res.json({
        valid: true
    });
});


module.exports = router;