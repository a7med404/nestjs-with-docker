import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ required: true })
  name: string;

  @Prop()
  descripion: string;

  @Prop({ required: true })
  price: string;

  @Prop()
  isActive: boolean;

  @Prop({ required: true })
  gty: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
