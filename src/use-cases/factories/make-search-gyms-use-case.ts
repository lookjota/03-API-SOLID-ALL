import { ValidateCheckInUseCase } from "../validate-check-in";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";


export function  makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new ValidateCheckInUseCase(gymsRepository)

  return useCase
} 