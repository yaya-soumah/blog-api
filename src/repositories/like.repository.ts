import { Comment } from "../models/comment.model.js";
import { Like } from "../models/like.model.js";
import { User } from "../models/user.model.js";

export class LikeRepository {
    static findLike(userId: number, postId: number){
        return Like.findOne({where:{userId, postId}})
    }
    
    static findCommentLike(userId: number, commentId: number){
        return Like.findOne({where:{userId, commentId}})
    }

    static createLike(data: any){
        return Like.create(data)
    }

    static deleteLike(like: Like) {
        return like.destroy()
    }

    static countLikes(postId:number){
        return Like.count({where:{postId}})
    }

    static findUsersWhoLikedPost(postId:number){
        return Like.findAll({where:{postId}, include:[{model: User, attributes: ['id','name','email']}]})
    }

    static findUsersWhoLikedComment(commentId: number){
        return Like.findAll({
            where: {commentId}, 
            include: [{model: User, attributes:['id','name','email']}]
        })
    }
}