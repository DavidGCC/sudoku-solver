const chai = require('chai');
const assert = chai.assert;

const strings = require('../controllers/puzzle-strings');
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

const mainPs = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

suite('UnitTests', () => {

    test("Logic handles a valid puzzle string of 81 characters", () => {
        const res = solver.validate(mainPs);
        assert.deepEqual(res, { valid: true, message: "valid" });
    });

    test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", () => {
        const res = solver.validate("5..91372.3..s8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3");
        assert.deepEqual(res, { message: "Invalid characters in puzzle", valid: false });
    });

    test("Logic handles a puzzle string that is not 81 characters in length", () => {
        const res = solver.validate("5..91372.3..s8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...");
        assert.deepEqual(res, { message: "Expected puzzle to be 81 characters long", valid: false });
    });

    test("Logic handles a valid row placement", () => {
        const res = solver.checkRowPlacement(mainPs, "A", 2, 4);
        assert.deepEqual(res, { valid: true, conflict: null });
    });

    test("Logic handles an invalid row placement", () => {
        const res = solver.checkRowPlacement(mainPs, "A", 2, 5);
        assert.deepEqual(res, { valid: false, conflict: "row" });
    });

    test("Logic handles a valid column placement", () => {
        const res = solver.checkColPlacement(mainPs, "A", 2, 1);
        assert.deepEqual(res, { valid: true, conflict: null });
    });

    test("Logic handles an invalid column placement", () => {
        const res = solver.checkColPlacement(mainPs, "A", 2, 2);
        assert.deepEqual(res, { valid: false, conflict: "column" });
    });

    test("Logic handles a valid region (3x3 grid) placement", () => {
        const res = solver.checkRegionPlacement(mainPs, "A", 2, 1);
        assert.deepEqual(res, { valid: true, conflict: null });
    });

    test("Logic handles an invalid region (3x3 grid) placement", () => {
        const res = solver.checkRegionPlacement(mainPs, "A", 2, 2);
        assert.deepEqual(res, { valid: false, conflict: "region" });
    });

    test("Valid puzzle strings pass the solver", () => {
        const res = solver.solve(mainPs);
        assert.isString(res);
        assert.equal(res.length, 81);
        assert.equal(res.includes("."), false);
    });

    test("Invalid puzzle strings fail the solver", () => {
        const res = solver.solve("5..91372.3..s8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3");
        assert.deepEqual(res, { message: "Invalid characters in puzzle", valid: false });
    });

    test("Solver returns the the expected solution for an incomplete puzzle", () => {
        const res = solver.solve("135.6298494.3812577284.96136945178328129367453578241964.3298561.81673429269145378");
        assert.equal(res, "135762984946381257728459613694517832812936745357824196473298561581673429269145378");
    });

});
