import { Table, Column, ForeignKey, DataType, Default, Model } from 'sequelize-typescript'

import { User } from './index'

@Table({ tableName: 'blog_notifications', timestamps: true })
export class Notification extends Model {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  recipientId!: number

  @Column(DataType.STRING)
  type!: 'like' | 'comment' | 'follow'

  @Column(DataType.STRING)
  message!: string

  @Default(false)
  @Column(DataType.BOOLEAN)
  isRead!: boolean
}
