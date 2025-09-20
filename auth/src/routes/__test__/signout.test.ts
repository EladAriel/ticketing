import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signing out', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    const cookie = response.get('Set-Cookie');

    if(!cookie) {
        throw new Error("Expected cookie but got undefined.");
    }

    await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(200);

    expect(cookie[0]);
});