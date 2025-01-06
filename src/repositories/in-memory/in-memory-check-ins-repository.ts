import { checkIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";


export class InMemoryCheckInsRepository implements CheckInsRepository {

  public items: checkIn[] = []

  async findByUserIdOnData(userId: string, date: Date) {
    const checkInOnSameData = this.items.find
      (checkIn => checkIn.user_Id === userId,
    )

    if(!checkInOnSameData){
      return null
    }
    
    return checkInOnSameData 
  }

  async create(data: Prisma.checkInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_Id: data.user_Id,
      gym_Id: data.gym_Id,
      validated_at: data.validated_at ? new Date(data.validated_at): null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}