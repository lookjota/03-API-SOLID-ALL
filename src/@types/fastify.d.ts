import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyRequest {
    user: {
      sub: string
  }
}
}