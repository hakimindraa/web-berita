import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('q') || '';
        const limit = parseInt(searchParams.get('limit') || '10');

        if (!query || query.length < 2) {
            return NextResponse.json({ articles: [] });
        }

        const articles = await prisma.article.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { excerpt: { contains: query, mode: 'insensitive' } },
                    { content: { contains: query, mode: 'insensitive' } },
                ],
            },
            include: {
                category: {
                    select: {
                        name: true,
                        slug: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: limit,
        });

        return NextResponse.json({ articles });
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ articles: [], error: 'Search failed' }, { status: 500 });
    }
}
