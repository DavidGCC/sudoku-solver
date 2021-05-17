const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const ps = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
const solvedPs = "135762984946381257728459613694517832812936745357824196473298561581673429269145378";

suite('Functional Tests', () => {

    suite("/api/solve POST request tests", () => {

        test("Solve a puzzle with valid puzzle string: POST request to /api/solve", (done) => {
            chai.request(server)
                .post("/api/solve")
                .set("Content-Type", "application/json")
                .send({ puzzle: ps })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { result: solvedPs });
                    assert.equal(res.body.result.includes("."), false);
                    assert.equal(/^[1-9]{81}$/.test(res.body.result), true);
                    done();
                });
        });

        test("Solve a puzzle with missing puzzle string: POST request to /api/solve", (done) => {
            chai.request(server)
                .post("/api/solve")
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { error: "Required field missing" });
                    done();
                });
        });

        test("Solve a puzzle with invalid characters: POST request to /api/solve", (done) => {
            chai.request(server)
                .post("/api/solve")
                .set("Content-Type", "application/json")
                .send({ puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.s" })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { error: "Invalid characters in puzzle" });
                    done();
                });
        });

        test("Solve a puzzle with incorrect length: POST request to /api/solve", (done) => {
            chai.request(server)
                .post("/api/solve")
                .set("Content-Type", "application/json")
                .send({ puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6." })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { error: "Expected puzzle to be 81 characters long" });
                    done();
                });
        });

        test("Solve a puzzle that cannot be solved: POST request to /api/solve", (done) => {
            chai.request(server)
                .post("/api/solve")
                .set("Content-Type", "application/json")
                .send({ puzzle: "...7...92.........2....95..57.3...46.........1...2......2.9.....4....2....8.7...." })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { error: "Puzzle cannot be solved" });
                    done();
                })
        });

    });

    suite("/api/check POST request tests", () => {
        
        test("Solve a puzzle with valid puzzle string: POST request to /api/solve", () => {

        });

        test("Check a puzzle placement with all fields: POST request to /api/check", () => {

        });

        test("Check a puzzle placement with single placement conflict: POST request to /api/check", () => {

        });

        test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check", () => {

        });

        test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check", () => {

        });

        test("Check a puzzle placement with missing required fields: POST request to /api/check", () => {

        });

        test("Check a puzzle placement with invalid characters: POST request to /api/check", () => {

        });

        test("Check a puzzle placement with incorrect length: POST request to /api/check", () => {

        });
        
        test("Check a puzzle placement with incorrect length: POST request to /api/check", () => {

        });

        test("Check a puzzle placement with invalid placement value: POST request to /api/check", () => {

        });

    });

});

