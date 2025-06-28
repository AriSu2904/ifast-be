import moment from "moment"

export const castDob = (dob: string) => {
    return moment(dob).toDate()
}