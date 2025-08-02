import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
  AllowNull,
  Default,
} from 'sequelize-typescript'

import { Post, User, Comment } from './index'

@Table({ tableName: 'blog_likes', timestamps: true, paranoid: true })
export class Like extends Model {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number

  @BelongsTo(() => User)
  user!: User

  @ForeignKey(() => Post)
  @AllowNull
  @Column(DataType.INTEGER)
  postId!: number | null

  @BelongsTo(() => Post)
  post?: Post

  @ForeignKey(() => Comment)
  @AllowNull
  @Column(DataType.INTEGER)
  commentId!: number | null

  @Default(false)
  @Column(DataType.BOOLEAN)
  active?: boolean

  @BelongsTo(() => Comment)
  comment?: Comment
}
