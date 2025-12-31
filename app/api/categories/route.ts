import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/categories - List all categories
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { articles: true }
                }
            },
            orderBy: { name: 'asc' }
        });

        const formattedCategories = categories.map(cat => ({
            ...cat,
            count: cat._count.articles
        }));

        return NextResponse.json(formattedCategories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json(
            { error: 'Failed to fetch categories' },
            { status: 500 }
        );
    }
}

// POST /api/categories - Create a new category
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, slug, color } = body;

        if (!name || !slug || !color) {
            return NextResponse.json(
                { error: 'Name, slug, and color are required' },
                { status: 400 }
            );
        }

        const category = await prisma.category.create({
            data: { name, slug, color }
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error('Error creating category:', error);
        return NextResponse.json(
            { error: 'Failed to create category' },
            { status: 500 }
        );
    }
}
