import { CommentRepository } from "../repositories/comment.repository.js";
import { LikeRepository } from "../repositories/like.repository.js";
import { Notification } from "../models/notification.model.js";
import { UserRepository } from "../repositories/user.repository.js";
import { AppError } from "../utils/app.error.js";

export class LikeService {
    static async toggleLike (userId: number, postId:number){
        const existing = await LikeRepository.findLike(userId,postId)

        if (existing) {
            await LikeRepository.deleteLike(existing)
            return {liked: false}
        }

        await LikeRepository.createLike({userId, postId})
        return {liked: true}
    }

    static async getPostLikes(postId: number){
        const count = await LikeRepository.countLikes(postId)
        return {postId, likes: count}
    }

    static async notifyLike(recipientId: number, senderName: string, target: 'post' | 'comment'){
        const message = `${senderName} liked your ${target}`

        return Notification.create({
            recipientId,
            type: 'like',
            message,
        })
    }

    static async toggleCommentLike(userId: number, commentId: number){
        const existing = await LikeRepository.findCommentLike(userId, commentId)

        if (existing) {
            await existing.destroy()
            return {liked: false}
        }

        const comment = await CommentRepository.findCommentById(commentId)
        if (!comment) throw new AppError('Comment not found', 404)
        
        await LikeRepository.createLike({userId,commentId})

        //notify 
        if(userId !== comment.userId){
            const user = await UserRepository.findById(userId)
            await this.notifyLike(comment.userId,user?.name || 'Someone', 'comment')
        }

        return { liked: true}
    }

    static async getUsersWhoLikedPost(postId: number){
        return LikeRepository.findUsersWhoLikedPost(postId)
    }

    static async getUsersWhoLikedComment(commentId: number){
        return LikeRepository.findUsersWhoLikedComment(commentId)
    }
}