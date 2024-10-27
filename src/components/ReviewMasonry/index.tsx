import { useEffect, useState } from "react";
import Review from "../Review";
import { reviewType } from "../../lib/types/reviewType";

export default function ReviewMasonry({
  reviews,
  showReviews,
  loading,
  visibleCount,
}: {
  reviews: reviewType[];
  showReviews: boolean;
  loading: boolean;
  visibleCount: number;
}) {
  // see how large width of screen is is
  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
    });

    useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
        });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
  };

  const { width } = useWindowSize();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-xl px-6 md:px-10 lg:px-20">
      {/* First Column, shown on every size */}
      <Column>
        {reviews
          .slice(0, showReviews ? reviews.length : visibleCount)
          .filter((_, index) => {
            // 1 column -> display every review
            return width < 640
              ? true
              : // 2 columns -> display every other review (0, 2, 4, 6, ... 2n)
              width < 1024
              ? index % 2 === 0
              : // 3 columns -> display every third review (0, 3, 6, 9, ... 3n)
                index % 3 === 0;
          })
          .map((review, index) => (
            <Review key={index} review={review} loading={loading} />
          ))}
      </Column>

      {/* Second Column, hidden on mobile */}
      <Column className="hidden sm:flex">
        {reviews
          .slice(0, showReviews ? reviews.length : visibleCount)
          .filter((_, index) => {
            // 2 columns -> display every other review + 1 (1, 3, 5, 7, ... 2n + 1)
            return width < 1024
              ? index % 2 === 1
              : // 3 columns -> display every third review + 1 (1, 4, 7, 10, ... 3n + 1)
                index % 3 === 1;
          })
          .map((review, index) => (
            <Review key={index + 1} review={review} loading={loading} />
          ))}
      </Column>

      {/* Third Column, only shows on lg */}
      <Column className="hidden lg:flex">
        {reviews
          .slice(0, showReviews ? reviews.length : visibleCount)
          .filter((_, index) => index % 3 === 2) // Displays every third review + 2 (2, 5, 7, 10, ... 3n + 2)
          .map((review, index) => (
            <Review key={index + 2} review={review} loading={loading} />
          ))}
      </Column>
    </div>
  );
}

// base columns component
function Column({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 ${className ? className : " "}`}>
      {children}
    </div>
  );
}
