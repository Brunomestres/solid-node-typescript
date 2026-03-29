import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async create(data) {
        return {
          id: 'user-id',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
      async findByEmail(email) {
        return null
      },
    })

    const user = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    })
    const isPasswordHashed = await compare(
      'password123',
      user.user.password_hash,
    )
    expect(isPasswordHashed).toBe(true)
  })
})
