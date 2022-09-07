import { IEventMessage } from '../lib/getLastUpdateMessage'

const canSendDefaultMessage = (event: IEventMessage) =>
  event.trackingCode && event.status && event.dateUpdate && event.timeUpdate

export { canSendDefaultMessage }
