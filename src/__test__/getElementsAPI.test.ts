import {jest, describe, beforeAll, afterAll, test, expect} from "@jest/globals"
import Fastify from "fastify";
import {bootstrap} from 'fastify-decorators'
import path from "path";
import AddressService from '../backend/endpoints/services/Address.service';

// Mockez vos services
jest.mock('../backend/endpoints/services/Address.service', () => ({
    AddressService: jest.fn().mockImplementation(() => ({
        // Implémentez vos méthodes mockées ici
        getAllAddresses: jest.fn().mockReturnValue(1),
    })),
}));

describe('Should get Address', () => {
    let fastify;

    beforeAll(async () => {
        fastify = Fastify();

        // Chargez vos contrôleurs et services avec les mocks
        await bootstrap(fastify, {
            directory: path.join(__dirname, '../backend/endpoints/controllers'),
            mask: /\.controller\.ts$/,
            mock: true, // Activez le mode de mock
        });

        await fastify.ready();
    });

    afterAll(async () => {
        await fastify.close();
    });

    test('Test du endpoint avec service mocké', async () => {
        const response = await fastify.inject({
            method: 'GET',
            url: '/all',
        });

        expect(response.statusCode).toBe(200);
        expect(response.payload).toBe(1); // Vérifiez la réponse en fonction du mock
    });
});