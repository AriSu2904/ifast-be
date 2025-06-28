import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
    @Prop({ maxlength: 100 })
    firstName: string;

    @Prop({ maxlength: 100 })
    lastName: string;

    @Prop({ unique: true, maxlength: 50 })
    email: string;

    @Prop()
    profilePics: string;

    @Prop({ default: null })
    password: string;

    @Prop({ default: false })
    isRegisterWithLocal: boolean;

    @Prop()
    isVerified: boolean;

    @Prop({ maxlength: 50 })
    occupation: string;

    @Prop({ maxlength: 10})
    gender: string;

    @Prop()
    dob: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);