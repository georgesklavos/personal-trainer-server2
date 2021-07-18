import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ExerciseDocument = Exercise & mongoose.Document;

@Schema()
export class Exercise {
  @Prop({ required: true })
  user: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true })
  date: Date;
  @Prop({ required: true })
  exerciseMode: number;
  @Prop({
    required: true,
    type: {
      name: { type: String },
      value: { type: Number },
      option: { type: Number },
      hasVideo: { type: Boolean },
    },
  })
  warmUpExercises: {
    name: string;
    value: number;
    option: number;
    hasVideo: boolean;
  };
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
