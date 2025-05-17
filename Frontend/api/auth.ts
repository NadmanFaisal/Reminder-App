import api from "./api";

export async function signupUser(email: string, username: string, password: string) {
    try {
        const response = await api.post('/AuthenticationService/SignUp', {
            email, username, password, 
        })
        return response
    } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          'Signup failed due to an unknown error.';
        throw new Error(message);
    }
}

export async function loginUser(email: string, password: string) {
    try {
        const response = await api.post('/AuthenticationService/LogIn', {
        email, password,
    })
    return response
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Login failed due to an unknown error.';
      throw new Error(message);
    }
}

export async function validateMe(token: string | null) {
  try {
    const response = await api.post('AuthenticationService/ValidateMe', {
      token
    })
    return response
  } catch (error: any) {
    const message =
        error?.response?.data?.message ||
        error?.message ||
        'Could not validate due to an unknown error.';
      throw new Error(message);
  }
}