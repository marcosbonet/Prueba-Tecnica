import http from 'http';
import { dbConnect } from './db.connect/db.connect.js';
import { app } from './app.js';
import { CustomError } from './interfaces/error.js';
import createDebug from 'debug';

const debug = createDebug('FP:index');

const port = process.env.PORT || 3300;
const server = http.createServer(app);
server.on('listening', () => {
    const addr = server.address();
    if (addr === null) return;
    let bind: string;
    if (typeof addr === 'string') {
        bind = 'pipe ' + addr;
    } else {
        bind =
            addr.address === '::'
                ? `http://localhost:${addr?.port}`
                : `port ${addr?.port}`;
    }
    debug(`Listening on ${bind}`);
});

server.on('error', (error: CustomError, response: http.ServerResponse) => {
    response.statusCode = error?.statusCode;
    response.statusMessage = error?.statusMessage;
    response.write(error.message);
    response.end();
});

dbConnect()
    .then((mongoose) => {
        debug('DB:', mongoose.connection.db.databaseName);
        server.listen(port);
    })
    .catch((error) => server.emit(error));
