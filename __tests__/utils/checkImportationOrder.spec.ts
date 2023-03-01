import { IEventMessage } from '../../src/lib/getLastUpdateMessage'
import { checkImportationOrder } from '../../src/utils'

describe('checkImportationOrder', () => {
  it('should return true if event cityOrigin and stateOrigin is empty and typeOrigin is equal to "País"', () => {
    const event = {
      cityOrigin: '',
      stateOrigin: '',
      typeOrigin: 'País',
    }

    expect(checkImportationOrder(event as IEventMessage)).toBeTruthy
  })

  it('should return false if event cityOrigin and stateOrigin is not empty', () => {
    const event = {
      cityOrigin: 'cityOrigin',
      stateOrigin: 'stateOrigin',
      typeOrigin: 'País',
    }

    expect(checkImportationOrder(event as IEventMessage)).toBeFalsy
  })

  it('should return false if event typeOrigin is not equal to "País"', () => {
    const event = {
      cityOrigin: '',
      stateOrigin: '',
      typeOrigin: 'Estado',
    }

    expect(checkImportationOrder(event as IEventMessage)).toBeFalsy
  })
})
