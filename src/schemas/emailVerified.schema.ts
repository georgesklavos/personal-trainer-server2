import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class EmailVerified {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  languageId: number;
}
