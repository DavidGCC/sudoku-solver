const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const ps = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
const solvedPs = "769235418851496372432178956174569283395842761628713549283657194516924837947381625";

suite('Functional Tests', () => {

    suite("/api/solve POST request tests", () => {

        test("Solve a puzzle with valid puzzle string: POST request to /api/solve", (done) => {
            chai.request(server)
                .post("/api/solve")
                .set("Content-Type", "application/json")
                .send({ puzzle: ps })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { solution: solvedPs });
                    assert.equal(res.body.solution.includes("."), false);
                    assert.equal(/^[1-9]{81}$/.test(res.body.solution), true);
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
        }).timeout(10000);

    });

    suite("/api/check POST request tests", () => {

        test("Check a puzzle placement with all fields: POST request to /api/check", (done) => {
            chai.request(server)
                .post("/api/check")
                .set("Content-Type", "application/json")
                .send({ puzzle: ps, coordinate: "A2", value: 6 })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { valid: true });
                    done();
                });
        });

        test("Check a puzzle placement with single placement conflict: POST request to /api/check", (done) => {
            chai.request(server)
                .post("/api/check")
                .set("Content-Type", "application/json")
                .send({ puzzle: ps, coordinate: "A2", value: 1 })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { valid: false, "conflict": ["row"] });
                    done();
                });
        });

        test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check", (done) => {
            chai.request(server)
                .post("/api/check")
                .set("Content-Type", "application/json")
                .send({ puzzle: ps, coordinate: "A2", value: 2 })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { valid: false, conflict: ["column", "region"] });
                    done();
                });
        });

        test("Check a puzzle placement with all placement conflicts: POST request to /api/check", (done) => {
            chai.request(server)
                .post("/api/check")
                .set("Content-Type", "application/json")
                .send({ puzzle: ps, coordinate: "A2", value: 5 })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { valid: false, conflict: ["row", "column", "region"] });
                    done();
                });
        });

        test("Check a puzzle placement with missing required fields: POST request to /api/check", (done) => {
            chai.request(server)
                .post("/api/check")
                .set("Content-Type", "application/json")
                .send({ puzzle: ps, coordinate: "A2" })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { error: "Required field(s) missing" });
                    done();
                });
        });

        test("Check a puzzle placement with invalid characters: POST request to /api/check", (done) => {
            chai.request(server)
                .post("/api/check")
                .set("Content-Type", "application/json")
                .send({ puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.s", coordinate: "A2", value: 6 })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { error: "Invalid characters in puzzle" });
                    done();
                });
        });

        test("Check a puzzle placement with incorrect length: POST request to /api/check", (done) => {
            chai.request(server)
                .post("/api/check")
                .set("Content-Type", "application/json")
                .send({ puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6", coordinate: "A2", value: 6 })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { error: "Expected puzzle to be 81 characters long" });
                    done();
                });
        });

        test("Check a puzzle placement with invalid placement coordinate: POST request to /api/check", (done) => {
            chai.request(server)
                .post("/api/check")
                .set("Content-Type", "application/json")
                .send({ puzzle: ps, coordinate: "S2", value: 6 })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { error: "Invalid coordinate" });
                    done();
                });
        });

        test("Check a puzzle placement with invalid placement value: POST request to /api/check", (done) => {
            chai.request(server)
                .post("/api/check")
                .set("Content-Type", "application/json")
                .send({ puzzle: ps, coordinate: "A2", value: 0 })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { error: "Invalid value" });
                    done();
                });
        });

    });

});

