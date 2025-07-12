const request = require('supertest');
const app = require('../src/app'); // Adjust the path if necessary
const Vendor = require('../src/models/Vendor');

describe('Vendor API', () => {
    beforeEach(async () => {
        await Vendor.deleteMany({});
    });

    describe('POST /vendors', () => {
        it('should create a new vendor', async () => {
            const vendorData = {
                name: 'Test Vendor',
                email: 'vendor@example.com',
                phone: '1234567890',
                address: '123 Vendor St, City, Country'
            };

            const response = await request(app)
                .post('/vendors')
                .send(vendorData)
                .expect(201);

            expect(response.body).toHaveProperty('_id');
            expect(response.body.name).toBe(vendorData.name);
        });

        it('should return 400 if vendor data is invalid', async () => {
            const vendorData = {
                name: '',
                email: 'invalid-email',
                phone: '123',
                address: ''
            };

            const response = await request(app)
                .post('/vendors')
                .send(vendorData)
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });
    });

    describe('GET /vendors', () => {
        it('should return all vendors', async () => {
            const vendorData = {
                name: 'Test Vendor',
                email: 'vendor@example.com',
                phone: '1234567890',
                address: '123 Vendor St, City, Country'
            };

            await new Vendor(vendorData).save();

            const response = await request(app)
                .get('/vendors')
                .expect(200);

            expect(response.body).toHaveLength(1);
            expect(response.body[0].name).toBe(vendorData.name);
        });
    });

    // Additional tests for other vendor-related functionalities can be added here
});