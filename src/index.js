require('dotenv').config()
const cron = require('node-cron')
const { Telegraf } = require('telegraf')
const { connectDB } = require('../src/database/connection/connectDB.js')
const BotController = require('./controllers/Bot.controller.js')
const OrdersController = require('./controllers/Orders.controller')

const bot = new Telegraf(process.env.BOT_TOKEN)

const start = async () => {
  await connectDB()
  console.log('Bot running')

  bot.start(async (ctx) => BotController.start({ ctx, type: 'START' }))

  bot.on('message', async (ctx) => BotController.message(ctx))
  bot.action('start', (ctx) => BotController.start({ ctx, type: 'START' }))
  bot.action('restart', (ctx) => BotController.start({ ctx, type: 'RESTART' }))
  bot.action('acceptedTerms', async (ctx) => BotController.acceptedTerms(ctx))
  bot.action('rejectedTerms', async (ctx) => BotController.rejectedTerms(ctx))

  bot.launch()

  // Job run at every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    console.log(`Job started at ${new Date().toISOString()}`)
    await OrdersController.updateAndNotify()
    console.log(`Job Finished at ${new Date().toISOString()}`)
  })
}

start()
