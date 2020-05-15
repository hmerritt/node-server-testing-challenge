const db = [
    { id: 1, name: "pen" },
    { id: 2, name: "rubber" },
    { id: 3, name: "laptop" },
];

function getAll() {
    return db;
}

function get(key) {
    return db[key];
}

function add(obj) {
    return db.push({ id: (db.length + 1), ...obj });
}

function remove(key) {
    return db.splice(key, 1);
}

module.exports = { getAll, get, add, remove };
