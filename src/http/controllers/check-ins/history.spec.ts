import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Check-ins history (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list the history of check-ins', async () => {
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

    const checkInsHystoryResponse = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(checkInsHystoryResponse.statusCode).toEqual(200)
    expect(checkInsHystoryResponse.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id
      }),
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id
      })
    ])
  })
})
