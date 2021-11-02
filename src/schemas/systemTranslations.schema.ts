import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export type SystemsDocument = Systems & Document;

@Schema()
export class Systems {
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

export const SystemsSchema = SchemaFactory.createForClass(Systems);
