import { Table, Column, Model, ForeignKey, BelongsTo, DataType, AllowNull } from "sequelize-typescript";

@Table({tableName:'likes', timestamps:true, paranoid:true})
export class Like extends Model {
    @ForeignKey(()=>User)
    @Column(DataType.INTEGER)
    userId!: number

    @BelongsTo(()=> User)
    user!: User

    @ForeignKey(()=> Post)
    @AllowNull
    @Column(DataType.INTEGER)
    postId!: number | null

    @BelongsTo(()=> Post)
    post?: Post

    @ForeignKey(()=> Comment)
    @AllowNull
    @Column(DataType.INTEGER)
    commentId!: number | null

    @BelongsTo(()=> Comment)
    comment?: Comment

}
import { Post, User, Comment } from "./index.js";

