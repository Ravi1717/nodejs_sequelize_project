const config = require('config.json');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('_helpers/db');


module.exports = {
    create,
    authenticate
}

async function authenticate({ username, password }) {
    const user = await db.User.scope('withHash').findOne({ where: { username } });

    if (!user || !(await bycrypt.compare(password, user.password)))
        throw 'Username or password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}

async function create(params) {

    //validate
    if(await db.User.findOne({ where: {username: params.username}})){
        throw 'Username "' + params.username + '"is already taken';
    }

    //hash password
    if (params.password){
        params.password = await bycrypt.hash(params.password, 10);
    }

    //save user
    return db.User.create(params);
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}