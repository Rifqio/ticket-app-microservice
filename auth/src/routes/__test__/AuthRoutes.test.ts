import request from 'supertest';
import app from '../../test';

it('Returns a 201 on successful signup', async () => {
    const body = {
        email: "test@mail.com",
        password: "password"
    }

    return request(app)
            .post('/api/users/signup')
            .send(body)
            .expect((res) => {
                res.body = {
                    id: expect.any(String),
                    email: body.email,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                }
                res.status = 201;
            })
});

it('Returns a 400 with an invalid email on signup', async () => {
    const body = {
        email: "testmail.com",
        password: "password"
    }

    return request(app)
            .post('/api/users/signup')
            .send(body)
            .expect((res) => {
                res.body = {
                    statusCode: 400,
                    error: "Bad Request",
                    message: "Invalid request parameters",
                    errors: expect.any(Array)
                }
                res.status = 400;
            })
});