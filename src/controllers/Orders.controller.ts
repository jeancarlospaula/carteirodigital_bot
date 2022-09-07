import { OrderRepository, UserRepository } from '../repositories'

import { updateOrderEvent, getLastUpdateMessage } from '../lib'
import { notifyTelegram } from '../services/telegram/notifyTelegram'
import { IOrderEvents } from '../models/order.model'

const Order = new OrderRepository()
const User = new UserRepository()

class OrdersController {
  static async updateAndNotify(): Promise<void> {
    try {
      const orders = await Order.find({ delivered: false })

      if (!orders?.length) return console.log('All orders have been delivered')

      console.log(JSON.stringify(orders, null, 2))

      await Promise.all(
        orders.map(async (order) => {
          let orderId
          let events
          let chatId
          try {
            const user = await User.findById(
              order.user,
              'chatId firstName -_id'
            )
            chatId = user?.chatId as string

            const updatedOrder = await updateOrderEvent(order)

            orderId = order._id
            events = updatedOrder?.events
            if (!events)
              return console.log(
                `Order ${orderId.toString()} has no new updates`
              )

            const lastEvent = events.at(-1) as IOrderEvents

            const isOrderDelivered = updatedOrder?.delivered as boolean

            await notifyTelegram({
              chatId,
              message: getLastUpdateMessage({
                lastEvent,
                trackingCode: order.trackingCode,
                firstName: user?.firstName as string,
                delivered: isOrderDelivered,
                packageType: updatedOrder?.packageType as string,
              }) as string,
            })

            return await Order.findByIdAndUpdate(orderId, {
              events,
              delivered: isOrderDelivered,
              notificationSent: true,
            })
          } catch (error) {
            if (orderId && events) {
              await Order.findByIdAndUpdate(orderId, {
                notificationSent: false,
              })
            }

            error instanceof Error
              ? console.log({
                  name: error.name,
                  message: error.message,
                  stack: error.stack,
                  data: { chatId },
                })
              : console.log(error)
          }
        })
      )
    } catch (error) {
      error instanceof Error
        ? console.log({
            name: error.name,
            message: error.message,
            stack: error.stack,
          })
        : console.log(error)
    }
  }
}

export { OrdersController }
