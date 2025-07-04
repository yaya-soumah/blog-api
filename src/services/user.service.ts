import { UserRepository } from '../repositories/user.repository.js'
import { AppError, throwIf } from '../utils/app.error.js'

export class UserServices {
    static async getAllUsers(){
        return UserRepository.findAllWithPosts()
    }

    static async createUser(data:{name:string, email: string, password: string}) {
        const existing = await UserRepository.findByEmail(data.email)
        throwIf(!!existing, 'Email already exists')
        
        return UserRepository.create(data)
    }

    static async updqateUserRole(id: number,  role: 'user' | 'admin') {
        const existing = await UserRepository.findById(id)
        throwIf(!existing, 'User not found')
        
        return UserRepository.updateByRole(id, {role})
    }
}