import { NestFactory } from '@nestjs/core';
import { AppModule } from '../backend/src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

let app: any;

async function bootstrap() {
    if (!app) {
        app = await NestFactory.create(AppModule, new ExpressAdapter(server));

        app.enableCors({
            origin: process.env.FRONTEND_URL || '*',
            credentials: true,
        });

        app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
        app.setGlobalPrefix('api');

        await app.init();
    }
    return server;
}

export default async function handler(req: any, res: any) {
    const expressApp = await bootstrap();
    expressApp(req, res);
}
