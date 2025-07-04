import {PostRepository} from '../repositories/post.repository.js'
import { UserRepository } from '../repositories/user.repository.js'
import { AppError, throwIf } from '../utils/app.error.js'
import { Op } from 'sequelize'


export class PostService {

    static async getAllPosts({page=1,limit=10,search='',}:{page?:number,limit?:number, search?:string}){
        
        const offset = (page - 1) * limit
        const where = search?
                {
                    content: {[Op.iLike]: `%$[search]%`},
                }:
                {}
        const { rows, count } = await PostRepository.findAllPosts({limit, where, offset})
        
        return {
            total: count,
            page,
            pageSize: limit,
            posts: rows,
        }
    }

    static async createPost(data:{title:string, content: string, userId: number}) {
        const user = await UserRepository.findById(data.userId)

        throwIf(!user, 'User does not exist.')
        
        return PostRepository.create(data)
    }

    static async deletePost(id:number) {
        const deleted = await PostRepository.deleteById(id)
        if (deleted === 0) {
            throw new Error('Post not found')
        }
        
        return true
    }

    static async updatePost(id: number, data: Partial<{title: string, content: string}>) {
        const [count, [updated]] = await PostRepository.updateById(id, data)
        if (count === 0 || !updated) {
            throw new Error('Post not found or unchanged')
        }
        return updated
    }
}