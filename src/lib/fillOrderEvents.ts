import { RastreioEvent } from 'rastreio-correios/dist/interfaces/rastreio'
import { IOrderEvents } from '../models/order.model'
import { getEventAddressData } from './getEventAddressData'

const fillOrderEvents = (events: RastreioEvent[]): IOrderEvents[] => {
  const orderEvents = events.map((event) => ({
    status: event.status,
    dateUpdate: event.data,
    timeUpdate: event.hora,
    location: getEventAddressData(event.local),
    destination: getEventAddressData(event.destino),
  }))

  return orderEvents
}

export { fillOrderEvents }
