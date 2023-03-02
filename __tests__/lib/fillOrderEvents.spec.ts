import { fillOrderEvents } from '../../src/lib'
import { tracking, orderEvents, orderEventsDelivered } from '../../__mocks__'

describe('fillOrderEvents', () => {
  it('should return an array of order events', () => {
    expect(
      fillOrderEvents({
        events: tracking[0].eventos,
        delivered: false,
      })
    ).toStrictEqual(orderEvents)
  })

  it('should return an array of order events and the last event should has destination when the order was delivered', () => {
    expect(
      fillOrderEvents({
        events: tracking[0].eventos,
        delivered: true,
      })
    ).toEqual(orderEventsDelivered)
  })
})
