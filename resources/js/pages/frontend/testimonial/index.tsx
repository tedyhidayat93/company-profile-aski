import FrontendLayout from '@/layouts/frontend-layout';
import TestimonialCard from '@/components/TestimonialCard';
import SeoHead, { SeoHeadProps } from '@/components/seo-head';
import GoogleReviewsWidget from '@/components/google-reviews-widget';
import { useConfig } from '@/utils/config';

export default function TestimonialIndex({ 
    testimonials = [], 
    seo
}: { 
    testimonials?: any[];
    featuredTestimonial?: any;
    stats?: any;
    seo: SeoHeadProps;
}) {
    const { getConfig } = useConfig();
   
    return (
        <FrontendLayout>
            <SeoHead
                title={seo.title || 'Testimoni'}
                description={seo.description}
                image={seo.image}   
                keywords={seo.keywords}
                contentType={seo.contentType || 'website'}
            />

            <div className="py-16 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold mb-1 dark:text-orange-400">
                            {getConfig('testimonials_title', 'Apa Kata Mereka')}
                        </h1>
                        <p className="mx-auto max-w-5xl text-gray-600 dark:text-gray-300 text-base md:text-xl">
                            {getConfig('testimonials_description', 'Testimoni dari klien yang telah menggunakan layanan kami')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-4">
                        {testimonials.map((testimonial) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))}
                    </div>

                    <GoogleReviewsWidget />

                </div>
            </div>
        </FrontendLayout>
    );
}