import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, InputType } from "type-graphql";
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

@InputType({ description: "New wilder data" })
export class CreateWilderInput implements Partial<Wilder> {
  @Field()
  first_name: string;

  @Field({ nullable: true })
  last_name: string;

  @Field({ nullable: true })
  age: number;
}

@ObjectType()
export class WilderListData {
  @Field()
  success: boolean;

  @Field(() => [Wilder])
  wilders: Wilder[];

  @Field({ nullable: true })
  message: string;
}

