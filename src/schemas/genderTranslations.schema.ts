import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export type GendersDocument = Genders & Document;

@Schema()
export class Genders {
  @IsInt()
  @Min(1)
  referenceId: number;

  @IsInt()
  @Min(1)
  languageId: number;

  @IsString()
  @IsNotEmpty()
  value: string;
}

export const GendersSchema = SchemaFactory.createForClass(Genders);
