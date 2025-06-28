import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import ENV from "src/config";

@Injectable()
export class GoogleAuth extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: ENV.GOOGLE.CLIENT_ID,
            clientSecret: ENV.GOOGLE.SECRET,
            callbackURL: ENV.GOOGLE.CALLBACK_URL,
            scope: ['profile', 'email'],
        } as any);
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken,
        };
        done(null, user);
    }
}