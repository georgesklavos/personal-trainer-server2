import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Levels {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '50' })
  value: string;
}
