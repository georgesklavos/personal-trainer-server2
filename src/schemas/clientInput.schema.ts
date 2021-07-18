import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ClientInputDocument = ClientInput & mongoose.Document;

@Schema()
export class ClientInput {
  @Prop({ required: true })
  user: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true })
  date: Date;
  @Prop({
    required: true,
    type: {
      number: { type: Number },
      distance: { type: Number },
      period: { type: Number },
      systemSaved: { type: Number },
    },
  })
  steps: {
    number: number;
    distance: number;
    period: number;
    systemSaved: number;
  };
  @Prop({
    required: true,
    type: {
      weight: { type: Number },
      fat: { type: Number },
      muscle: { type: Number },
      bone: { type: Number },
      bmi: { type: Number },
      notes: { type: Number },
      systemSaved: { type: Number },
    },
  })
  weight: {
    weight: number;
    fat: number;
    muscle: number;
    bone: number;
    bmi: number;
    notes: string;
    systemSaved: number;
  };
  @Prop({ required: true })
  comments: string;
}

export const ClientInputSchema = SchemaFactory.createForClass(ClientInput);

ClientInputSchema.methods.toJSON = function () {
  //   delete ClientInput.arguments.user;
  //   delete ClientInput.user;
  //   delete this.__v;
  //   delete this._id;
  //   return this;
};
