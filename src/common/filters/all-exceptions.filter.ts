import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ResponseUtil, ApiResponse } from '../utils/response.util';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest();

        let status: number;
        let message: string;
        let errorDetails: any;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            message = typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as any).message || exception.message;
            errorDetails = typeof exceptionResponse === 'object' ? exceptionResponse : { error: exception.message };
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Internal server error';
            errorDetails = exception instanceof Error ? { error: exception.message, stack: exception.stack } : exception;
        }

        let apiResponse: ApiResponse<null>;
        switch (status) {
            case HttpStatus.UNAUTHORIZED: //401
                apiResponse = ResponseUtil.unauthorized(message, errorDetails);
                break;
            case HttpStatus.FORBIDDEN: //403
                apiResponse = ResponseUtil.forbidden(message, errorDetails);
                break;
            case HttpStatus.NOT_FOUND: //404
                apiResponse = ResponseUtil.notFound(message, errorDetails);
                break;
            case HttpStatus.INTERNAL_SERVER_ERROR: // 500
                apiResponse = ResponseUtil.internalServerError(message, errorDetails);
                break;
            default:
                apiResponse = ResponseUtil.error(message, status, errorDetails);
        }

        response.status(status).json({
            ...apiResponse,
            error: {
                ...apiResponse.error,
                timestamp: new Date().toISOString(),
                path: request.url,
            },
        });
    }
}