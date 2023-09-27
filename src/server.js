const fastify = require('fastify')({ logger: true });
const autoload = require('@fastify/autoload');
const path = require('path');

let user = process.env.DB_USER;
let password = process.env.DB_PASSWORD;
let host = process.env.DB_HOST;
let port = process.env.DB_PORT;
let db = process.env.DATABASE;

fastify.register(require('@fastify/mongodb'), {
    forceClose: true,
    url: `mongodb://${user}:${password}@${host !== "" ? host : "localhost"}:${port}/${db}`
});

fastify.register(autoload, {
    dir: path.join(__dirname, 'routers'),
    dirNameRoutePrefix: false,
});

// ... rest of the file



const start = async () => {
    try {
        await fastify.listen(3001, '0.0.0.0');
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
