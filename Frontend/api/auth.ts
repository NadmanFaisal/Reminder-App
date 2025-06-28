import api from "./api";

/**
 * Method responsible for signing in user to the system. 
 * The method sends an api call using HTTP requests, where 
 * the backend creates the user and stores it in the DB
 * @param email String email value of the user
 * @param username String username value of the user
 * @param password String password value of the user
 * @returns Response received from the backend.
 */
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

/**
 * Method responsible for logging in user to the system. 
 * The method sends an api call using HTTP requests, where 
 * the backend checks whether the user exists in the system, 
 * sends back a response from the backend.
 * @param email String email value of the user
 * @param username String username value of the user
 * @param password String password value of the user
 * @returns Response received from the backend.
 */
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

/**
 * This method sends an HTTP request to the backend with 
 * the token, validating it. If the token is invalid, the 
 * backend generates a new token and sends it as a response.
 * @param token Token which is set in the async storage.
 * @returns Response received from the backend.
 */
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