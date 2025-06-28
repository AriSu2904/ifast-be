import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop({ unique: true })
    email: string;

    phoneNumber: string;

    @Prop()
    profilePics: string;

    @Prop({ default: null })
    password: string;

    @Prop({ default: false })
    isRegisterWithLocal: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);