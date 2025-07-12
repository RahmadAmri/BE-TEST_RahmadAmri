const request = require('supertest');
const app = require('../src/app'); // Adjust the path if necessary
const User = require('../src/models/User');

describe('Authentication API', () => {
    beforeAll(async () => {
        await User.deleteMany({}); // Clear the database before tests
    });

    describe('POST /auth/register', () => {
        it('should register a new user', async () => {
            const response = await request(app)
                .post('/auth/register')
                .send({
                    username: 'testuser',
                    password: 'testpassword',
                    email: 'testuser@example.com'
                });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('token');
        });

        it('should return 400 if user already exists', async () => {
            await request(app)
                .post('/auth/register')
                .send({
                    username: 'testuser',
                    password: 'testpassword',
                    email: 'testuser@example.com'
                });

            const response = await request(app)
                .post('/auth/register')
                .send({
                    username: 'testuser',
                    password: 'testpassword',
                    email: 'testuser@example.com'
                });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('User already exists');
        });
    });

    describe('POST /auth/login', () => {
        it('should login an existing user', async () => {
            await request(app)
                .post('/auth/register')
                .send({
                    username: 'testuser',
                    password: 'testpassword',
                    email: 'testuser@example.com'
                });

            const response = await request(app)
                .post('/auth/login')
                .send({
                    username: 'testuser',
                    password: 'testpassword'
                });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });

        it('should return 401 for invalid credentials', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    username: 'testuser',
                    password: 'wrongpassword'
                });
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid credentials');
        });
    });
});