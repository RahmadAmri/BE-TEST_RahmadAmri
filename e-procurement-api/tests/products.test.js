const request = require('supertest');
const app = require('../src/app');
const Product = require('../src/models/Product');

describe('Product API', () => {
    beforeEach(async () => {
        await Product.deleteMany({});
    });

    it('should create a new product', async () => {
        const res = await request(app)
            .post('/api/products')
            .send({
                name: 'Test Product',
                price: 100,
                vendorId: 'vendorId123'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('product');
        expect(res.body.product.name).toBe('Test Product');
    });

    it('should get all products', async () => {
        await Product.create({
            name: 'Test Product',
            price: 100,
            vendorId: 'vendorId123'
        });

        const res = await request(app).get('/api/products');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('products');
        expect(res.body.products.length).toBeGreaterThan(0);
    });

    it('should update a product', async () => {
        const product = await Product.create({
            name: 'Test Product',
            price: 100,
            vendorId: 'vendorId123'
        });

        const res = await request(app)
            .put(`/api/products/${product._id}`)
            .send({
                name: 'Updated Product',
                price: 150
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('product');
        expect(res.body.product.name).toBe('Updated Product');
    });

    it('should delete a product', async () => {
        const product = await Product.create({
            name: 'Test Product',
            price: 100,
            vendorId: 'vendorId123'
        });

        const res = await request(app).delete(`/api/products/${product._id}`);

        expect(res.statusCode).toEqual(204);
    });
});