import { IEventMessage } from '../lib/getLastUpdateMessage'

const checkImportationOrder = (event: IEventMessage) =>
  !(event.cityOrigin && event.stateOrigin) && event.typeOrigin === 'País'

export { checkImportationOrder }
