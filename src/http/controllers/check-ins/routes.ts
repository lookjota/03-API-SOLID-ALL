import { verifyJWT } from "@/http/middlewares/verify-jwt";
import type { FastifyInstance } from "fastify";


export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
}