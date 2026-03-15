import type { FC } from 'react';
interface ReviewsSectionProps {
    title?: string;
    description?: string;
}

const ReviewsSection: FC<ReviewsSectionProps> = ({ 
    title = "Your Reviews", 
    description = "Your reviews will appear here." }) => {
        return (
            <div className="ml-8 md:ml-28 pb-32 text-[#123524] mt-10">
                <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
                <p className="text-base md:text-lg mt-1">{description}</p>
            </div>
        );
};

export default ReviewsSection;