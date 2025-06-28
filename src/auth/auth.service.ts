import { Injectable, Logger, NotFoundException, ForbiddenException, UseFilters } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { GoogleAccount, LocalAccount, UserAdditionalData } from './dto';
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
        const newToken = this.jwtService.sign(tokenParams, {
            issuer: ENV.JWT.ISSUER,
            secret: ENV.JWT.SECRET
        });

        if (existUser) {
            Logger.debug('[AUTH] Handle login existing google user')

            return {
                email: existUser.email,
                firstName: existUser.firstName,
                lastName: existUser.lastName,
                token: newToken
            }
        }

        Logger.debug('[AUTH] Handle login new google user')

        const savedUser = await this.authRepository.createOne({
            firstName,
            lastName,
            email,
            profilePics: picture,
            password: null,
            isRegisterWithLocal: false,
            isVerified: true,
            occupation: null,
            dob: null
        });

        return {
            email: savedUser.email,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            token: newToken,
            additionalInfoRequired: {
                occupation: true,
                dob: true,
                gender: true
            }
        }
    }

    async signWithLocals(user: LocalAccount) {
        Logger.debug('[AUTH] Handle incoming sign with email');

        const { email, password } = user;

        const savedUser = await this.authRepository.findByEmail(email);

        if (savedUser) {
            Logger.debug('[AUTH] Handle sign locals for existing user');

            const params = {
                email: savedUser.email,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
            }

            const newToken = this.jwtService.sign(params, {
                issuer: ENV.JWT.ISSUER,
                secret: ENV.JWT.SECRET
            });
            return {
                ...params,
                token: newToken
            }
        }

        const encryptedPw = await bcrypt.hash(password, 10);

        const payloadUser = {
            email,
            firstName: null,
            lastName: null,
            password: encryptedPw,
            profilePics: null,
            isRegisterWithLocal: true,
            isVerified: false,
            occupation: null,
            dob: null
        }
        await this.authRepository.createOne(payloadUser);

        return {
            ...payloadUser,
            additionalInfoRequired: {
                firstName: true,
                lastName: true,
                occupation: true,
                dob: true,
                gender: true
            }
        }
    }

    async requiredAdditionals(additional: UserAdditionalData) {
        const { modifiedCount } = await this.authRepository.additionalUpdate(additional);

        if(modifiedCount === 0) {
            throw new NotFoundException('Failed update additional data due to user not found!');
        }

        if(modifiedCount > 1) {
            await this.authRepository.deleteOneByEmail(additional.email);
        }

        Logger.debug(`[AUTH] Successfully update user data ${modifiedCount}`);

        return {
            updatedData: modifiedCount
        }
    }

    async userProfile(user: any) {
        const { email } = user;

        const existUser = await this.authRepository.findByEmail(email);

        if(existUser) return existUser;

        throw new NotFoundException('User not found!')
    }
}
