import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IsString, IsInt, Min, IsBoolean, validateSync } from 'class-validator';
import { Expense } from 'src/expense/entities/expense.entity';

class DatabaseConfig {
    @IsString()
    DB_HOST: string = 'localhost';

    @IsInt()
    @Min(1)
    DB_PORT: number = 5432;

    @IsString()
    DB_USERNAME: string = 'postgres';

    @IsString()
    DB_PASSWORD: string = 'postgres';

    @IsString()
    DB_NAME: string = 'expen6';

    @IsBoolean()
    DB_SYNCHRONIZE: boolean = false;
}

@Injectable()
export class TypeOrmConfigService {
    private readonly logger = new Logger(TypeOrmConfigService.name);

    constructor(private configService: ConfigService) {
        this.validateConfig();
    }

    private validateConfig() {
        const config = new DatabaseConfig();
        Object.assign(config, {
            DB_HOST: this.configService.get<string>('DB_HOST', 'localhost'),
            DB_PORT: parseInt(this.configService.get<string>('DB_PORT', '5432'), 10),
            DB_USERNAME: this.configService.get<string>('DB_USERNAME', 'postgres'),
            DB_PASSWORD: this.configService.get<string>('DB_PASSWORD', 'postgres'),
            DB_NAME: this.configService.get<string>('DB_NAME', 'expen6'),
            DB_SYNCHRONIZE: this.configService.get<boolean>('DB_SYNCHRONIZE', false),
        });

        const errors = validateSync(config);
        if (errors.length > 0) {
            this.logger.error('Database configuration validation failed:', errors);
            throw new Error('Invalid database configuration');
        }
    }

    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
        // return your TypeORM config object here
        return {
            // example config, replace with your actual config
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT ?? '5432', 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
        };
    }

    getTypeOrmConfig(): TypeOrmModuleOptions {
        const port = parseInt(this.configService.get<string>('DB_PORT', '5432'), 10);
        if (isNaN(port)) {
            this.logger.error('DB_PORT must be a valid number');
            throw new Error('Invalid DB_PORT configuration');
        }

        return {
            type: 'postgres',
            host: this.configService.get<string>('DB_HOST', 'localhost'),
            port,
            username: this.configService.get<string>('DB_USERNAME', 'postgres'),
            password: this.configService.get<string>('DB_PASSWORD', 'postgres'),
            database: this.configService.get<string>('DB_NAME', 'expen6'),
            entities: [Expense],
            synchronize: this.configService.get<boolean>('DB_SYNCHRONIZE', false),
            logging: ['error', 'warn'],
            maxQueryExecutionTime: 1000,
        };
    }
}