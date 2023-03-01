import { IEventMessage } from '../../src/lib/getLastUpdateMessage'
import { checkDeliveryOrder } from '../../src/utils'

describe('checkDeliveryOrder', () => {
  it('should return true if status contains "Objeto saiu para entrega ao destinatário" and cityDestiny and stateDestiny is empty', () => {
    const event = {
      status: 'Objeto saiu para entrega ao destinatário',
    }

    expect(checkDeliveryOrder(event as IEventMessage)).toBeTruthy()
  })

  it('should return false if status does not contain "Objeto saiu para entrega ao destinatário"', () => {
    const event = {
      status: 'Objeto postado',
    }

    expect(checkDeliveryOrder(event as IEventMessage)).toBeFalsy()
  })

  it('should return false if cityDestiny and stateDestiny is not empty', () => {
    const event = {
      status: 'Objeto saiu para entrega ao destinatário',
      cityDestiny: 'cityDestiny',
      stateDestiny: 'stateDestiny',
    }

    expect(checkDeliveryOrder(event as IEventMessage)).toBeFalsy()
  })
})
