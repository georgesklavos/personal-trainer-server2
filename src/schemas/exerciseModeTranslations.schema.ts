import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export type ExerciseModesDocument = ExerciseModes & Document;

@Schema()
export class ExerciseModes {
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

export const ExerciseModesSchema = SchemaFactory.createForClass(ExerciseModes);
