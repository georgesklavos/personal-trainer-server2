import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ClientDocument = Client & mongoose.Document;

@Schema()
export class Client {
  @Prop({ required: true })
  user: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true, trim: true })
  firstName: string;
  @Prop({ required: true, trim: true })
  lastName: string;
  @Prop({ required: true })
  owner: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true })
  age: number;
  @Prop({ required: true })
  sex: number;
  @Prop({ required: true })
  level: number;
  @Prop({ required: true })
  active: boolean;
  @Prop({ required: true })
  payment: boolean;
  @Prop({ required: true })
  program: number;
  @Prop({ required: true })
  paymentType: number;
  @Prop({ required: true })
  lastWeightNumber: number;
  @Prop({ required: true })
  heightNumber;
  @Prop({ required: true })
  target: number;
  @Prop({ required: true })
  startDate: Date;
  @Prop({ required: true })
  endDate: Date;
  @Prop({ required: true })
  notes: string;
  @Prop({ required: true, ref: 'Trainer' })
  trainer: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true, default: true })
  viewedByTrainer: boolean;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
