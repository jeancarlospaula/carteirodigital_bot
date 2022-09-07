import { jobMessages } from '../templates'
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

const getJobMessage = ({
  event,
  delivered,
  packageType,
}: getMessageDTO): string | undefined => {
  event.packageType = packageType

  console.log('delivered', delivered)

  if (delivered) return jobMessages.orderDelivered(event)

  if (isOrderWithUpdate(event)) return jobMessages.lastUpdate(event)

  if (isImportationOrder(event)) return jobMessages.importOrder(event)

  if (isOrderPosted(event)) return jobMessages.orderPosted(event)

  if (isOrderDelivery(event)) return jobMessages.orderDelivery(event)

  if (canSendDefaultMessage(event)) return jobMessages.defaultMessage(event)
}

export { getJobMessage }
