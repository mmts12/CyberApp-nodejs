
const attackService = require('./attack.service')

module.exports = {
    getAttacks,
    deleteAttack,
    getAttackById,
    addAttack,
    updateAttack
}


async function getAttacks(req, res) {
    const { description,name } = req.query;
    const filterBy = {
        description: description || null,
        name:name||null
    }
    console.log(req.query);

    try {
        // const attack = await attackService.query()
        const attack = await attackService.query(filterBy)
        res.send(attack)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get attack' })
    }
}

async function getAttackById(req, res) {
    try {
        const attack = await attackService.getById(req.params.id)
        res.send(attack)
    }
    catch (err) {
        res.status(500).send({ err: 'Faild to find the attack' })
    }
}

async function deleteAttack(req, res) {
    try {
        await attackService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to delete attack' })
    }
}



async function addAttack(req, res) {
    try {
        var attack = req.body
        review = await attackService.add(attack)
        res.send(attack)
    }
    catch (err) {
        res.status(500).send({ err: 'Failed to add attack' })
    }
}

async function updateAttack(req, res) {
    try {
        var attack = req.body
        review = await attackService.update(attack)
        res.send(attack)
    }
    catch (err) {
        res.status(500).send({ err: 'Failed to add attack' })
    }
}

