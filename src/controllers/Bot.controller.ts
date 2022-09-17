import { Chat, Message, TelegrafContext } from 'telegraf-ts'
import { RastreioEvent } from 'rastreio-correios/dist/interfaces/rastreio'

import { fillNewOrder } from '../lib'
import { replyMessages } from './../templates'
import { tracking } from '../services/correios/tracking'
import { getLastUpdateMessage } from '../lib/getLastUpdateMessage'
import { IOrder, IOrderEvents } from '../models/order.model'

import {
  UserRepository,
  OrderRepository,
  TrackedOrdersNumberRepository,
} from '../repositories'

import { UsersController } from './Users.controller'
import { IUser } from '../models/user.model'

const User = new UserRepository()
const Order = new OrderRepository()
const TrackedOrdersNumber = new TrackedOrdersNumberRepository()

interface IStart {
  ctx: TelegrafContext
  type: string
}

class BotController {
  static async start({ ctx, type }: IStart): Promise<Message> {
    const chat = (ctx.update?.message?.chat ||
      ctx.update?.callback_query?.message?.chat) as Chat

    const user = {
      chatId: chat.id.toString(),
      firstName: chat.first_name as string,
      username: chat.username as string,
    }

    try {
      const userExists = await User.findOne(
        { chatId: user.chatId },
        'chatId -_id'
      )

      if (!userExists) {
        await User.insert(user as IUser)
      }

      const isFirstMessage = type === 'START'
      if (isFirstMessage)
        await ctx.replyWithMarkdown(
          replyMessages.welcome(user.firstName as string)
        )

      const buttons = [
        { text: 'ACEITO', callback_data: 'acceptedTerms' },
        { text: 'NÃO ACEITO', callback_data: 'rejectedTerms' },
      ]

      return ctx.replyWithMarkdown(
        replyMessages.acceptTerms(user.firstName as string),
        {
          reply_markup: {
            inline_keyboard: [buttons],
          },
        }
      )
    } catch (error) {
      error instanceof Error
        ? console.log({
            name: error.name,
            message: error.message,
            stack: error.stack,
            data: { chatId: chat.id },
          })
        : console.log(error)

      return ctx.replyWithMarkdown(
        replyMessages.error(user.firstName as string)
      )
    }
  }

  static async message(ctx: TelegrafContext): Promise<Message> {
    const userMessage = ctx.update.message?.text as string
    const chat = (ctx.update.message?.chat ||
      ctx.update.callback_query?.message?.chat) as Chat

    if (['/QUIT', '/quit'].includes(userMessage)) return this.quit(ctx)

    const trackingCode = userMessage
    const user = await User.findOne(
      { chatId: chat.id },
      'acceptedTerms _id firstName chatId'
    )
    try {
      if (!user) {
        return this.start({ ctx, type: 'START' })
      }

      const buttons = [
        { text: 'ACEITO', callback_data: 'acceptedTerms' },
        { text: 'NÃO ACEITO', callback_data: 'rejectedTerms' },
      ]

      if (!user.acceptedTerms) {
        return ctx.replyWithMarkdown(
          replyMessages.acceptTerms(chat.first_name as string),
          {
            reply_markup: {
              inline_keyboard: [buttons],
            },
          }
        )
      }

      const [trackingData] = await tracking([trackingCode])

      if (!trackingData.sucesso) {
        return ctx.replyWithMarkdown(
          replyMessages.invalidCode(trackingCode, chat.first_name as string)
        )
      }

      const isOrderDelivery = trackingData.entregue ? true : false

      const newOrder = fillNewOrder({
        userId: user._id,
        events: trackingData.eventos as RastreioEvent[],
        trackingCode,
        delivered: isOrderDelivery,
        packageType: trackingData.type as string,
      })

      const order = await Order.findOne({ trackingCode, user: user._id })
      if (order) {
        await Order.findByIdAndUpdate(order._id, newOrder)
      } else {
        await Order.insert(newOrder as IOrder)
        await TrackedOrdersNumber.increment()
      }

      const message = getLastUpdateMessage({
        lastEvent: newOrder.events.at(-1) as IOrderEvents,
        trackingCode,
        type: 'MESSAGE',
        firstName: user.firstName,
        delivered: isOrderDelivery,
        packageType: trackingData.type as string,
      })

      return ctx.replyWithMarkdown(message as string)
    } catch (error) {
      error instanceof Error
        ? console.log({
            name: error.name,
            message: error.message,
            stack: error.stack,
            data: { chatId: chat.id },
          })
        : console.log(error)

      return ctx.replyWithMarkdown(
        replyMessages.error(user?.firstName as string)
      )
    }
  }

  static async acceptedTerms(ctx: TelegrafContext): Promise<Message> {
    const chat = (ctx.update.message?.chat ||
      ctx.update.callback_query?.message?.chat) as Chat
    try {
      await User.findOneAndUpdate(
        { chatId: chat.id as number },
        { acceptedTerms: true }
      )
      return ctx.replyWithMarkdown(
        replyMessages.firstCode(chat.first_name as string)
      )
    } catch (error) {
      error instanceof Error
        ? console.log({
            name: error.name,
            message: error.message,
            stack: error.stack,
            data: { chatId: chat.id },
          })
        : console.log(error)

      return ctx.replyWithMarkdown(
        replyMessages.error(chat.first_name as string)
      )
    }
  }

  static async rejectedTerms(ctx: TelegrafContext): Promise<Message> {
    const chat = (ctx.update.message?.chat ||
      ctx.update.callback_query?.message?.chat) as Chat
    try {
      await UsersController.delete(chat)

      const buttons = [{ text: 'RASTREAR ENCOMENDA', callback_data: 'restart' }]

      return ctx.replyWithMarkdown(
        replyMessages.rejectedTerms(chat.first_name as string),
        {
          reply_markup: {
            inline_keyboard: [buttons],
          },
        }
      )
    } catch (error) {
      error instanceof Error
        ? console.log({
            name: error.name,
            message: error.message,
            stack: error.stack,
            data: { chatId: chat.id },
          })
        : console.log(error)

      return ctx.replyWithMarkdown(
        replyMessages.error(chat.first_name as string)
      )
    }
  }

  static async quit(ctx: TelegrafContext): Promise<Message> {
    const chat = (ctx.update.message?.chat ||
      ctx.update.callback_query?.message?.chat) as Chat
    try {
      await UsersController.delete(chat)

      const buttons = [{ text: 'RASTREAR ENCOMENDA', callback_data: 'start' }]

      return ctx.replyWithMarkdown(replyMessages.quit(), {
        reply_markup: {
          inline_keyboard: [buttons],
        },
      })
    } catch (error) {
      error instanceof Error
        ? console.log({
            name: error.name,
            message: error.message,
            stack: error.stack,
            data: { chatId: chat.id },
          })
        : console.log(error)

      return ctx.replyWithMarkdown(
        replyMessages.error(chat.first_name as string)
      )
    }
  }
}

export { BotController }
