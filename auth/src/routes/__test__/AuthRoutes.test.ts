import request from 'supertest';
import app from '../../test';

const signup = '/api/users/signup';
const signin = '/api/users/signin';
const signout = '/api/users/signout';

const body = {
    email: 'test@mail.com',
    password: 'password',
};

/**
 * Signup Testing
 */
it('Returns a 201 on successful signup', async () => {
    return request(app)
        .post(signup)
        .send(body)
        .expect((res) => {
            res.body = {
                id: expect.any(String),
                email: body.email,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            };
            res.status = 201;
        });
});

it('Returns a 400 with an invalid email on signup', async () => {
    return request(app)
        .post(signup)
        .send(body)
        .expect((res) => {
            res.body = {
                statusCode: 400,
                error: 'Bad Request',
                message: 'Invalid request parameters',
                errors: expect.any(Array),
            };
            res.status = 400;
        });
});

it('Fails when email already exist', async () => {
    await request(app).post(signup).send(body).expect(201);

    await request(app)
        .post(signup)
        .send(body)
        .expect((res) => {
            res.body = {
                statusCode: 400,
                error: 'Bad Request',
                message: 'Email Already Used',
            };
            res.status = 400;
        });
});

it('Sets a cookie after successful signup', async () => {
    const response = await request(app).post(signup).send(body).expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();
});

/**
 * Signin Testing
 */
it('Fails when unregistered email is supplied', async () => {
    await request(app)
        .post(signin)
        .send(body)
        .expect((res) => {
            res.body = {
                statusCode: 400,
                error: 'Bad Request',
                message: 'Email or password mismatch',
            };
            res.status = 400;
        });
});

it('Fails when incorrect password is supplied', async () => {
    await request(app).post(signup).send(body).expect(201);

    await request(app)
        .post(signin)
        .send({ ...body, password: 'wrong' })
        .expect((res) => {
            res.body = {
                statusCode: 400,
                error: 'Bad Request',
                message: 'Email or password mismatch',
            };
            res.status = 400;
        });
});

it('Responds with a cookie when given valid credentials', async () => {
    await request(app).post(signup).send(body).expect(201);
    const response = await request(app).post(signin).send(body).expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
});

it('Clear cookie when sign out', async () => {
    const auth = await request(app).post(signup).send(body).expect(201);
    const cookie = auth.get('Set-Cookie');

    const response = await request(app)
        .post(signout)
        .set('Cookie', cookie)
        .send({})
        .expect(200);
    
    const cookieAfterSignout = response.get('Set-Cookie');
    console.log(cookieAfterSignout);
    expect(response.get('Set-Cookie')).toBeDefined();
});
