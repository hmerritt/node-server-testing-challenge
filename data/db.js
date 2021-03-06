const db = [
    { id: 1, name: "pen" },
    { id: 2, name: "rubber" },
    { id: 3, name: "laptop" },
];

function itemExists(key) {
    const found = get(key);
    if (!found) return false;
    return true;
}

function getAll() {
    return db;
}

function get(key) {
    return db.find((item) => item.id === key);
}

function add(obj) {
    let id = 1;
    if (db.length > 0) id = db[db.length - 1].id + 1;
    return db.push({ id: id, ...obj });
}

function remove(key) {
    const index = db.findIndex((item) => item.id === key);
    return db.splice(index, 1);
}

module.exports = { db, itemExists, getAll, get, add, remove };
