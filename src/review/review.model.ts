import {BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.model";
import {Boat} from "../boat/boat.model";

interface ReviewCreationAttrs{
    user: string;
    boat: string;
    userEmail: string;
    rating: number;
    comment?: string
}

@Table({tableName: 'reviews'})
export class Review extends Model<Review, ReviewCreationAttrs>{
    @Column({type: DataType.UUID, primaryKey: true, unique: true, defaultValue: DataType.UUIDV4})
    id: string;

    @ForeignKey(()=> User)
    @Column({type: DataType.UUID})
    userId: string;

    @ForeignKey(()=>User)
    @Column({type: DataType.STRING})
    userEmail: string

    @ForeignKey(()=> Boat)
    @Column({type: DataType.UUID})
    boatId: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    rating: number;

    @Column({type: DataType.STRING, allowNull: true})
    comment: string;





    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Boat)
    boat: Boat;
}