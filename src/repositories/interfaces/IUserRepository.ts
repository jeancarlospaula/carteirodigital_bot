import { IUser } from '../../models/user.model'

export interface IUserRepository {
  insert(data: IUser): Promise<IUser>
  findOne(conditions: Object, projection?: Object): Promise<IUser | null>
  findById(id: string, projection?: Object): Promise<IUser | null>
  findOneAndDelete(conditions: Object): Promise<void>
  findOneAndUpdate(conditions: Object, update: Object): Promise<IUser | null>
}
