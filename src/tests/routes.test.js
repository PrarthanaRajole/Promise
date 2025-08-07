const request = require('supertest');
const express = require('express');
const { setRoutes } = require('../routes/index');

// Mock the entire controller
jest.mock('../controllers', () => {
    class IndexController {
        loginUser = jest.fn((req, res) => res.status(200).json({ message: 'Logged in' }));
        getCompanies = jest.fn((req, res) => res.status(200).json([]));
        createCompanies = jest.fn((req, res) => res.status(201).json({}));
        updateCompany = jest.fn((req, res) => res.status(200).json({}));
        deleteCompany = jest.fn((req, res) => res.status(204).end());

        getTransactions = jest.fn((req, res) => res.status(200).json([]));
        createTransactions = jest.fn((req, res) => res.status(201).json({}));
        updateTransaction = jest.fn((req, res) => res.status(200).json({}));
        deleteTransaction = jest.fn((req, res) => res.status(204).end());

        getUsers = jest.fn((req, res) => res.status(200).json([]));
        createUsers = jest.fn((req, res) => res.status(201).json({}));
        updateUser = jest.fn((req, res) => res.status(200).json({}));
        deleteUser = jest.fn((req, res) => res.status(204).end());

        getWatchlist = jest.fn((req, res) => res.status(200).json([]));
        addToWatchlist = jest.fn((req, res) => res.status(201).json({}));
        removeFromWatchlist = jest.fn((req, res) => res.status(204).end());
    }
    return { IndexController };
});

let app;

beforeEach(() => {
    app = express();
    app.use(express.json());
    setRoutes(app);
});

describe('Route setup test', () => {
    it('should return 200 OK on /api/companies GET', async () => {
        const res = await request(app).get('/api/companies');
        expect(res.status).toBe(200);
    });

    it('should return 201 Created on /api/users POST', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({ name: "Test User", email: "test@example.com", password_hash: "abc123" });
        expect(res.status).toBe(201);
    });

    it('should return 200 OK on /api/login POST', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ email: "test@example.com", password: "abc123" });
        expect(res.status).toBe(200);
    });

    it('should return 204 No Content on /api/watchlist DELETE', async () => {
        const res = await request(app)
            .delete('/api/watchlist')
            .send({ user_id: 1, ticker_symbol: "AAPL" });
        expect(res.status).toBe(204);
    });
});
