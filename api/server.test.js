const request = require("supertest");
const server = require("./server");

// Test data
const testDb = [
    { id: 1, name: "pen" },
    { id: 2, name: "rubber" },
    { id: 3, name: "laptop" },
];

describe("server", () => {
    describe("GET /items", () => {
        it("returns HTTP 200", async () => {
            const res = await request(server).get("/items");
            expect(res.status).toBe(200);
        });

        it("returns JSON type", async () => {
            const res = await request(server).get("/items");
            expect(res.type).toBe("application/json");
        });

        it("returns default db items", async () => {
            const res = await request(server).get("/items");
            expect(res.body).toEqual(testDb);
            expect(res.body.length).toBe(3);
        });
    });

    describe("GET /items/:id", () => {
        it("returns HTTP 200", async () => {
            const res = await request(server).get("/items/1");
            expect(res.status).toBe(200);
        });

        it("returns expected item /1", async () => {
            const res = await request(server).get("/items/1");
            expect(res.body).toEqual(testDb[0]);
        });
        it("returns expected item /3", async () => {
            const res = await request(server).get("/items/3");
            expect(res.body).toEqual(testDb[2]);
        });

        it("returns error message for invalid item", async () => {
            const res = await request(server).get("/items/404");
            expect(res.body.message).toEqual("Somthing went wrong");
        });
    });
});
