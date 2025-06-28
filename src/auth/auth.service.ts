import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { commonResponse, GoogleAccount } from './dto';
import ENV from 'src/config';

@Injectable()
export class AuthService {
    constructor(private readonly authRepository: AuthRepository, private readonly jwtService: JwtService) { }

    async signWithGoogle(user: GoogleAccount) {
        if (!user) {
            throw new NotFoundException('Email not found in google!');
        }

        const { email, firstName, lastName, picture } = user;

        const existUser = await this.authRepository.findByEmail(email);

        const tokenParams = {
            email,
            firstName,
            lastName,
            sub: user.userId
        }
        console.log(ENV.JWT.SECRET)

        const newToken = this.jwtService.sign(tokenParams, { 
            issuer: ENV.JWT.ISSUER,
            secret: ENV.JWT.SECRET
         });

        if (existUser) {
            Logger.debug('[SERVICE] Handle login existing google user')

            return {
                email: existUser.email,
                firstName: existUser.firstName,
                lastName: existUser.lastName,
                token: newToken
            }
        }

        Logger.debug('[SERVICE] Handle login new google user')

        const savedUser = await this.authRepository.createOne({
            firstName,
            lastName,
            email,
            phoneNumber: null,
            profilePics: picture,
        });

        return {
            email: savedUser.email,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            token: newToken
        }
    }
}
