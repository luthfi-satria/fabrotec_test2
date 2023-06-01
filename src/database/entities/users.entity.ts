import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UsersDocument {
  @PrimaryGeneratedColumn()
  Uid?: number;

  @Column({ type: 'varchar', nullable: false })
  Username?: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  City?: string;

  @Column({ nullable: false })
  Friend?: number;

  constructor(init?: Partial<UsersDocument>) {
    Object.assign(this, init);
  }
}
