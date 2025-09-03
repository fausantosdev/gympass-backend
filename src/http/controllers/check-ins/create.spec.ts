import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'PHP gym',
        latitude: -8.060762,
        longitude: -34.881666
      }
    })

    const createGymResponse = await request(app.server)
      .post(`/check-ins/${gym.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -8.060762,
        longitude: -34.881666
      })

    expect(createGymResponse.statusCode).toEqual(201)
  })
})
