import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Calendar, Eye, User } from 'lucide-react';
import { handleImageError } from '@/utils/image';

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
};

type Props = {
    headline_posts: BlogPost[];
    most_read_posts: BlogPost[];
    recent_posts: BlogPost[];
    all_posts: {
        data: BlogPost[];
        links: any;
    };
};

export default function BlogIndex(props: Props) {
    const {
        headline_posts,
        most_read_posts,
        recent_posts,
        all_posts,
    } = props;

    const isLoading =
        !headline_posts ||
        !most_read_posts ||
        !recent_posts;

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
                <Link href={`/blog/${post.slug}`}>
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

                <div className="text-xs text-gray-400 mt-2 flex gap-3">
                    <span className="flex items-center gap-1">
                        <User size={12} /> {post.author.name}
                    </span>
                    <span className="flex items-center gap-1">
                        <Calendar size={12} /> {formatDate(post.published_at)}
                    </span>
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

            <div className="max-w-6xl mx-auto px-4 py-8 spac-y-7">

                {/* 🔥 HEADLINE BESAR */}
                {!isLoading && headline_posts[0] && (
                    <div className="mb-10">
                        <Link href={`/blog/${headline_posts[0].slug}`}>
                            <div className="relative rounded-xl overflow-hidden">
                                <img
                                    src={
                                        `/storage/${headline_posts[0].featured_image}` ||
                                        '/images/placeholder.png'
                                    }
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