import { replyMessages } from '../templates'
import { IEventMessage } from './getLastUpdateMessage'

import {
  checkImportationOrder as isImportationOrder,
  checkOrderPosted as isOrderPosted,
  checkUpdateOrder as isOrderWithUpdate,
  checkDeliveryOrder as isOrderDelivery,
} from '../utils'
import { canSendDefaultMessage } from '../utils/canSendDefaultMessage'

export interface getMessageDTO {
  event: IEventMessage
  delivered: boolean
  packageType: string
}

const getReplyMessage = ({
  event,
  delivered,
  packageType,
}: getMessageDTO): string => {
  event.packageType = packageType

  if (delivered) return replyMessages.orderDelivered(event)

  if (isImportationOrder(event)) return replyMessages.importOrder(event)

  if (isOrderPosted(event)) return replyMessages.orderPosted(event)

  if (isOrderDelivery(event)) return replyMessages.orderDelivery(event)

  if (isOrderWithUpdate(event)) return replyMessages.lastUpdate(event)

  if (canSendDefaultMessage(event)) return replyMessages.defaultMessage(event)

  console.log('Message not sent. Event: ', JSON.stringify(event, null, 2))
  return replyMessages.error(event.firstName)
}

export { getReplyMessage }
