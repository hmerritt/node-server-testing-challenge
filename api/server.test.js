const request = require("supertest");
const server = require("./server");

describe("server", () => {
    describe("GET :/", () => {
        it("should return 200", async () => {
            const res = await request(server).get("/items");
            expect(res.status).toBe(200);
        });
    });
});
