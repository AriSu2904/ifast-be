import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.schema";
import { Model } from "mongoose";
import { CreateUserDto, UserAdditionalData } from "./dto";
import { castDob } from "src/utils";

@Injectable()
export class AuthRepository {
    constructor(@InjectModel(User.name) private collection: Model<User>) { }

    async createOne(user: CreateUserDto): Promise<User> {
        Logger.debug('[USER:DB] Creating new user');

        const newUser = new this.collection(user);

        return this.collection.insertOne(newUser);
    }

    async findByEmail(email: string): Promise<User | null> {
        Logger.debug(`[USER:DB] find user with email ${email}`);


        return this.collection.findOne({ email });
    }

    async additionalUpdate(user: UserAdditionalData) {
        Logger.debug('[USER:DB] Update additional data');

        const filter = {
            email: user.email
        }

        const setter = {
            $set: {
                firstName: user.firstName,
                lastName: user.lastName,
                occupation: user.occupation,
                gender: user.gender,
                dob: new Date(user.dob)
            },
        }

        return this.collection.updateOne(filter, setter);
    }

    async deleteOneByEmail(email: string) {
        Logger.debug('[USER:DB] Deleting document with email', email);

        return this.collection.findOneAndDelete({ email });
    }
}