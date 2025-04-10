import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  order: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: false })
  imageUrl: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});
