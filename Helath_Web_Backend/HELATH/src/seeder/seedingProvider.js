import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import your seeding data
import { blogCategoryData, roleData, superAdminData } from './seeding-data.js';


// Import your models
import Role from '../model/Role.js';
import User from '../model/User.js';
import BlogCategory from '../model/BlogCategory.js';

dotenv.config();

async function seedInitialData() {
    try {
        console.log('Checking database collections for seeding...');

        const models = [
            { model: BlogCategory, dataList: blogCategoryData, name: 'BlogCategory' },
            { model: Role, dataList: roleData, name: 'Role' },
            { model: User, dataList: superAdminData, name: 'User' },
        ];

        for (const { model, dataList, name } of models) {
            const count = await model.countDocuments();

            if (count === 0) {
                console.log(`${name} collection is empty. Seeding data...`);
                await model.insertMany(dataList);
                console.log(`${name} data seeded successfully.`);
            } else {
                console.log(`${name} collection already has data. Skipping seeding.`);
            }
        }

        console.log('Seeding process completed.');
    } catch (error) {
        console.error('Error during seeding process:', error);
    }
}

export default seedInitialData;