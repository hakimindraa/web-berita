// Seed script for PostgreSQL
// Run with: npx prisma db seed

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
    { name: 'Politik', slug: 'politik', color: 'politik' },
    { name: 'Ekonomi', slug: 'ekonomi', color: 'ekonomi' },
    { name: 'Teknologi', slug: 'teknologi', color: 'teknologi' },
    { name: 'Olahraga', slug: 'olahraga', color: 'olahraga' },
    { name: 'Hiburan', slug: 'hiburan', color: 'hiburan' },
    { name: 'Kesehatan', slug: 'kesehatan', color: 'kesehatan' },
];

async function main() {
    console.log('🌱 Seeding database...');

    for (const category of categories) {
        const existing = await prisma.category.findUnique({
            where: { slug: category.slug }
        });

        if (!existing) {
            await prisma.category.create({ data: category });
            console.log(`✅ Created category: ${category.name}`);
        } else {
            console.log(`⏭️  Category already exists: ${category.name}`);
        }
    }

    console.log('✨ Seeding complete!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
