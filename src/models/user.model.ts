import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  AllowNull,
  Unique,
  HasMany,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript'
import bcrypt from 'bcrypt'
import { CreationOptional, InferAttributes, InferCreationAttributes, NonAttribute } from 'sequelize'

import { Comment, Post, Like } from './index'

@Table({
  tableName: 'blog_users',
  timestamps: true,
})
export class User extends Model<
  InferAttributes<User, { omit: 'posts' }>,
  InferCreationAttributes<User, { omit: 'posts' }>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: CreationOptional<number>

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  email!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    defaultValue: 'user',
  })
  role!: 'user' | 'admin'

  @HasMany(() => Post)
  posts!: NonAttribute<Post[]>

  @HasMany(() => Comment)
  comments!: NonAttribute<Comment[]>

  @HasMany(() => Like)
  likes!: NonAttribute<Like[]>

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    if (instance.changed('password')) {
      const saltRounds = 10
      instance.password = await bcrypt.hash(instance.password, saltRounds)
    }
  }

  public async comparePassword(candidate: string): Promise<boolean> {
    return bcrypt.compare(candidate, this.password)
  }
}
