import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Wilder from "./Wilder";
import Language from "./Language";

@Entity("notes")
export default class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  note: number;

  @ManyToOne("Language", { eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  language: Language;

  @ManyToOne(() => Wilder, (wilder) => wilder.notes, { eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  wilder: Wilder;
}
