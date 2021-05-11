import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Payment } from "./Payment";

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  isActive: Date;

  @Column()
  isTrial: Date;

  @OneToMany(() => Payment, (p) => p.subscription)
  payments: Payment[];
}
