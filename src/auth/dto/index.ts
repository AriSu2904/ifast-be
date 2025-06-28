export interface CreateUserDto {
        firstName: string
        lastName: string
        email: string | null
        phoneNumber: string | null
        profilePics: string | null
}

export interface GoogleAccount {
        userId: string
        email: string,
        firstName: string,
        lastName: string,
        picture: string,
        googleToken: string
}

export const commonResponse = (message: string, data: any) => {
        return {
                message,
                data
        }
}