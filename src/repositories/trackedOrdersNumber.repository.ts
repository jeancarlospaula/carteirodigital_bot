import { TrackedOrdersNumber } from '../models'
import { ITrackedOrdersNumberRepository } from './interfaces/ITrackedOrdersNumberRepository'

class TrackedOrdersNumberRepository implements ITrackedOrdersNumberRepository {
  async increment(): Promise<void> {
    await TrackedOrdersNumber.updateOne(
      {},
      { $inc: { trackedOrdersNumber: 1 } }
    )
  }
}

export { TrackedOrdersNumberRepository }
