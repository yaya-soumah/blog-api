import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript'
import { NonAttribute } from 'sequelize'

import { Post, User, Like } from './index'

@Table({ tableName: 'blog_comments' })
export class Comment extends Model {
  @AllowNull(false)
  @Column(DataType.TEXT)
  content!: string

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number

  @BelongsTo(() => User)
  user!: NonAttribute<User>

  @ForeignKey(() => Post)
  @Column(DataType.INTEGER)
  postId!: number

  @BelongsTo(() => Post)
  post!: NonAttribute<Post>

  @ForeignKey(() => Comment)
  @AllowNull
  @Column(DataType.INTEGER)
  parentId!: Comment

  @BelongsTo(() => Comment, { foreignKey: 'parentId' })
  parent?: NonAttribute<Comment>

  @HasMany(() => Comment, 'parentId')
  replies!: NonAttribute<Comment[]>

  @HasMany(() => Like)
  likes!: NonAttribute<Like[]>
}
