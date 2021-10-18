import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

export type ResetPasswordDocument = ResetPassword & Document;

@Schema()
export class ResetPassword {
  @IsString()
  @IsNotEmpty()
  @Prop()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  description: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  languageId: number;
}

export const ResetPasswordSchema = SchemaFactory.createForClass(ResetPassword);
