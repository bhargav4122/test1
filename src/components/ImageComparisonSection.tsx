'use client';

import { ImageComparison, ImageComparisonImage, ImageComparisonSlider } from './ImageComparison';

const ImageComparisonSection = () => {
  // Replace these with your actual image paths
  const beforeImage = "/images/before.jpg";
  const afterImage = "/images/after.jpg";

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        See the Difference
      </h2>
      <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl">
        <ImageComparison className="h-[500px]">
          <ImageComparisonImage
            src={beforeImage}
            alt="Before"
            position="left"
            className="object-cover"
          />
          <ImageComparisonImage
            src={afterImage}
            alt="After"
            position="right"
            className="object-cover"
          />
          <ImageComparisonSlider className="bg-white/50">
            <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 3v18l7-6" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-0.5"
              >
                <path d="M16 3v18l-7-6" />
              </svg>
            </div>
          </ImageComparisonSlider>
        </ImageComparison>
      </div>
    </section>
  );
};

export default ImageComparisonSection;