import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { CustomerToMovie } from "./CustomerToMovie";
import { Subscription } from "./Subscription";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  birthdate: Date;

  @Column()
  email: string;

  @Column()
  hashedPassword: string;

  @OneToMany(() => CustomerToMovie, (cm) => cm.customer)
  customerToMovie!: CustomerToMovie[];

  @OneToOne(() => Subscription)
  @JoinColumn()
  subscription: Subscription;
}
