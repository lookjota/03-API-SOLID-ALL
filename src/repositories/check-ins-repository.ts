import { checkIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
  create(data: Prisma.checkInUncheckedCreateInput): Promise<checkIn>
  findByUserIdOnData(userId: string, date: Date): Promise<checkIn | null>
}