import request from 'supertest'
import app from '../config/app'
import { noCache } from './no-cache'

describe('NoCache Middleware', () => {
  test('Should disable cache', async () => {
    app.get('/test_nocache', noCache, (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_nocache')
      .expect('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
