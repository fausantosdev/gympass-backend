import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Typescript Gym',
        phone: null,
        description: 'Some description',
        latitude: -8.0623634,
        longitude: -34.8859246
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        phone: null,
        description: 'Some description',
        latitude: -8.0623634,
        longitude: -34.8859246
      })

    const searchResponse = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'Javascript'
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(searchResponse.statusCode).toEqual(200)
    expect(searchResponse.body.gyms).toHaveLength(1)
    expect(searchResponse.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Javascript Gym'
      })
    ])
  })
})
