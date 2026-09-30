// src/services/costSplit.js
async function getCostSplit(prisma, sessionId) {
  const session = await prisma.session.findUnique({ where: { id: sessionId } })
  if (!session) return null

  const confirmedCount = await prisma.registration.count({ where: { sessionId, status: 'CONFIRMED' } })
  const plannedTotal = Number(session.costPerPerson) * session.capacity
  const perPerson = confirmedCount > 0 ? plannedTotal / confirmedCount : Number(session.costPerPerson)

  return { plannedTotal, confirmedCount, perPerson: Math.round(perPerson * 100) / 100 }
}

module.exports = { getCostSplit }