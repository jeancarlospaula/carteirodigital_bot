import { IEventMessage } from '../lib/getLastUpdateMessage'

const checkDeliveryOrder = (event: IEventMessage) => {
  return (
    !(event.cityDestiny && event.stateDestiny) &&
    event.status?.includes(process.env.MESSAGE_DELIVERY_ORDER as string)
  )
}

export { checkDeliveryOrder }
