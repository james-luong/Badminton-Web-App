// prisma/seed.js
const bcrypt = require('bcrypt')
const prisma = require('../src/prismaClient')

const DAY = 24 * 60 * 60 * 1000

async function main() {
  const adminPasswordHash = await bcrypt.hash('AdminPass123!', 10)
  const playerPasswordHash = await bcrypt.hash('PlayerPass123!', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      phone: '0400000001',
      passwordHash: adminPasswordHash,
      role: 'ADMIN'
    }
  })

  const player = await prisma.user.upsert({
    where: { email: 'player@example.com' },
    update: {},
    create: {
      name: 'Alex Player',
      email: 'player@example.com',
      phone: '0400000002',
      passwordHash: playerPasswordHash,
      role: 'PLAYER'
    }
  })

  const sessionsData = [
    {
      title: 'Saturday Social',
      location: 'Community Sports Centre — Courts 1-4',
      startTime: new Date(Date.now() + 3 * DAY + 10 * 60 * 60 * 1000),
      endTime: new Date(Date.now() + 3 * DAY + 12 * 60 * 60 * 1000),
      capacity: 20,
      costPerPerson: 8
    },
    {
      title: 'Beginner Clinic',
      location: 'Westside Badminton Hall',
      startTime: new Date(Date.now() + 5 * DAY + 9 * 60 * 60 * 1000),
      endTime: new Date(Date.now() + 5 * DAY + 10.5 * 60 * 60 * 1000),
      capacity: 12,
      costPerPerson: 5
    },
    {
      title: 'Advanced Ladder Night',
      location: 'Community Sports Centre — Courts 5-6',
      startTime: new Date(Date.now() + 9 * DAY + 19 * 60 * 60 * 1000),
      endTime: new Date(Date.now() + 9 * DAY + 21.5 * 60 * 60 * 1000),
      capacity: 16,
      costPerPerson: 10
    }
  ]

  for (const data of sessionsData) {
    const existing = await prisma.session.findFirst({ where: { title: data.title, hostId: admin.id } })
    if (!existing) {
      await prisma.session.create({ data: { ...data, hostId: admin.id, status: 'OPEN' } })
    }
  }

  console.log('Seed complete:')
  console.log(`  Admin login:  ${admin.email} / AdminPass123!`)
  console.log(`  Player login: ${player.email} / PlayerPass123!`)
  console.log(`  ${sessionsData.length} example sessions ensured`)
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
