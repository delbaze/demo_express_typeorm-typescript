import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Unique('contrainte_unique', ['label'])  
@Entity("languages")
export default class Language {
  @PrimaryGeneratedColumn()
  id: number;

//   @Column({unique: true})//autre possibilité pour faire du unique
  @Column()
  label: string;
}
