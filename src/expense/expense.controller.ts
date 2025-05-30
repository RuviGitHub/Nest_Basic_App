import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense } from './entities/expense.entity';
import { ResponseUtil, ApiResponse } from '../common/utils/response.util';

@Controller('expenses')
export class ExpenseController {
    constructor(private readonly expensesService: ExpenseService) { }

    @Post()
    async create(@Body() createExpenseDto: CreateExpenseDto): Promise<ApiResponse<Expense>> {
        const expense = await this.expensesService.create(createExpenseDto);
        return ResponseUtil.created(expense);
    }

    @Get()
    async findAll(): Promise<ApiResponse<Expense[]>> {
        const expenses = await this.expensesService.findAll();
        return ResponseUtil.ok(expenses);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Expense>> {
        const expense = await this.expensesService.findOne(id);
        return ResponseUtil.ok(expense);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() createExpenseDto: CreateExpenseDto,
    ): Promise<ApiResponse<Expense>> {
        const expense = await this.expensesService.update(id, createExpenseDto);
        return ResponseUtil.ok(expense, 'Expense updated successfully');
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<null>> {
        await this.expensesService.remove(id);
        return ResponseUtil.ok(null, 'Expense deleted successfully');
    }
}