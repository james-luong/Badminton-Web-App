// src/services/notify.js
const prisma = require('../prismaClient')

async function sendWhatsApp(phone, body) {
  // get phone number in the format required by WAHA 
  const chatId = `${phone.replace(/\D/g, '')}@c.us`
  // send the message via WAHA API
  const res = await fetch(`${process.env.WAHA_URL}/api/sendText`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'X-Api-Key': process.env.WAHA_API_KEY },
    body: JSON.stringify({ 
      chatId, 
      text: body, 
      session: 'default' })
  })
  if (!res.ok) throw new Error(`WAHA send failed: ${res.status} ${await res.text()}`)
}

async function notifyUser(user, session, type) {
  const messages = {
    CONFIRMATION: `You're confirmed for ${session.title} on ${session.startTime.toLocaleDateString()}.`,
    WAITLIST_JOINED: `${session.title} is full — you're on the waitlist.`,
    WAITLIST_PROMOTED: `A spot opened up — you're now confirmed for ${session.title}.`,
    REMINDER: `Reminder: ${session.title} starts tomorrow at ${session.startTime.toLocaleTimeString()}.`,
    FEE_REMINDER: `Reminder: ${session.title} has a fee of $${session.fee} due.`,
    FEE_RECEIVED: `We've received your payment for ${session.title}.`,
    CANCELLATION: `${session.title} has been cancelled.`,
    WITHDRAWAL_REQUEST: `You've requested to withdraw from ${session.title}.`,
    WIDTHDRAWAL_SUCCESS: `You've been withdrawn from ${session.title}.`
  }

  await sendWhatsApp(user.phone, messages[type])
  await prisma.notificationLog.create({ data: { sessionId: session.id, userId: user.id, type } })
}

module.exports = { notifyUser }