import {
  Table,
  Column,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
  BelongsTo,
  Model,
  HasMany,
} from 'sequelize-typescript'
import { CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute } from 'sequelize'

import { Comment, User, Like } from './index'

@Table({ tableName: 'blog_posts', timestamps: true })
export class Post extends Model<
  InferAttributes<Post, { omit: 'author' }>,
  InferCreationAttributes<Post, { omit: 'author' }>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: CreationOptional<number>

  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string

  @AllowNull(false)
  @Column(DataType.TEXT)
  content!: string

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number

  @BelongsTo(() => User)
  author!: NonAttribute<User>

  @HasMany(() => Comment)
  comments!: NonAttribute<Comment[]>

  @HasMany(() => Like)
  likes!: NonAttribute<Like[]>
}
