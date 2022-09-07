import { RastreioEvent } from 'rastreio-correios/dist/interfaces/rastreio'
import { IOrderEvents } from '../models/order.model'
import { tracking } from '../services/correios/tracking'
import { IOrderSchema } from './fillNewOrder'
import { fillOrderEvents } from './fillOrderEvents'

interface updateOrderEventDTO {
  events: IOrderEvents[]
  delivered: boolean
  packageType: string
}

const updateOrderEvent = async (
  order: IOrderSchema
): Promise<updateOrderEventDTO | undefined> => {
  const [trackingData] = await tracking(order.trackingCode)
  if (!trackingData.sucesso) return

  const orderEvents = fillOrderEvents(trackingData.eventos as RastreioEvent[])

  const orderWithoutUpdates =
    orderEvents.length && orderEvents.length <= order.events.length
  if (orderWithoutUpdates) return

  return {
    events: orderEvents,
    delivered: trackingData.entregue ? true : false,
    packageType: trackingData.type || 'Não identificado',
  }
}

export { updateOrderEvent }
