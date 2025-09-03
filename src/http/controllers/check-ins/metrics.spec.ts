import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Check-in metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the total count of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'PHP gym',
        latitude: -8.060762,
        longitude: -34.881666
      }
    })

    const user = await prisma.user.findFirstOrThrow()

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id
        },
        {
          gym_id: gym.id,
          user_id: user.id
        }
      ]
    })

    const checkInsMetricsResponse = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(checkInsMetricsResponse.statusCode).toEqual(200)
    expect(checkInsMetricsResponse.body.checkInsCount).toEqual(2)
  })
})
