const chai = require('chai')
const assert = chai.assert

const fetch = require('node-fetch')
const apiServer = require('../server')

const port = 4044;
const serverUrl = `http://localhost:${port}`

const encodeParams = params => Object.keys(params).map((key) => {
  return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
}).join('&');

describe('Tasks server:', () => {
  before((done) => apiServer.listen(port, done))
  after(() => apiServer.close())

  describe('Authorization', () => {
    it('should authorize', async function () {
      const authResponse = await fetch(`${serverUrl}/api/login`,{
      method: 'POST',
      type: 'form',
      credentials: 'same-origin',
      headers: {
        Authorization: 'Basic ANsdf23fvjbggy2345opx3[s23d4v4ji',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body : encodeParams({username: 'admin', password: 'admin'}),
    });
      assert(authResponse.ok, '/login response ok')
      const authJson = await authResponse.json()
      assert(authJson.username, 'got token')
    })
  })
})
