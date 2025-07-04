import { CommentRepository } from "../repositories/comment.repository.js";
import { AppError } from "../utils/app.error.js";

export class CommentService {
    static async addComment(userId:number, postId: number, content: string){
        return await CommentRepository.createComment({userId, postId, content})
    }

    static async getCommentListByPost(postId:number){
        return await CommentRepository.findCommentByPostId(postId)
    }

    static async editComment(commentId: number, userId: number, content: string){
        const comment = await CommentRepository.findCommentById(commentId)

        if (!comment) throw new AppError('Comment not found', 404)
        if( comment.userId !== userId)  throw new AppError('Not authorized', 403)
        return CommentRepository.updateComment(commentId, {content})
    }
    
    static async deleteComment(commentId: number, userId: number){
        const comment = await CommentRepository.findCommentById(commentId)

        if (!comment) throw new AppError('Comment not found', 404)
        if( comment.userId !== userId)  throw new AppError('Not authorized', 403)
        return CommentRepository.deleteComment(commentId)
    }
}

