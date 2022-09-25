import moment from 'moment'
import { IEventMessage } from '../lib/getLastUpdateMessage'

const welcome = (firstName: string) =>
  `Bem-vindo(a) ${firstName}, eu sou o *Carteiro Digital* 📦 e levarei até você todas as informações sobre as movimentações da sua encomenda.`

const firstCode = (firstName: string) =>
  `Então, vamos lá ${firstName}.\n\n
Para rastrear sua encomenda é só digitar o código dela, ok? Lembre-se de digitar um código *válido para os correios do Brasil*.\n\n
⚠️ *Se a qualquer momento você quiser que eu pare de te enviar notificações e delete seu nome e códigos de rastreio dos meus registros, é só digitar /quit, beleza?*`

const invalidCode = (code: string, firstName: string) =>
  `O código *${code}* não parece ser válido, ${firstName} ☹️\n
Vamos tentar rastrear sua encomenda novamente? Lembre-se de digitar um código *válido para os correios do Brasil*.`

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
*Sua encomenda está a caminho, ${firstName}!* 🛵 📦\n\n
*CÓDIGO*: ${trackingCode}\n\n
*TIPO*: ${packageType}\n\n
*STATUS*: ${status}\n\n
*ORIGEM*: ${cityOrigin.toUpperCase()} - ${stateOrigin.toUpperCase()} (${typeOrigin})\n\n
*DESTINO*: ${cityDestiny.toUpperCase()} - ${stateDestiny.toUpperCase()} (${typeDestiny})\n\n
*DATA DA ATUALIZAÇÃO*: ${moment(dateUpdate).format(
  'DD/MM/YYYY'
)} - ${timeUpdate}\n\n
*Assim que ela se movimentar novamente, eu passo aqui para te avisar, ok? Até logo!* 😃`

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
*TIPO*: ${packageType}\n\n
*CÓDIGO*: ${trackingCode}\n\n
*STATUS*: ${status}\n\n
*LOCAL*: ${cityOrigin.toUpperCase()} - ${stateOrigin.toUpperCase()}\n\n
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
}: IEventMessage): string => `
*Parece que sua encomenda já chegou, ${firstName}! 📦*\n\n
*CÓDIGO*: ${trackingCode}\n\n
*TIPO*: ${packageType}\n\n
*STATUS*: ${status}\n\n
*LOCAL*: ${cityOrigin.toUpperCase()} - ${stateOrigin.toUpperCase()}\n\n
*DATA DA ATUALIZAÇÃO*: ${moment(dateUpdate).format(
  'DD/MM/YYYY'
)} - ${timeUpdate}\n\n
*Se quiser começar a rastrear um nova encomenda, é só digitar o código dela aqui embaixo! 📫*`

const orderPosted = ({
  trackingCode,
  status,
  cityOrigin = '',
  stateOrigin = '',
  dateUpdate,
  timeUpdate,
  firstName,
  packageType,
}: IEventMessage): string => `
*Logo sua encomenda começará a se movimentar, ${firstName}! 📦*\n\n
*CÓDIGO*: ${trackingCode}\n\n
*TIPO*: ${packageType}\n\n
*STATUS*: ${status}\n\n
*LOCAL*: ${cityOrigin.toUpperCase()} - ${stateOrigin.toUpperCase()}\n\n
*DATA DA ATUALIZAÇÃO*: ${moment(dateUpdate).format(
  'DD/MM/YYYY'
)} - ${timeUpdate}\n\n
*Assim que ela se movimentar novamente, eu passo aqui para te avisar, ok? Até logo!* 😃`

const error = (firstName: string): string =>
  `No momento estou tirando uma folga, ${firstName}. Pode tentar me enviar o código de ratreamento da sua encomenda mais tarde?`

const acceptTerms = (firstName: string): string =>
  `${firstName}, para te enviar as notificações sobre a sua encomenda, precisarei registrar o seu *nome* e os *códigos de rastreio* das suas encomendas.\n\n
Ao aceitar, você concorda com a nossa Política de Privacidade e Termos de Uso, disponível em: ${process.env.TERMS_URL}\n\n
*Você aceita que eu registre essas informações?*`

const rejectedTerms = (firstName: string): string =>
  `Sem problemas ${firstName}, assim que quiser começar a rastrear suas encomendas, é só clicar aqui embaixo! 😉`

const quit = (): string =>
  `⚠️ *Seu nome e os dados de rastreamento das suas encomendas foram excluídos dos meus registros.*\n\n 
Então, não vou mais te atualizar sobre a movimentação das suas encomendas, tudo bem?\n\n
Caso queira voltar a rastreá-las, é so clicar aqui embaixo! 😉`

const importOrder = ({
  trackingCode,
  status,
  dateUpdate,
  timeUpdate,
  firstName,
  packageType,
}: IEventMessage) => `
${firstName}, parece que esta encomenda está fora do Brasil. Esta é sua última atualização! 🌏 \n\n
*CÓDIGO*: ${trackingCode}\n\n
*TIPO*: ${packageType}\n\n
*STATUS*: ${status}\n\n
*DATA DA ATUALIZAÇÃO*: ${moment(dateUpdate).format(
  'DD/MM/YYYY'
)} - ${timeUpdate}\n\n
*Assim que ela chegar no Brasil, eu consigo te passar dados mais precisos sobre a sua localização, ok? Até logo!* 🇧🇷`

const defaultMessage = ({
  trackingCode,
  status,
  dateUpdate,
  timeUpdate,
  firstName,
  packageType,
}: IEventMessage) => `
${firstName}, esta é a última atualização da sua encomenda! 📦\n\n
*CÓDIGO*: ${trackingCode}\n\n
*TIPO*: ${packageType}\n\n
*STATUS*: ${status}\n\n
*DATA DA ATUALIZAÇÃO*: ${moment(dateUpdate).format(
  'DD/MM/YYYY'
)} - ${timeUpdate}\n\n
*Assim que ela se movimentar novamente, eu passo aqui para te avisar, ok? Até logo!* 😃`

export {
  welcome,
  firstCode,
  invalidCode,
  lastUpdate,
  orderDelivered,
  orderPosted,
  error,
  acceptTerms,
  rejectedTerms,
  quit,
  importOrder,
  orderDelivery,
  defaultMessage,
}
