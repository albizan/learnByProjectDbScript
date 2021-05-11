import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./Movie";
import { Customer } from "./Customer";

@Entity()
export class CustomerToMovie {
  @PrimaryGeneratedColumn()
  customerToMovieId!: number;

  @Column()
  customerId!: number;

  @Column()
  movieId!: number;

  @Column()
  timestamp!: number;

  @Column()
  rating!: number;

  @ManyToOne(() => Customer, (c) => c.customerToMovie)
  customer!: Customer;

  @ManyToOne(() => Movie, (m) => m.customerToMovie)
  movie!: Movie;
}
