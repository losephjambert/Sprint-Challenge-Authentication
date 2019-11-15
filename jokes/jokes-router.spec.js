const request = require('supertest');

const server = require('../api/server.js');

describe('jokes router', function() {
  describe('GET /api/jokes', function() {
    it('should return 200 OK', function() {
      return request(server)
        .get('/api/jokes')
        .set({
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhdG1hbiIsImlhdCI6MTU3MzgzODUxNiwiZXhwIjoxNTczOTI0OTE2fQ.BBguIOJywHIwEngAnanAJ5ldhHmSmF8LOxOcWw1969I',
        })
        .then(function(res) {
          expect(res.status).toBe(200);
        });
    });

    it('should return JSON formatted response', function() {
      return request(server)
        .get('/api/jokes')
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });
});
