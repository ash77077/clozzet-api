import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: false })
  order: number;

  @Prop({ default: true })
  active: boolean;

  @Prop({ required: false })
  imageUrl: string;

}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});
