import { Head, Link, useForm, router } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Calendar, Eye, User, Search, Filter, Tag, TagIcon } from 'lucide-react';
import { handleImageError } from '@/utils/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type BlogPost = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string;
    author: {
        name: string;
    };
    published_at: string;
    views_count: number;
    category?: {
        id: number;
        name: string;
        slug: string;
    };
};

type Props = {
    headline_posts: BlogPost[];
    most_read_posts: BlogPost[];
    recent_posts: BlogPost[];
    all_posts: {
        data: BlogPost[];
        links: any;
    };
    categories: Array<{ id: number; name: string; slug: string; type: string; }>;
    popular_tags: string[];
    filters?: {
        search?: string;
        category?: string;
        tag?: string;
    };
};

export default function BlogIndex({ 
    headline_posts, 
    most_read_posts, 
    recent_posts, 
    all_posts, 
    categories, 
    popular_tags,
    filters = {} 
}: Props) {
    const { data, setData, get } = useForm({
        search: filters.search || '',
        category: filters.category || '',
        tag: filters.tag || '',
    });

    const isLoading =
        !headline_posts ||
        !most_read_posts ||
        !recent_posts;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get('/articles', {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleCategoryChange = (categoryId: string) => {
        setData('category', categoryId);
        setData('tag', ''); // Clear tag when category changes
        get('/articles', {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleTagClick = (tag: string) => {
        setData('tag', tag);
        setData('category', ''); // Clear category when tag changes
        get('/articles', {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });

    // 🔹 Skeleton
    const SkeletonItem = () => (
        <div className="flex gap-4 animate-pulse">
            <div className="w-28 h-20 bg-gray-200 rounded" />
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
        </div>
    );

    // 🔹 Item list ala kompas
    const PostItem = ({ post, headline }: { post: BlogPost; headline?: boolean }) => (
        <div className={`flex ${headline ? 'flex-col' : 'flex-row'} gap-4 py-4`}>
            
            <img
                src={`/storage/${post.featured_image}`}
                className={headline 
                    ? "w-full h-40 object-cover rounded-md" 
                    : "w-32 h-24 object-cover rounded-md"
                }
                onError={(e) => handleImageError(e, undefined, post.title)}
                loading="lazy"
            />

            <div className="flex-1">
                <Link href={`/articles/${post.slug}`}>
                    <h3 className={`font-bold text-gray-900 leading-snug hover:text-orange-600 ${
                        headline ? 'text-base' : 'text-xl'
                    }`}>
                        {post.title}
                    </h3>
                </Link>

                {!headline && (
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                        {post.excerpt}
                    </p>
                )}

                <div className="text-xs text-gray-400 mt-2 flex gap-3 flex-wrap">
                    {/* <span className="flex items-center gap-1">
                        <User size={12} /> {post.author.name}
                    </span> */}
                    {post.category && (
                        <span className="flex items-center gap-1">
                            <TagIcon size={12} /> { post.category?.name ?? 'Artikel'}
                        </span>
                    )}
                    {post.category && <span>•</span>}
                    <span className="flex items-center gap-1">
                        <Calendar size={12} /> {formatDate(post.published_at)}
                    </span>
                    {post.views_count > 0 && (<span>•</span>)}
                    <span className="flex items-center gap-1">
                        <Eye size={12} /> {post.views_count}
                    </span>
                </div>
            </div>
        </div>
    );

    const Section = ({
        title,
        data,
        grid = false,
        gridColumns = 1,
        isHeadline = false,
    }: {
        title: string;
        data: BlogPost[];
        grid?: boolean;
        gridColumns?: number;
        isHeadline?: boolean;
    }) => (
        <div className="mb-10">
            <h2 className="text-lg border-l-4 border-l-orange-400 px-4 font-bold border-b pb-2 mb-4">
                {title}
            </h2>

            <div className={grid ? `grid grid-cols-${gridColumns} gap-4` : "space-y-1"}>
                {isLoading
                    ? Array.from({ length: 3 }).map((_, i) => (
                          <SkeletonItem key={i} />
                      ))
                    : data.map((post) => (
                          <PostItem key={post.id} post={post} headline={isHeadline} />
                      ))}
            </div>
        </div>
    );

    return (
        <FrontendLayout>
            <Head title="Berita" />

            <div className="max-w-6xl mx-auto px-4 py-8 space-y-7">

                {/* 🔍 FILTER + TAGS */}
                <div className="bg-white rounded-xl border shadow-sm p-5 space-y-4">
                    {/* HEADER */}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-500" />
                        <h3 className="text-sm font-semibold text-gray-700">
                            Filter Berita
                        </h3>
                        </div>

                        {/* RESET */}
                        {(data.search || data.category || data.tag) && (
                        <button
                            onClick={() => {
                            setData({ search: '', category: '', tag: '' });
                            router.get('/articles', {}, { preserveState: true });
                            }}
                            className="text-xs text-red-500 hover:underline"
                        >
                            Reset Filter
                        </button>
                        )}
                    </div>

                    {/* SEARCH */}
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
                        <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            type="text"
                            placeholder="Cari berita..."
                            value={data.search}
                            onChange={(e) => setData('search', e.target.value)}
                            className="pl-10"
                        />
                        </div>

                        <select
                        value={data.category}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="px-3 py-2 border rounded-md text-sm w-full md:w-56"
                        >
                        <option value="">Semua kategori</option>
                        {categories.filter(cat => cat.type === 'blog').map((category) => (
                            <option key={category.id} value={category.id}>
                            {category.name}
                            </option>
                        ))}
                        </select>

                        <Button type="submit">
                        Cari
                        </Button>
                    </form>

                    {/* ACTIVE FILTER BADGE */}
                    {(data.search || data.category || data.tag) && (
                        <div className="flex flex-wrap gap-2 pt-2 border-t">

                        {data.search && (
                            <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">
                            🔍 {data.search}
                            </span>
                        )}

                        {data.category && (
                            <span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                            📂 {categories.find(c => c.id.toString() === data.category)?.name}
                            </span>
                        )}

                        {data.tag && (
                            <span className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                            #{data.tag}
                            </span>
                        )}

                        </div>
                    )}

                    {/* TAGS */}
                    {popular_tags.length > 0 && (
                        <div className="space-y-2 pt-2 border-t">

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Tag className="h-4 w-4" />
                            Tags Populer
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {popular_tags.map((tag, index) => (
                            <button
                                key={index}
                                onClick={() => handleTagClick(tag)}
                                className={`px-3 py-1 text-xs rounded-full transition-all
                                ${data.tag === tag
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                                `}
                            >
                                #{tag}
                            </button>
                            ))}
                        </div>

                        </div>
                    )}
                </div>

                {/* 🔥 HEADLINE BESAR */}
                {!isLoading && headline_posts[0] && (
                    <div className="mb-10">
                        <Link href={`/articles/${headline_posts[0].slug}`}>
                            <div className="relative rounded-xl overflow-hidden">
                                <img
                                    src={
                                        `/storage/${headline_posts[0].featured_image}` ||
                                        '/images/placeholder.png'
                                    }
                                    onError={handleImageError}
                                    className="w-full h-[420px] object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end">
                                    <span className="text-xs text-white bg-orange-600 px-2 py-1 w-fit mb-2">
                                        HEADLINE
                                    </span>

                                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                                        {headline_posts[0].title}
                                    </h1>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* 🔹 Headline lainnya */}
                <Section
                    title="Headline Lainnya"
                    grid={true}
                    gridColumns={4}
                    isHeadline={true}
                    data={headline_posts.slice(1)}
                />

                {/* 🔹 Most Read */}
                <Section
                    title="Terpopuler"
                    grid={true}
                    gridColumns={2}
                    data={most_read_posts}
                />

                {/* 🔹 Recent */}
                <Section
                    title="Terbaru"
                    grid={true}
                    gridColumns={2}
                    data={recent_posts}
                />

                {/* 🔹 Semua berita */}
                <div className="mb-10">
                    <h2 className="text-lg border-l-4 border-l-orange-400 px-4 font-bold border-b pb-2 mb-4">
                        Berita Lainnya
                    </h2>

                    <div className="space-y-1">
                        {isLoading
                            ? Array.from({ length: 5 }).map((_, i) => (
                                  <SkeletonItem key={i} />
                              ))
                            : all_posts.data.map((post) => (
                                  <PostItem key={post.id} post={post} />
                              ))}
                    </div>
                </div>

                {/* Pagination */}
                <div className="mt-8 flex justify-center flex-wrap gap-2">
                    {all_posts.links.map((link: any, i: number) => (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            className={`px-3 py-1 text-sm rounded ${
                                link.active
                                    ? 'bg-orange-600 text-white'
                                    : 'bg-gray-200'
                            }`}
                            dangerouslySetInnerHTML={{
                                __html: link.label,
                            }}
                        />
                    ))}
                </div>

            </div>
        </FrontendLayout>
    );
}