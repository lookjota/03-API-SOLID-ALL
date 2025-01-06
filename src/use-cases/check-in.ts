import { CheckInsRepository } from "@/repositories/check-ins-repository"
import { checkIn } from "@prisma/client"


interface CheckInUseCaseRequest {
  userId: string,
  gymId: string
}

interface CheckInUseCaseResponse {
  checkIn: checkIn
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnData(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInsRepository.create({
      gym_Id: gymId,
      user_Id: userId,
    })

    return {
      checkIn
    }
  }
}