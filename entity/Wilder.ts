import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import Note from "./Note";

@ObjectType()
@Entity("wilders")
export default class Wilder {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column()
  age: number;

  @Field(() => [Note], { nullable: true })
  @OneToMany(() => Note, (note) => note.wilder, {})
  notes: Note[];
}
