import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import ENV from "src/config";

@Injectable()
export class JwtAuth extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: ENV.JWT.SECRET,
        } as any)
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email, fisrtName: payload.firstName, lastName: payload.lastName };
    }
}