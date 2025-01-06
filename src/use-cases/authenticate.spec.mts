import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './error/invalid-credentials-error'

// base das piramedes de teste = sao os testes unitarios


let usersRepository:InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {

    // sut - system under test

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456,'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to authenticate with wrong email', async () => {
    // sut - system under test

    expect(() => sut.execute({
      email: 'johndoe@example.com',
      password: '1234567890,'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)

  })

  it('should be able to authenticate with wrong password', async () => {
    // sut - system under test

    expect(() => sut.execute({
      email: 'johndoe@example.com',
      password: '1234567890,'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)

  })
  
})