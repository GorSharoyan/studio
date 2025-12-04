'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

type StarRatingProps = {
  totalStars?: number;
  onSubmit: (rating: number) => void;
};

export function StarRating({ totalStars = 5, onSubmit }: StarRatingProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex space-x-1">
        {[...Array(totalStars)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              type="button"
              key={starValue}
              className="cursor-pointer"
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                className={cn(
                  'h-8 w-8 transition-colors',
                  starValue <= (hover || rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-muted-foreground/50'
                )}
              />
            </button>
          );
        })}
      </div>
      <Button onClick={handleSubmit} disabled={rating === 0}>
        Submit Rating
      </Button>
    </div>
  );
}
