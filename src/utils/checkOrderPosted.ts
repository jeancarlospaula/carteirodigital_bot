import { IEventMessage } from '../lib/getLastUpdateMessage'

const checkOrderPosted = (event: IEventMessage) => {
  return (
    event.status &&
    event.status.includes(process.env.MESSAGE_ORDER_POSTED as string)
  )
}

export { checkOrderPosted }
