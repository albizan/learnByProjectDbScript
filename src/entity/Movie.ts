import { Entity, Column, ManyToMany, JoinTable, PrimaryColumn, OneToMany } from "typeorm";
import { CustomerToMovie } from "./CustomerToMovie";
import { Genre } from "./Genre";

@Entity()
export class Movie {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  originalTitle: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  length: number;

  @Column({
    nullable: true,
  })
  description: string;

  @ManyToMany(() => Genre)
  @JoinTable({
    name: "movie_genre",
  })
  genres: Genre[];

  @OneToMany(() => CustomerToMovie, (cm) => cm.movie)
  customerToMovie!: CustomerToMovie[];
}
