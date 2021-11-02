import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export type TargetsDocument = Targets & Document;

@Schema()
export class Targets {
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

export const TargetsSchema = SchemaFactory.createForClass(Targets);
