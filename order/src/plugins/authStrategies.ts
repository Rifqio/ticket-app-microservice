import { Server } from '@hapi/hapi';
import Jwt, { HapiJwt } from '@hapi/jwt';

const authStrategies = {
    name: 'Auth',
    register: async (server: Server) => {
        await server.register(Jwt);
        server.auth.strategy('jwt', 'jwt', {
            keys: process.env.JWT_SECRET as string,
            verify: {
                aud: false,
                iss: false,
                sub: false,
                nbf: true,
                exp: true,
                maxAgeSec: 14400,
                timeSkewSec: 15
            },
            validate: (artifacts: HapiJwt.Artifacts) => {
                const credentials = {
                    id: artifacts.decoded.payload.id,
                    email: artifacts.decoded.payload.email
                };

                return { isValid: true, credentials };
            }
        });
        server.auth.default('jwt');
    }
};

export default authStrategies;
