export interface CreateUserDto {
        firstName: string | null
        lastName: string | null
        email: string | null
        profilePics: string | null
        password: string | null
        isRegisterWithLocal: boolean
        isVerified: boolean
        occupation: string | null
        dob: string | null
}

export interface GoogleAccount {
        userId: string
        email: string
        firstName: string
        lastName: string
        picture: string
        googleToken: string
}

export interface LocalAccount {
        email: string,
        password: string
}

export interface UserAdditionalData {
        email: string
        firstName: string
        lastName: string
        occupation: string
        gender: string
        dob: string
}

export const commonResponse = (message: string, data: any) => {
        return {
                message,
                data
        }
}