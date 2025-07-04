import { User } from '../models/user.model.js'

export class UserRepository {
  static async findAllWithPosts() {
    return User.findAll({ include: ['posts'] })
  }

  static async create(data: { name: string; email: string; password: string; }) {
    return User.create({...data, role:'user'})
  }

  static async findById(id: number) {
    return User.findByPk(id, { include: ['posts'] })
  }

  static async findByEmail(email:string){
    return User.findOne({where:{email}})
  }

  static async updateByRole(id: number,data: Partial<{role:'user' | 'admin'}>){
    return User.update(data, {where:{id}, returning: true})
  }
}
