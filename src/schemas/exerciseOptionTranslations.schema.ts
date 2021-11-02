import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export type ExerciseOptionsDocument = ExerciseOptions & Document;

@Schema()
export class ExerciseOptions {
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

export const ExericseOptionsSchema =
  SchemaFactory.createForClass(ExerciseOptions);
