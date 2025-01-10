import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { ResourceNotFoundError } from "./error/resource-not-found-error";

  let checkInsRepository: InMemoryCheckInsRepository
  let sut: ValidateCheckInUseCase

  describe('Validate Check-in Use Case', () => {
    beforeEach(async () => {
      checkInsRepository = new InMemoryCheckInsRepository()
      sut = new ValidateCheckInUseCase(checkInsRepository)


      //vi.useFakeTimers()
    })

    afterEach( () => {
      //vi.useRealTimers()
    })

    it('Should be able to validate the check-in', async () => {

      const createdCheckIn = await checkInsRepository.create({
        gym_Id: 'gym-01',
        user_Id: 'user-01',
      })

       const { checkIn } = await sut.execute({
        checkInId: createdCheckIn.id,
      })


      expect(checkIn.validated_at).toEqual(expect.any(Date))
      expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
    })

    it('Should not be able to validate an inexistent check-in', async () => {
      await expect(() =>
        sut.execute({
          checkInId: 'inexistent-check-in-id',
        }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)

    })

  })

  