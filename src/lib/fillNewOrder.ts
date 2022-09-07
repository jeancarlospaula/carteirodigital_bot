import { RastreioEvent } from 'rastreio-correios/dist/interfaces/rastreio'
import { IOrderEvents } from '../models/order.model'
import { fillOrderEvents } from './fillOrderEvents'

interface IFillNewOrder {
  userId: string
  events: RastreioEvent[]
  trackingCode: string
  delivered: boolean
  packageType: string
}

export interface IOrderSchema {
  trackingCode: string
  user: string
  events: IOrderEvents[]
  notificationSent: boolean
  delivered: boolean
  packageType: string
}

const fillNewOrder = ({
  userId,
  events,
  trackingCode,
  delivered = false,
  packageType,
}: IFillNewOrder): IOrderSchema => {
  const orderEvents = fillOrderEvents(events)

  const newOrder: IOrderSchema = {
    trackingCode,
    user: userId,
    events: orderEvents,
    notificationSent: true,
    delivered,
    packageType: packageType || 'Não identificado',
  }

  return newOrder
}

export { fillNewOrder }
