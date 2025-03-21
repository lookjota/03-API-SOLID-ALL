import fastify from 'fastify'
import { gymsRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from '@/env'
import fastifyJwt from '@fastify/jwt'
import { usersRoutes } from './http/controllers/gyms/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'default_secret'
})

app.register(usersRoutes)
app.register(gymsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // todo gere we should log to on external tool like dataDos/NewRelix/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.'})
})