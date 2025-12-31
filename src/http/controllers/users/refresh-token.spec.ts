import { app } from '@/app'
import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should to be able to refresh token', async () => {
    await request(app.server).post('/users').send({
      name: 'Jhon Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456'
    })

    const cookies = response.get('Set-Cookie')

    const responseRefreshToken = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies!)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
    expect(responseRefreshToken.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken=')
    ])
  })
})
