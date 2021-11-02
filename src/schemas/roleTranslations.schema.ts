import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export type RolesDocument = Roles & Document;

@Schema()
export class Roles {
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

export const RolesSchema = SchemaFactory.createForClass(Roles);
