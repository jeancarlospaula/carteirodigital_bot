import { getEventAddressData } from '../../src/lib'

describe('getEventAddressData', () => {
  it('should return the correct address data', () => {
    expect(getEventAddressData('type - city / state')).toEqual({
      type: 'type',
      city: 'city',
      state: 'state',
    })
  })
})
