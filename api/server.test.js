const request = require("supertest");
const server = require("./server");

describe("server", () => {
    describe("GET :/", () => {
        it("should return 200", () => {
            return request(server).get("/items")
                .then(res => {
                    expect(res.status).toBe(200);
                })
        });
    });
});
