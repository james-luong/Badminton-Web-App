// routes/registrations.js
const express = require('express')
const prisma = require('../prismaClient')
const { requireAuth } = require('../middleware/auth')
const { notifyUser } = require('../services/notify')

const router = express.Router()

router.post('/sessions/:id/register', requireAuth, async (req, res, next) => {
  try {
    const sessionId = Number(req.params.id)
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { _count: { select: { registrations: { where: { status: 'CONFIRMED' } } } } }
    })
    if (!session) return res.status(404).json({ error: 'Session not found' })

    const isFull = session._count.registrations >= session.capacity
    const registration = await prisma.registration.create({
      data: {
        sessionId,
        userId: req.user.id,
        status: isFull ? 'WAITLISTED' : 'CONFIRMED',
        waitlistPosition: isFull
          ? (await prisma.registration.count({ where: { sessionId, status: 'WAITLISTED' } })) + 1
          : null
      }
    })

    await notifyUser(req.user, session, isFull ? 'WAITLIST_JOINED' : 'CONFIRMATION')
    res.status(201).json(registration)
  } catch (err) { next(err) }
})

router.delete('/sessions/:id/register', requireAuth, async (req, res, next) => {
  try {
    const sessionId = Number(req.params.id)
    const mine = await prisma.registration.findUnique({
      where: { sessionId_userId: { sessionId, userId: req.user.id } },
      include: { session: true }
    })
    if (!mine) return res.status(404).json({ error: 'No registration found' })

    await prisma.registration.update({
      where: { id: mine.id },
      data: { status: 'CANCELLED', cancelledAt: new Date() }
    })

    if (mine.status === 'CONFIRMED') {
      const next = await prisma.registration.findFirst({
        where: { sessionId, status: 'WAITLISTED' },
        orderBy: { waitlistPosition: 'asc' },
        include: { user: true }
      })
      if (next) {
        await prisma.registration.update({ where: { id: next.id }, data: { status: 'CONFIRMED', waitlistPosition: null } })
        await notifyUser(next.user, mine.session, 'WAITLIST_PROMOTED')
      }
    }
    res.status(204).end()
  } catch (err) { next(err) }
})

module.exports = router
