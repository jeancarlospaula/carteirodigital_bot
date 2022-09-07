import { Order } from '../models'
import { IOrder } from '../models/order.model'
import { IOrderRepository } from './interfaces/IOrderRepository'

class OrderRepository implements IOrderRepository {
  async insert(data: IOrder) {
    const order = new Order(data)
    const newOrder = await order.save()
    return newOrder
  }

  async findByIdAndUpdate(
    id: string,
    conditions: Object,
    projection?: Object
  ): Promise<IOrder | null> {
    const order = await Order.findByIdAndUpdate(id, conditions, projection)
    return order
  }

  async findOne(
    conditions: Object,
    projection?: Object
  ): Promise<IOrder | null> {
    const order = await Order.findOne(conditions, projection)
    return order
  }

  async find(
    conditions: Object,
    projection?: Object
  ): Promise<IOrder[] | null> {
    const orders = await Order.find(conditions, projection)
    return orders
  }

  async findAndDelete(conditions: Object): Promise<void> {
    await Order.deleteMany(conditions)
  }
}

export { OrderRepository }
