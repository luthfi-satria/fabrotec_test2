import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Users' })
export class UsersDocument {
  @PrimaryGeneratedColumn()
  Uid?: number;

  @Column({ type: 'varchar', nullable: false })
  Username?: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  City?: string;

  @ManyToOne(() => UsersDocument, (Users) => Users.Uid)
  @JoinColumn({ name: 'Friend' })
  public Friend?: UsersDocument;

  constructor(init?: Partial<UsersDocument>) {
    Object.assign(this, init);
  }
}
