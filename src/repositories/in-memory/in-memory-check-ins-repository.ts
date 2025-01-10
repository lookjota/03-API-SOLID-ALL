import { checkIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";


export class InMemoryCheckInsRepository implements CheckInsRepository {

  public items: checkIn[] = []

  async findById(id: string) {
    const checkIn = this.items.find((item) => item.id === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async findByUserIdOnData(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')
    

    const checkInOnSameData = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)
    
      return checkIn.user_Id === userId && isOnSameDate
    })
        
    if(!checkInOnSameData){
      return null
    }
    
    return checkInOnSameData 
  }
  
  async findManyByUserId(userId: string, page: number) {
      return this.items
        .filter((checkIn) => checkIn.user_Id === userId)
        .slice((page -1) * 20, page * 10)
  }

  async countByUserId(userId: string) {
    return this.items.filter((item) => item.user_Id === userId).length      
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

  async save(checkIn: checkIn) {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }

}