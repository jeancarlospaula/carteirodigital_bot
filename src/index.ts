import dotenv from 'dotenv'
dotenv.config()

import cron from 'node-cron'
import { Telegraf } from 'telegraf-ts'
import { connectDB } from './database/connection/connectDB'
import { BotController, OrdersController } from './controllers'

const bot = new Telegraf(process.env.BOT_TOKEN as string)

const start = async (): Promise<void> => {
  await connectDB()
  console.log('Bot running')

  bot.start(async (ctx) => BotController.start({ ctx, type: 'START' }))

  bot.on('message', async (ctx) => BotController.message(ctx))
  bot.action('start', (ctx) => BotController.start({ ctx, type: 'START' }))
  bot.action('restart', (ctx) => BotController.start({ ctx, type: 'RESTART' }))
  bot.action('acceptedTerms', async (ctx) => BotController.acceptedTerms(ctx))
  bot.action('rejectedTerms', async (ctx) => BotController.rejectedTerms(ctx))

  bot.launch()

  // Job run at every 1 minutes
  cron.schedule('*/1 * * * *', async () => {
    console.log(`Job started at ${new Date().toISOString()}`)
    await OrdersController.updateAndNotify()
    console.log(`Job Finished at ${new Date().toISOString()}`)
  })
}

start()
