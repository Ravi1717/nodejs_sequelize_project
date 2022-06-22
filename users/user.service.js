const config = require('config.json');
const db = require('_helpers/db');


module.exports = {
    create
}

async function create(params) {
    await db.User.create(params);
}