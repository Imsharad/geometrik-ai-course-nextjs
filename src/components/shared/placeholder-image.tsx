"use client"

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PlaceholderImageProps {
  width?: number;
  height?: number;
  seed?: string;
  keywords?: string;
  className?: string;
  alt?: string;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  category?: 'people' | 'tech' | 'business' | 'nature' | 'abstract';
  fallbackSrc?: string;
}

/**
 * A component that renders a placeholder image from an external source.
 * 
 * @param width - The width of the image
 * @param height - The height of the image
 * @param seed - A seed for the random image (for consistent images)
 * @param keywords - Keywords for the image query
 * @param className - Additional CSS classes
 * @param alt - Alt text for the image
 * @param fill - Whether the image should fill its container
 * @param sizes - Image sizes for responsive images
 * @param quality - Image quality (1-100)
 * @param priority - Whether the image should be loaded with priority
 * @param category - Image category
 * @param fallbackSrc - Fallback source if the primary source fails
 */
export function PlaceholderImage({
  width = 800,
  height = 600,
  seed,
  keywords = '',
  className,
  alt = 'Placeholder image',
  fill = false,
  sizes,
  quality = 85,
  priority = false,
  category,
  fallbackSrc,
}: PlaceholderImageProps) {
  // Combine keywords with category to make more contextually relevant images
  let query = keywords || '';
  
  if (category) {
    query = `${category},${query}`.trim();
  }
  
  // Format the query for URL
  const formattedQuery = encodeURIComponent(query || 'geometric abstract');
  
  // Determine which service to use based on parameters
  const getSrcUrl = () => {
    // If a specific seed is provided, use Unsplash Source with seed
    if (seed) {
      return `https://source.unsplash.com/${seed}/${width}x${height}`;
    }
    
    // Default to Lorem Picsum with random id and optional keywords
    const randomId = Math.floor(Math.random() * 1000);
    const keywordParam = query ? `?${formattedQuery}` : '';
    
    return `https://picsum.photos/seed/${randomId}/${width}/${height}${keywordParam}`;
  };
  
  const [src, setSrc] = React.useState(getSrcUrl());

  // Handle image loading errors
  const handleError = () => {
    console.warn('Placeholder image failed to load, trying fallback');
    
    if (fallbackSrc) {
      setSrc(fallbackSrc);
    } else {
      // Use a different source as a last resort
      const lastResortSrc = `https://via.placeholder.com/${width}x${height}?text=Image`;
      setSrc(lastResortSrc);
    }
  };

  // Reset the src when props change
  React.useEffect(() => {
    setSrc(getSrcUrl());
  }, [width, height, seed, query]);

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={cn('transition-opacity', className)}
      fill={fill}
      sizes={sizes || `(max-width: 768px) 100vw, ${width}px`}
      quality={quality}
      priority={priority}
      onError={handleError}
    />
  );
} 