
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    getById,
    remove,
    add,
    update
};

async function query(filterBy = {}) {
    console.log('service', filterBy)
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('attack');
    try {
        const attacks = await collection.find(criteria).toArray();
        console.log(attacks.length);
        return attacks;
    } catch (err) {
        console.log('ERROR: cannot find attacks');
        throw err;
    }
}

async function getById(attackId) {
    const collection = await dbService.getCollection('attack');
    try {
        const attack = await collection.findOne({ '_id': ObjectId(attackId) });
        return attack;
    } catch (err) {
        console.log(`ERROR: cannot find attack ${attackId}`);
        throw err;
    }
}

async function remove(attackId) {
    const collection = await dbService.getCollection('attack');
    try {
        await collection.deleteOne({ _id: ObjectId(attackId) });
    } catch (err) {
        console.log(`ERROR: cannot remove attack ${attackId}`);
        throw err;
    }
}

async function update(attack) {
    const collection = await dbService.getCollection('attack');
    const id = new ObjectId(attack._id);
    attack._id = id;
    try {
        await collection.updateOne({ _id: ObjectId(attack._id) }, { $set: attack });
        return attack;
    } catch (err) {
        console.log(`ERROR: cannot update attack ${attack._id}`);
        throw err;
    }
}

async function add(attack) {
    attack.createdAt = Date.now()
    const collection = await dbService.getCollection('attack');
    try {

        await collection.insertOne(attack);
        return attack;
    } catch (err) {
        console.log(`ERROR: cannot insert attack`);
        throw err;
    }
}


function _buildCriteria(filterBy) {
    if (filterBy.name && filterBy.description) return {
        "$and": [
            { "objects.name": { $regex: filterBy.name, $options: 'i' } },
            { "objects.description": { $regex: filterBy.description, $options: 'i' } }
        ]
    }
    else if (filterBy.description) return { "objects.description": { $regex: filterBy.description, $options: 'i' } }
    else if (filterBy.name) return { "objects.name": { $regex: filterBy.name, $options: 'i' } }

    else return {};
}
