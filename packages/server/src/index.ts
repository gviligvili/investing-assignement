import {startServer} from "./server";

async function bootstrapLogic() {
    // Here put the services dependencies the app needs. (Like connect to DB, redis, MQ)
}
export async function start() {
    await bootstrapLogic();
    const server = await startServer();
}

start();
