import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Genders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '50' })
  value: string;
}
