import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

export type EmailVerifiedDocument = EmailVerified & Document;

@Schema({ timestamps: true })
export class EmailVerified {
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  title: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  description: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  languageId: number;
}

export const EmailVerifiedSchema = SchemaFactory.createForClass(EmailVerified);
