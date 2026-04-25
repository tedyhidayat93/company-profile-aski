import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { getConfig } from '@/hooks/use-configuration';

export default function TestimonialIndex({ 
    testimonials = [], 
    featuredTestimonial = null, 
    stats = {} 
}: { 
    testimonials?: any[];
    featuredTestimonial?: any;
    stats?: any;
}) {
   
    return (
        <FrontendLayout>
            <Head title="Testimoni">
                <meta name="description" content={getConfig('meta_description', '-')} />
                <meta name="keywords" content={getConfig('meta_keywords', '-')} />
            </Head>

            {/* All Testimonials Grid */}
            <div className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Semua Testimoni
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            Lihat apa yang dikatakan klien kami tentang layanan kami
                        </p>
                    </div>

                     <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="rounded-xl bg-gray-50 p-8 dark:bg-gray-800">
                            <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <img
                                src={testimonial.avatar}
                                alt={testimonial.name}
                                className="mr-4 h-12 w-12 rounded-full object-cover"
                                />
                                <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                    {testimonial.name}
                                </h4>
                                <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                            
                            {/* Bagian Bintang */}
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`h-5 w-5 ${i < testimonial.rating ? 'fill-current' : 'fill-gray-300'}`}
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                ))}
                            </div>
                            </div>
                            <p className="text-gray-600 italic dark:text-gray-300">"{testimonial.content}"</p>
                        </div>
                        ))}
                    </div>

                    {testimonials.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-500 dark:text-gray-400">
                                Belum ada testimoni yang tersedia.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </FrontendLayout>
    );
}