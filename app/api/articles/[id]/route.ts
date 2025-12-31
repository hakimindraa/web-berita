import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET /api/articles/[id] - Get single article
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;

        const article = await prisma.article.findUnique({
            where: { id },
            include: { category: true }
        });

        if (!article) {
            return NextResponse.json(
                { error: 'Article not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(article);
    } catch (error) {
        console.error('Error fetching article:', error);
        return NextResponse.json(
            { error: 'Failed to fetch article' },
            { status: 500 }
        );
    }
}

// PUT /api/articles/[id] - Update article
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
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

        // Check if article exists
        const existingArticle = await prisma.article.findUnique({
            where: { id }
        });

        if (!existingArticle) {
            return NextResponse.json(
                { error: 'Article not found' },
                { status: 404 }
            );
        }

        // Update slug if title changed
        let slug = existingArticle.slug;
        if (title && title !== existingArticle.title) {
            slug = title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();

            // Check if new slug exists
            const slugExists = await prisma.article.findFirst({
                where: {
                    slug,
                    id: { not: id }
                }
            });

            if (slugExists) {
                slug = `${slug}-${Date.now()}`;
            }
        }

        const article = await prisma.article.update({
            where: { id },
            data: {
                slug,
                title: title || existingArticle.title,
                excerpt: excerpt || existingArticle.excerpt,
                content: content || existingArticle.content,
                image: image || existingArticle.image,
                imageType: imageType || existingArticle.imageType,
                author: author || existingArticle.author,
                categoryId: categoryId || existingArticle.categoryId,
                readTime: readTime ?? existingArticle.readTime,
                isFeatured: isFeatured ?? existingArticle.isFeatured,
                isTrending: isTrending ?? existingArticle.isTrending,
            },
            include: { category: true }
        });

        return NextResponse.json(article);
    } catch (error) {
        console.error('Error updating article:', error);
        return NextResponse.json(
            { error: 'Failed to update article' },
            { status: 500 }
        );
    }
}

// DELETE /api/articles/[id] - Delete article
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;

        // Check if article exists
        const existingArticle = await prisma.article.findUnique({
            where: { id }
        });

        if (!existingArticle) {
            return NextResponse.json(
                { error: 'Article not found' },
                { status: 404 }
            );
        }

        await prisma.article.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error('Error deleting article:', error);
        return NextResponse.json(
            { error: 'Failed to delete article' },
            { status: 500 }
        );
    }
}
