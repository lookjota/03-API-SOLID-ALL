import { checkIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
  countByUserId(userId: string): Promise<number>
  findManyByUserId(userId: string, page: number): Promise<checkIn[]>
  findById(id: string): Promise<checkIn | null>
  create(data: Prisma.checkInUncheckedCreateInput): Promise<checkIn>
  findByUserIdOnData(userId: string, date: Date): Promise<checkIn | null>
  save(checkIn: checkIn): Promise<checkIn>
}