import { expect, describe, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate with valid credentials', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(inMemoryUsersRepository)

    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('password123', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: 'password123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to authenticate within valid credentials', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(inMemoryUsersRepository)

    await expect(
      async () =>
        await sut.execute({
          email: 'johndoe@example.com',
          password: 'password123',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate with wrong password', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(inMemoryUsersRepository)

    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('password123', 6),
    })

    await expect(async () =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'password123455',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
