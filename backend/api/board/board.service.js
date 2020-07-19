
const dbService = require('../../services/db.service')
// const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    // getByEmail,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy)
    // var prop = (filterBy.sort === 'price') ? 'price' : 'name';
    // var order = (filterBy.order === 'desc') ? -1 : 1;
    // var sortBy = {[prop]: order}
    const collection = await dbService.getCollection('board')
    try {
        // const boards = await collection.find(criteria).sort(sortBy).toArray();
        return await collection.find().toArray();
    } catch (err) {
        console.log('ERROR: cannot find boards')
        throw err;
    }
}

async function getById(boardId) {
    console.log('boardId:',boardId)
    const collection = await dbService.getCollection('board')
    try {
        const board = await collection.findOne({"_id":ObjectId(boardId)})
        // delete user.password

        // user.givenReviews = await reviewService.query({byUserId: ObjectId(user._id) })
        // user.givenReviews = user.givenReviews.map(review => {
        //     delete review.byUser
        //     return review
        // })


        return board
    } catch (err) {
        console.log(`ERROR: while finding board ${boardId}`)
        throw err;
    }
}
// async function getByEmail(email) {
//     const collection = await dbService.getCollection('user')
//     try {
//         const user = await collection.findOne({email})
//         return user
//     } catch (err) {
//         console.log(`ERROR: while finding user ${email}`)
//         throw err;
//     }
// }

async function remove(boardId) {
    const collection = await dbService.getCollection('board')
    try {
        await collection.deleteOne({"_id":ObjectId(boardId)})
    } catch (err) {
        console.log(`ERROR: cannot remove board: ${boardId}`)
        throw err;
    }
}

async function update(board) {
    const collection = await dbService.getCollection('board')
    board._id = ObjectId(board._id);

    try {
        await collection.replaceOne({"_id":board._id}, {$set : board})
        return board
    } catch (err) {
        console.log(`ERROR: cannot update board ${board._id}`)
        throw err;
    }
}

async function add(board) {
    const collection = await dbService.getCollection('board')
    try {
        await collection.insertOne(board);
        return board;
    } catch (err) {
        console.log(`ERROR: cannot insert board`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    

    if (filterBy.name) {
        var filterName = new RegExp(filterBy.name, 'i');
        criteria.name = {$regex: filterName}
    }
    // if (filterBy.name) criteria.name = {'$regex': `.*${filterBy.name}.*\i`}
    if (filterBy.type !== 'all') criteria.type = filterBy.type
    if (filterBy.inStock !== 'all'){
        criteria.inStock = (filterBy.inStock === 'inStock') ? true : false
    } 
    return criteria;
}


