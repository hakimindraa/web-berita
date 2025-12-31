import Link from 'next/link';
import { Category } from '../data/news';

interface CategoryBadgeProps {
    category: Category;
    size?: 'sm' | 'md' | 'lg';
    showCount?: boolean;
    asLink?: boolean;
}

export default function CategoryBadge({ category, size = 'md', showCount = false, asLink = true }: CategoryBadgeProps) {
    const sizeClasses = {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-3 py-1 text-xs',
        lg: 'px-4 py-1.5 text-sm',
    };

    const className = `badge badge-${category.color} ${sizeClasses[size]} inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity`;

    const content = (
        <>
            <span>{category.name}</span>
            {showCount && (
                <span className="opacity-70">({category.count})</span>
            )}
        </>
    );

    if (!asLink) {
        return <span className={className}>{content}</span>;
    }

    return (
        <Link href={`/kategori/${category.slug}`} className={className}>
            {content}
        </Link>
    );
}
