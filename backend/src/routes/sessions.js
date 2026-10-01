// src/routes/sessions.js
const express = require('express')
const prisma = require('../prismaClient')
const { requireAuth, requireAdmin } = require('../middleware/auth')
const { getCostSplit } = require('../services/costSplit')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const sessions = await prisma.session.findMany({
      where: { status: { in: ['OPEN', 'FULL'] } },
      orderBy: { startTime: 'asc' },
      include: { _count: { select: { registrations: { where: { status: 'CONFIRMED' } } } } }
    })
    res.json(sessions)
  } catch (err) { next(err) }
})

router.post('/', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const { title, location, startTime, endTime, capacity, costPerPerson } = req.body
    const session = await prisma.session.create({
      data: { title, location, startTime: new Date(startTime), endTime: new Date(endTime), capacity, costPerPerson, hostId: req.user.id }
    })
    res.status(201).json(session)
  } catch (err) { next(err) }
})

router.get('/:id', async (req, res, next) => {
  try {
    const session = await prisma.session.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        registrations: true,
        _count: { select: { registrations: { where: { status: 'CONFIRMED' } } } }
      }
    })
    if (!session) return res.status(404).json({ error: 'Session not found' })
    res.json(session)
  } catch (err) { next(err) }
})

router.patch('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const session = await prisma.session.update({ where: { id: Number(req.params.id) }, data: req.body })
    res.json(session)
  } catch (err) { next(err) }
})

router.delete('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    await prisma.session.update({ where: { id: Number(req.params.id) }, data: { status: 'CANCELLED' } })
    res.status(204).end()
  } catch (err) { next(err) }
})

router.get('/:id/cost', requireAuth, async (req, res, next) => {
  try {
    const split = await getCostSplit(prisma, Number(req.params.id))
    if (!split) return res.status(404).json({ error: 'Session not found' })
    res.json(split)
  } catch (err) { next(err) }
})

module.exports = router