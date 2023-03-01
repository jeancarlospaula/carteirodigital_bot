import { checkUpdateOrder } from '../../src/utils'
import { IEventMessage } from '../../src/lib/getLastUpdateMessage'

describe('checkUpdateOrder', () => {
  it('should return true if event cityDestiny, stateDestiny and typeDestiny is not empty', () => {
    const event = {
      cityDestiny: 'cityDestiny',
      stateDestiny: 'stateDestiny',
      typeDestiny: 'País',
    }

    expect(checkUpdateOrder(event as IEventMessage)).toBeTruthy
  })

  it('should return false if event cityDestiny is empty', () => {
    const event = {
      cityDestiny: '',
      stateDestiny: 'stateDestiny',
      typeDestiny: 'País',
    }

    expect(checkUpdateOrder(event as IEventMessage)).toBeFalsy
  })

  it('should return false if event stateDestiny is empty', () => {
    const event = {
      cityDestiny: 'cityDestiny',
      stateDestiny: '',
      typeDestiny: 'País',
    }

    expect(checkUpdateOrder(event as IEventMessage)).toBeFalsy
  })

  it('should return false if event typeDestiny is empty', () => {
    const event = {
      cityDestiny: 'cityDestiny',
      stateDestiny: 'stateDestiny',
      typeDestiny: '',
    }

    expect(checkUpdateOrder(event as IEventMessage)).toBeFalsy
  })
})
