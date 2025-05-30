export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T | null;
    error?: any;
}

export class ResponseUtil {
    static success<T>(data: T, message: string = 'Success', statusCode: number = 200): ApiResponse<T> {
        return { success: true, statusCode, message, data, error: null };
    }

    static created<T>(data: T, message: string = 'Resource created successfully'): ApiResponse<T> {
        return this.success(data, message, 201);
    }

    static ok<T>(data: T, message: string = 'Request successful'): ApiResponse<T> {
        return this.success(data, message, 200);
    }

    static error(message: string, statusCode: number, error?: any): ApiResponse<null> {
        return { success: false, statusCode, message, data: null, error };
    }

    static unauthorized(message: string = 'Unauthorized access', error?: any): ApiResponse<null> {
        return this.error(message, 401, error);
    }

    static forbidden(message: string = 'Forbidden access', error?: any): ApiResponse<null> {
        return this.error(message, 403, error);
    }

    static notFound(message: string = 'Resource not found', error?: any): ApiResponse<null> {
        return this.error(message, 404, error);
    }

    static internalServerError(message: string = 'Internal server error', error?: any): ApiResponse<null> {
        return this.error(message, 500, error);
    }
}