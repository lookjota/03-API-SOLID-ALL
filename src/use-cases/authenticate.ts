import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./error/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor( private usersRepository: UsersRepository) {}

  async execute({ 
    email, 
    password 
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    //auth
    // buscar o usuario no banco pelo e-mail
    // comparar se a senha salva no banco bate com a senha do parametro
    const user = await this.usersRepository.findByEmail(email)
    
    if (!user) {
      throw new InvalidCredentialsError()
    }
    // Boolean => true
    
    const doesPasswordMatches = await compare(password, user.password_hash)

    if (doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }
      
    return {
      user,
    }

  }
}