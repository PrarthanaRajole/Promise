
const { IndexController } = require('../controllers/index');
const { connectToDatabase } = require('../config/database');

jest.mock('../config/database');

describe('IndexController', () => {
    let controller;
    let mockDb;

    beforeEach(async () => {
        mockDb = {
            query: jest.fn()
        };
        connectToDatabase.mockResolvedValue(mockDb);
        controller = new IndexController();
        await controller.initDB();
    });

    describe('getCompanies', () => {
        it('should fetch companies and respond with data', async () => {
            const companies = [{ company_id: 1, name: 'Test Corp' }];
            mockDb.query.mockResolvedValue([companies]);

            const req = {};
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            await controller.getCompanies(req, res);

            expect(mockDb.query).toHaveBeenCalledWith('SELECT * FROM Companies');
            expect(res.json).toHaveBeenCalledWith(companies);
        });
    });

    describe('createCompanies', () => {
        it('should insert a company and respond with inserted data', async () => {
            const req = {
                body: {
                    ticker_symbol: 'TST',
                    company_name: 'Test Company',
                    sector: 'Tech',
                    stock_price: 100,
                    market_cap: 1000000
                }
            };

            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            mockDb.query.mockResolvedValue([{ insertId: 1 }]);

            await controller.createCompanies(req, res);

            expect(mockDb.query).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(req.body);
        });
    });
});
