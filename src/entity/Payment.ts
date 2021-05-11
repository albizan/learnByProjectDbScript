import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Subscription } from "./Subscription";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  isSuccesful: boolean;

  @Column()
  provider: string;

  @Column()
  amount: number;

  @ManyToOne(() => Subscription, (s) => s.payments)
  subscription: Subscription;
}
