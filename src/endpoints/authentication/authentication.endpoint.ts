import { BaseEndpoint } from '../endpoint.base'
import { deserialize } from '@deepkit/type'
import { TokensResponse } from './dto/tokens.response'
import { KientAuthenticationError } from './authentication.error'
import { LoginErrorResponse, LoginResponse } from './dto/login.response'
import { UserResponse } from './dto/user.response'
import { KientApiError } from '../api.error'

interface LoginCredentials {
  email: string
  password: string
  otc?: number | string
}

export class AuthenticationEndpoint extends BaseEndpoint {
  public async getTokens() {
    const response = await this._apiClient.callKickApi({ endpoint: 'kick-token-provider' })
    if (response.status !== 200) {
      console.log(response.status, response.body)
      throw new KientApiError({
        name: 'SOMETHING_WENT_WRONG',
        message: 'Failed to retrieve pre-login tokens'
      })
    }
    return deserialize<TokensResponse>(response.body)
  }

  public async login(credentials: LoginCredentials) {
    const tokens = await this.getTokens()
    const body = {
      email: credentials.email,
      password: credentials.password,
      one_time_password: credentials.otc,
      [tokens.nameFieldName]: '',
      [tokens.validFromFieldName]: tokens.encryptedValidFrom,
      isMobileRequest: true
    }
    const response = await this._apiClient.callKickApi({
      endpoint: 'mobile/login',
      method: 'post',
      options: {
        body: JSON.stringify(body)
      }
    })

    if (response.status === 422) {
      const responseBody = deserialize<LoginErrorResponse>(response.body)
      if (responseBody.message === 'Username or password is not correct') {
        throw new KientAuthenticationError({
          name: 'INCORRECT_CREDENTIALS',
          message: responseBody.message
        })
      }
      if (responseBody.message === 'The given data was invalid.') {
        throw new KientAuthenticationError({
          name: 'INVALID_CREDENTIALS',
          message: responseBody.message
        })
      }
    }

    if (response.status === 400) {
      const responseBody = deserialize<LoginErrorResponse>(response.body)
      if (responseBody.message === 'Invalid OTP') {
        throw new KientAuthenticationError({
          name: 'INVALID_2FA_CODE',
          message: 'Provided one time code is incorrect'
        })
      }
    }

    if (response.status === 200) {
      const responseBody = deserialize<LoginResponse>(response.body)
      if (responseBody.token) {
        this._apiClient.setBearerToken(responseBody.token)
        this._client.authenticated = true
        return
      }
      let errorMessage = ''
      if (responseBody.otp_required) {
        errorMessage = 'Login requires one time code from email'
      }
      if (responseBody['2fa_required']) {
        errorMessage = 'Login requires authenticator app token'
      }
      throw new KientAuthenticationError({
        name: '2FA_REQUIRED',
        message: errorMessage
      })
    }

    throw new KientApiError({
      name: 'SOMETHING_WENT_WRONG',
      message: 'Unknown authentication error when attemping login'
    })
  }

  public async currentUser() {
    if (!this._client.authenticated) {
      throw new KientApiError({ name: 'UNAUTHENTICATED' })
    }
    const response = await this._apiClient.callKickApi({ endpoint: 'api/v1/user' })
    const deserializedBody = deserialize<UserResponse>(response.body)
    if (!deserializedBody.id) {
      throw new KientApiError({ name: 'UNAUTHENTICATED' })
    }
    return deserialize<UserResponse>(response.body)
  }
}
