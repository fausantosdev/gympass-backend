import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const userCoordinates = {
  userLatitude: -8.060762,
  userLongitude: -34.881666
}

const nearbyGymCoordinates = {
  latitude: -8.060762,
  longitude: -34.881666
}

const distantGymCoordinates = {
  latitude:-7.964660,
  longitude: -34.916624
}

describe('Nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should to be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Typescript Gym',
        phone: null,
        description: 'Some description',
        ...distantGymCoordinates
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        phone: null,
        description: 'Some description',
        ...nearbyGymCoordinates
      })

    const nearbyResponse = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: userCoordinates.userLatitude,
        longitude: userCoordinates.userLongitude
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(nearbyResponse.statusCode).toEqual(200)
    expect(nearbyResponse.body.gyms).toHaveLength(1)
    expect(nearbyResponse.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Javascript Gym'
      })
    ])
  })
})
