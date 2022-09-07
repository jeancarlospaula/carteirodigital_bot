import { IOrderEvents } from '../models/order.model'
import { getJobMessage } from './getJobMessage'
import { getReplyMessage } from './getReplyMessage'

export interface getLastUpdateMessageDTO {
  lastEvent: IOrderEvents
  trackingCode: string
  firstName: string
  type?: string
  delivered: boolean
  packageType: string
}

export interface IEventMessage {
  status: string
  cityOrigin?: string
  stateOrigin?: string
  typeOrigin?: string
  cityDestiny?: string
  stateDestiny?: string
  typeDestiny?: string
  dateUpdate: string
  timeUpdate: string
  trackingCode: string
  firstName: string
  packageType?: string
}

const getLastUpdateMessage = ({
  lastEvent,
  trackingCode,
  firstName,
  type,
  delivered,
  packageType,
}: getLastUpdateMessageDTO): string | undefined => {
  const event: IEventMessage = {
    status: lastEvent.status,
    cityOrigin: lastEvent.location.city,
    stateOrigin: lastEvent.location.state,
    typeOrigin: lastEvent.location.type,
    cityDestiny: lastEvent.destination.city,
    stateDestiny: lastEvent.destination.state,
    typeDestiny: lastEvent.destination.type,
    dateUpdate: lastEvent.dateUpdate,
    timeUpdate: lastEvent.timeUpdate,
    trackingCode,
    firstName,
  }

  if (type === 'MESSAGE')
    return getReplyMessage({ event, delivered, packageType })

  return getJobMessage({ event, delivered, packageType })
}

export { getLastUpdateMessage }
