import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ChartDocument = Chart & mongoose.Document;

@Schema()
export class Chart {
  @Prop({ required: true, default: 0 })
  steps: number;
  @Prop({ required: true, default: 0 })
  protein: number;
  @Prop({ required: true, default: 0 })
  carbs: number;
  @Prop({ required: true, default: 0 })
  fat: number;
  @Prop({ required: true })
  weight: number;
  @Prop({ required: true })
  user: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true })
  date: Date;
  @Prop({ required: true })
  systemSaved: number;
}

export const ChartSchema = SchemaFactory.createForClass(Chart);
