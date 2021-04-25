const express = require('express')
const { addAttack, getAttackById, getAttacks, deleteAttack, updateAttack } = require('./attack.controller')
const router = express.Router()

module.exports = router;
router.get('/', getAttacks);
router.delete('/:id', deleteAttack);
router.get('/:id', getAttackById);
router.post('/', addAttack);
router.put('/:id', updateAttack);