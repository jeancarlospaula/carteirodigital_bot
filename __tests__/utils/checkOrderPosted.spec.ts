import { checkOrderPosted } from '../../src/utils'
import { IEventMessage } from '../../src/lib/getLastUpdateMessage'

describe('checkOrderPosted', () => {
  it('should return true if status contains "Objeto postado"', () => {
    const event = {
      status: 'Objeto postado',
    }

    expect(checkOrderPosted(event as IEventMessage)).toBeTruthy()
  })

  it('should return false if status does not contain "Objeto postado"', () => {
    const event = {
      status: 'Objeto saiu para entrega ao destinatário',
    }

    expect(checkOrderPosted(event as IEventMessage)).toBeFalsy()
  })
})
