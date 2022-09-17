export interface ITrackedOrdersNumberRepository {
  increment(): Promise<void>
}
