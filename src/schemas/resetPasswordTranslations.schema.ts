import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
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

  @IsNumber()
  @IsNotEmpty()
  @Prop()
  languageId: number;

  @IsString()
  test: string;
}

export const ResetPasswordSchema = SchemaFactory.createForClass(ResetPassword);
