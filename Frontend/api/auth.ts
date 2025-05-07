import api from "./api";

export default async function signupUser(email: string, username: string, password: string) {
    try {
        const response = api.post('/AuthenticationService/SignUp', {
            email, username, password, 
        })
        return response
    } catch (error: any) {
        const message = 'Signup failed: ' + error.response.data.message
        throw new Error(message);
    }
}