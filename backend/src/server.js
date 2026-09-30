// src/server.js
const app = require('./app')
require('./jobs/reminders') // registers the cron schedule as soon as the process starts

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`))