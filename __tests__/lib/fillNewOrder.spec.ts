import { fillNewOrder } from '../../src/lib'
import { tracking, orderEventsDelivered } from '../../__mocks__'

const [rastreamento] = tracking

describe('fillNewOrder', () => {
  it('should return a new order', () => {
    const userId = '123'
    const events = rastreamento.eventos
    const trackingCode = rastreamento.rastreio
    const delivered = rastreamento.entregue ? true : false
    const packageType = rastreamento.type

    const newOrder = fillNewOrder({
      userId,
      events,
      trackingCode,
      delivered,
      packageType,
    })

    expect(newOrder).toStrictEqual({
      trackingCode,
      user: userId,
      events: orderEventsDelivered,
      notificationSent: true,
      delivered,
      packageType,
    })
  })
})
