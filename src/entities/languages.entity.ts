import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Languages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: '2' })
  iso: string;

  @Column({ type: 'varchar', length: '50' })
  value: string;
}
