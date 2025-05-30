import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpenseService {
    private readonly logger = new Logger(ExpenseService.name);

    constructor(
        @InjectRepository(Expense)
        private readonly expenseRepository: Repository<Expense>,
    ) { }

    async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
        this.logger.log(`Creating expense: ${JSON.stringify(createExpenseDto)}`);
        const expense = this.expenseRepository.create(createExpenseDto);
        return this.expenseRepository.save(expense);
    }

    async findAll(): Promise<Expense[]> {
        this.logger.log('Fetching all expenses');
        return this.expenseRepository.find();
    }

    async findOne(id: number): Promise<Expense> {
        this.logger.log(`Fetching expense with ID ${id}`);
        const expense = await this.expenseRepository.findOneBy({ id });
        if (!expense) {
            this.logger.warn(`Expense with ID ${id} not found`);
            throw new NotFoundException(`Expense with ID ${id} not found`);
        }
        return expense;
    }

    async update(id: number, createExpenseDto: CreateExpenseDto): Promise<Expense> {
        this.logger.log(`Updating expense with ID ${id}`);
        const expense = await this.findOne(id);
        Object.assign(expense, createExpenseDto);
        return this.expenseRepository.save(expense);
    }

    async remove(id: number): Promise<void> {
        this.logger.log(`Deleting expense with ID ${id}`);
        const result = await this.expenseRepository.delete(id);
        if (result.affected === 0) {
            this.logger.warn(`Expense with ID ${id} not found`);
            throw new NotFoundException(`Expense with ID ${id} not found`);
        }
    }
}