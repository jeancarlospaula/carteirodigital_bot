import { IEventMessage } from '../lib/getLastUpdateMessage'

const checkUpdateOrder = (event: IEventMessage) =>
  event.cityDestiny && event.stateDestiny && event.typeDestiny

export { checkUpdateOrder }
