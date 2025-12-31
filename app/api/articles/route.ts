import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/articles - List all articles
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const categorySlug = searchParams.get('category');
        const featured = searchParams.get('featured');
        const trending = searchParams.get('trending');
        const limit = searchParams.get('limit');

        const where: Record<string, unknown> = {};

        if (categorySlug) {
            where.category = { slug: categorySlug };
        }
        if (featured === 'true') {
            where.isFeatured = true;
        }
        if (trending === 'true') {
            where.isTrending = true;
        }

        const articles = await prisma.article.findMany({
            where,
            include: {
                category: true
            },
            orderBy: { publishedAt: 'desc' },
            take: limit ? parseInt(limit) : undefined
        });

        return NextResponse.json(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json(
            { error: 'Failed to fetch articles' },
            { status: 500 }
        );
    }
}

// POST /api/articles - Create a new article
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            title,
            excerpt,
            content,
            image,
            imageType,
            author,
            categoryId,
            readTime,
            isFeatured,
            isTrending
        } = body;

        // Validate required fields
        if (!title || !excerpt || !content || !image || !author || !categoryId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Generate slug from title
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();

        // Check if slug already exists
        const existingArticle = await prisma.article.findUnique({
            where: { slug }
        });

        const finalSlug = existingArticle
            ? `${slug}-${Date.now()}`
            : slug;

        const article = await prisma.article.create({
            data: {
                slug: finalSlug,
                title,
                excerpt,
                content,
                image,
                imageType: imageType || 'url',
                author,
                categoryId,
                readTime: readTime || 3,
                isFeatured: isFeatured || false,
                isTrending: isTrending || false,
            },
            include: {
                category: true
            }
        });

        return NextResponse.json(article, { status: 201 });
    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json(
            { error: 'Failed to create article' },
            { status: 500 }
        );
    }
}
