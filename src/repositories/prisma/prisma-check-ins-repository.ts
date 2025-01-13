import { checkIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })
    return checkIn
  }
  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_Id: userId
      },
      skip: (page - 1) * 20,
      take: 20
    })
    return checkIns
  }
  async countByUserId(userId: string){
    const count = await prisma.checkIn.count({
      where: {
        user_Id: userId
      },
    })
    return count
  }
  async create(data: Prisma.checkInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })
    return checkIn 
  }
  async findByUserIdOnData(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')
    
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_Id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        }
      }
    })
    return checkIn
  }
  
  async save(data: checkIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })
    return checkIn
  }

}