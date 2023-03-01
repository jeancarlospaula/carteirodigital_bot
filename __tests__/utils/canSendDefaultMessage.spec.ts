import { IEventMessage } from '../../src/lib/getLastUpdateMessage'
import { canSendDefaultMessage } from '../../src/utils/canSendDefaultMessage'

describe('canSendDefaultMessage', () => {
  it('should return true if all fields are filled', () => {
    const event = {
      status: 'status',
      dateUpdate: 'dateUpdate',
      timeUpdate: 'timeUpdate',
      trackingCode: 'trackingCode',
    }

    expect(canSendDefaultMessage(event as IEventMessage)).toBeTruthy()
  })

  it('should return false if status is empty', () => {
    const event = {
      status: '',
      dateUpdate: 'dateUpdate',
      timeUpdate: 'timeUpdate',
      trackingCode: 'trackingCode',
    }

    expect(canSendDefaultMessage(event as IEventMessage)).toBeFalsy()
  })

  it('should return false if dateUpdate is empty', () => {
    const event = {
      status: 'status',
      dateUpdate: '',
      timeUpdate: 'timeUpdate',
      trackingCode: 'trackingCode',
    }

    expect(canSendDefaultMessage(event as IEventMessage)).toBeFalsy()
  })

  it('should return false if timeUpdate is empty', () => {
    const event = {
      status: 'status',
      dateUpdate: 'dateUpdate',
      timeUpdate: '',
      trackingCode: 'trackingCode',
    }

    expect(canSendDefaultMessage(event as IEventMessage)).toBeFalsy()
  })

  it('should return false if trackingCode is empty', () => {
    const event = {
      status: 'status',
      dateUpdate: 'dateUpdate',
      timeUpdate: 'timeUpdate',
      trackingCode: '',
    }

    expect(canSendDefaultMessage(event as IEventMessage)).toBeFalsy()
  })
})
