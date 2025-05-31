import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import helmet from 'helmet';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  // Create Express app instance and disable 'X-Powered-By' header
  const expressApp = express();
  expressApp.disable('x-powered-by');

  // Create Nest app using Express adapter
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  // Use Helmet to add security headers (including hiding X-Powered-By)
  app.use(helmet({
    contentSecurityPolicy: false, // configure CSP as needed
  }));

  // Enable CORS with whitelist
  const allowedOrigins = ['https://yourdomain.com', 'https://anotherdomain.com'];
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  // Parse JSON request bodies with size limit
  app.use(express.json({ limit: '10mb' }));

  // Enable global validation pipe with transformation and whitelist
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Use global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Setup Swagger API docs
  const config = new DocumentBuilder()
    .setTitle('Expen6 API')
    .setDescription('API for expense tracking')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start listening on port 3000 or environment port
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
