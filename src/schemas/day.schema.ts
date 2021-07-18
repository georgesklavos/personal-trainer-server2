import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DayDocument = Day & mongoose.Document;

@Schema()
export class Day {
  @Prop({ required: true })
  user: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true })
  date: Date;
  @Prop({
    required: true,
    type: {
      exercise: { type: Boolean, default: false },
      macros: { type: Boolean, default: false },
      steps: { type: Boolean, default: false },
      weight: { type: Boolean, default: false },
      payment: { type: Boolean, default: false },
      comment: { type: Boolean, default: false },
    },
  })
  client: {
    exercise: boolean;
    macros: boolean;
    steps: boolean;
    weight: boolean;
    payment: boolean;
    comment: boolean;
  };
  @Prop({
    required: true,
    type: {
      exercise: { type: Boolean, default: false },
      macros: { type: Boolean, default: false },
      steps: { type: Boolean, default: false },
      weight: { type: Boolean, default: false },
      payment: { type: Boolean, default: false },
      comment: { type: Boolean, default: false },
    },
  })
  trainer: {
    exercise: boolean;
    macros: boolean;
    steps: boolean;
    weight: boolean;
    payment: boolean;
    comment: boolean;
  };
}
export const DaySchema = SchemaFactory.createForClass(Day);
