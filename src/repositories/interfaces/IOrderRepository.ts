import { IOrder } from '../../models/order.model'

export interface IOrderRepository {
  insert(data: IOrder): Promise<IOrder>
  findByIdAndUpdate(
    id: string,
    conditions: Object,
    projection?: Object
  ): Promise<IOrder | null>
  findOne(conditions: Object, projection?: Object): Promise<IOrder | null>
  find(conditions: Object, projection?: Object): Promise<IOrder[] | null>
  findAndDelete(conditions: Object): Promise<void>
}
