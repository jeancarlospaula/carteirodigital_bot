import { User } from '../models'
import { IUser } from '../models/user.model'
import { IUserRepository } from './interfaces/IUserRepository'

class UserRepository implements IUserRepository {
  async insert(data: IUser) {
    const user = new User(data)
    const newUser = await user.save()
    return newUser
  }

  async findOne(
    conditions: Object,
    projection?: Object
  ): Promise<IUser | null> {
    const user = await User.findOne(conditions, projection)
    return user
  }

  async findById(id: string, projection?: Object): Promise<IUser | null> {
    const user = await User.findById(id, projection)
    return user
  }

  async findOneAndDelete(conditions: Object): Promise<void> {
    await User.findOneAndDelete(conditions)
  }

  async findOneAndUpdate(
    conditions: Object,
    update: Object
  ): Promise<IUser | null> {
    const user = await User.findOneAndUpdate(conditions, update, { new: true })
    return user
  }
}

export { UserRepository }
