import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto";

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

    async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
        Logger.debug(`[USER:DB] find user with email ${phoneNumber}`)

        return this.collection.findOne({ phoneNumber });
    }
}