import { IsString, IsNumber, IsDateString, Min } from 'class-validator';

export class CreateExpenseDto {
    @IsString()
    description: string;

    @IsNumber()
    @Min(0)
    amount: number;

    @IsDateString()
    date: string;

    @IsString()
    category: string;
}