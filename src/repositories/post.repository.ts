import { Post } from '../models/post.model.js'

export class PostRepository {
  static async findAllPosts({where, limit,offset}:{where:{},limit?:number, offset:number}) {
    
    return Post.findAndCountAll({where, limit, offset, order:[['createdAt','DESC']], include: ['author'] })
  }

  static async create(data: { title: string; content: string; userId: number }) {
    return Post.create(data)
  }

  static async findById(id: number) {
    return Post.findByPk(id, { include: ['author'] })
  }

  static async deleteById(id: number) {
    return Post.destroy({where: {id}})
  }

  static async updateById(id: number, data: Partial<{title: string, content: string}>) {
    return Post.update(data, {where: {id}, returning: true})
  }
}
