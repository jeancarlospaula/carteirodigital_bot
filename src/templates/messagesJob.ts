import moment from 'moment'
import { IEventMessage } from '../lib/getLastUpdateMessage'

const lastUpdate = ({
  trackingCode,
  status,
  cityOrigin = '',
  stateOrigin = '',
  typeOrigin,
  cityDestiny = '',
  stateDestiny = '',
  typeDestiny,
  dateUpdate,
  timeUpdate,
  firstName,
  packageType,
}: IEventMessage) => `
*Sua encomenda se movimentoooou, ${firstName}!* 🛵 📦\n\n
*CÓDIGO*: ${trackingCode}\n\n
*TIPO*: ${packageType}\n\n
*STATUS*: ${status}\n\n
*ORIGEM*: ${cityOrigin.toUpperCase() || ''} - ${
  stateOrigin.toUpperCase() || ''
} (${typeOrigin || ''})\n\n
*DESTINO*: ${cityDestiny.toUpperCase() || ''} - ${
  stateDestiny.toUpperCase() || ''
} (${typeDestiny || ''})\n\n
*DATA DA ATUALIZAÇÃO*: ${moment(dateUpdate).format(
  'DD/MM/YYYY'
)} - ${timeUpdate}\n\n
*Assim que ela se movimentar novamente, eu passo aqui para te avisar, ok? Até logo!* 😃`

const orderDelivered = ({
  trackingCode,
  status,
  cityOrigin = '',
  stateOrigin = '',
  dateUpdate,
  timeUpdate,
  firstName,
  packageType,
}: IEventMessage) => `
*Toc toc, sua encomenda chegou, ${firstName}! 📦*\n\n
*CÓDIGO*: ${trackingCode}\n\n
*TIPO*: ${packageType}\n\n
*STATUS*: ${status}\n\n
*LOCAL*: ${cityOrigin.toUpperCase()} - ${stateOrigin.toUpperCase()}\n\n
*DATA DA ATUALIZAÇÃO*: ${moment(dateUpdate).format(
  'DD/MM/YYYY'
)} - ${timeUpdate}\n\n
*Se quiser começar a rastrear um nova encomenda, é só digitar o código dela aqui embaixo! 📫*`

const orderDelivery = ({
  trackingCode,
  status,
  cityOrigin = '',
  stateOrigin = '',
  dateUpdate,
  timeUpdate,
  firstName,
  packageType,
}: IEventMessage) => `
*Já vai abrindo a porta aí, que sua encomenda está chegando, ${firstName}! 📦*\n\n
*CÓDIGO*: ${trackingCode}\n\n
*TIPO*: ${packageType}\n\n
*STATUS*: ${status}\n\n
*LOCAL*: ${cityOrigin.toUpperCase()} - ${stateOrigin.toUpperCase()}\n\n
*DATA DA ATUALIZAÇÃO*: ${moment(dateUpdate).format(
  'DD/MM/YYYY'
)} - ${timeUpdate}\n\n
*Assim que ela se movimentar novamente, eu passo aqui para te avisar, ok? Até logo!* 😃`

const orderPosted = ({
  trackingCode,
  status,
  cityOrigin = '',
  stateOrigin = '',
  dateUpdate,
  timeUpdate,
  firstName,
  packageType,
}: IEventMessage) => `
*Logo sua encomenda começará a se movimentar, ${firstName}! 📦*\n\n
*CÓDIGO*: ${trackingCode}\n\n
*TIPO*: ${packageType}\n\n
*STATUS*: ${status}\n\n
*LOCAL*: ${cityOrigin.toUpperCase()} - ${stateOrigin.toUpperCase()}\n\n
*DATA DA ATUALIZAÇÃO*: ${moment(dateUpdate).format(
  'DD/MM/YYYY'
)} - ${timeUpdate}\n\n
*Assim que ela se movimentar novamente, eu passo aqui para te avisar, ok? Até logo!* 😃`

const importOrder = ({
  trackingCode,
  status,
  dateUpdate,
  timeUpdate,
  firstName,
  packageType,
}: IEventMessage) => `
Sua importação se movimentoooou, ${firstName}! 📦 🌏 \n\n
*CÓDIGO*: ${trackingCode}\n\n
*TIPO*: ${packageType}\n\n
*STATUS*: ${status}\n\n
*DATA DA ATUALIZAÇÃO*: ${moment(dateUpdate).format(
  'DD/MM/YYYY'
)} - ${timeUpdate}\n\n
*Assim que ela chegar no Brasil, eu consigo te passar dados mais precisos sobre a sua localização, ok? Até logo! 🇧🇷*`

const defaultMessage = ({
  trackingCode,
  status,
  dateUpdate,
  timeUpdate,
  firstName,
  packageType,
}: IEventMessage) => `
*Sua encomenda se movimentoooou, ${firstName}!* 🛵 📦\n\n
*CÓDIGO*: ${trackingCode}\n\n
*TIPO*: ${packageType}\n\n
*STATUS*: ${status}\n\n
*DATA DA ATUALIZAÇÃO*: ${moment(dateUpdate).format(
  'DD/MM/YYYY'
)} - ${timeUpdate}\n\n
*Assim que ela se movimentar novamente, eu passo aqui para te avisar, ok? Até logo!* 😃`

export {
  lastUpdate,
  orderDelivered,
  orderPosted,
  importOrder,
  orderDelivery,
  defaultMessage,
}
