import { Telegraf } from 'telegraf-ts'
const bot = new Telegraf(process.env.BOT_TOKEN as string)

export interface NotifyTelegramDTO {
  chatId: string
  message: string
}

const notifyTelegram = async ({
  chatId,
  message,
}: NotifyTelegramDTO): Promise<void> => {
  await bot.telegram
    .sendMessage(chatId, message, { parse_mode: 'Markdown' })
    .then((_) => console.log(`Notification sent to chat ${chatId}`))
    .catch((error: Error) => {
      console.log(`Error sending notification to chat ${chatId}`)
      throw error
    })
}

export { notifyTelegram }
