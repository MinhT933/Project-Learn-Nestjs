import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'User',
  toObject: {
    getters: true,
  },
  versionKey: false,
  timestamps: false,
  minimize: false,
})
export class UserEntity {
  @Prop({ type: String })
  username: string;
  @Prop({ type: String })
  password: string;
}

export type UserDocument = UserEntity & Document;

export const UserSchema = SchemaFactory.createForClass(UserEntity);
