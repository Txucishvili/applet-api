import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRoles {
  Normal = 0,
  Manager = 1,
  Admin = 2,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  firstName: string;

  @Column()
  password: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  theme: string;

  @Column({default: 0})
  roles: UserRoles;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;
}