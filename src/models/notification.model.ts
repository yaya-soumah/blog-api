import { Model } from 'sequelize'
import { Table, Column, ForeignKey, DataType, Default } from 'sequelize-typescript'
import { User } from '../models/user.model.js'

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
  read!: boolean
}
