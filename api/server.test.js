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
            expect(res.status).toBe(400);
            expect(res.body.message).toEqual("key does not exist in db: 404");
        });
    });

    describe("POST /items", () => {
        it("returns HTTP 400 on malformed request", async () => {
            const res = await request(server).post("/items");
            expect(res.status).toBe(400);
            expect(res.body.message).toEqual(
                "missing post data { name: 'your item here' }"
            );
        });

        it("returns new item added to db", async () => {
            const res = await request(server)
                .post("/items")
                .send({ name: "new-item" });
            expect(res.status).toBe(200);
            expect(res.body.id).toBe(4);
            expect(res.body.name).toEqual("new-item");
        });

        it("adds new item to db", async () => {
            const res = await request(server)
                .post("/items")
                .send({ name: "new-item" });
            const resAll = await request(server).get("/items");
            expect(resAll.body[4]).toEqual({ id: 5, name: "new-item" });
        });
    });

    describe("DELETE /items/:id", () => {
        it("returns HTTP 400 on malformed request", async () => {
            const res = await request(server).delete("/items/404");
            expect(res.status).toBe(400);
            expect(res.body.message).toEqual("key does not exist in db: 404");
        });

        it("returns deleted item from db", async () => {
            const res = await request(server).delete("/items/1");
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                id: 1,
                name: "pen",
            });
        });

        it("deletes item from db", async () => {
            const res = await request(server).delete("/items/2");
            const resAll = await request(server).get("/items");
            const item = resAll.body.find((item) => item.id === 2);
            expect(item).toBeUndefined();
        });
    });
});
