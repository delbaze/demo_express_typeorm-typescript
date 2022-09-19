import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import Note from "./Note"

@Entity("wilders")
export default class Wilder {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    age: number
    
    @OneToMany(() => Note, (note) => note.wilder , {})
    notes: Note[]

}