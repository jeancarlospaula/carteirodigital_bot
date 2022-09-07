import { Chat } from 'telegraf-ts'
import { UserRepository, OrderRepository } from '../repositories'

const User = new UserRepository()
const Order = new OrderRepository()

class UsersController {
  static async delete(chat: Chat): Promise<void> {
    const user = await User.findOne({ chatId: chat.id }, '_id')

    await Order.findAndDelete({ user })
    await User.findOneAndDelete({ _id: user?._id })
  }
}

export { UsersController }
