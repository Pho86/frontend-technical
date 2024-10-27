import { useState, useEffect } from "react";
import Headline from "./components/Headline";
import Reviews from "./reviews.json";
import Button from "./components/Button";
import ReviewMasonry from "./components/ReviewMasonry";
import { reviewType } from "./lib/types/reviewType";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<reviewType[]>(Reviews);
  const [showReviews, setShowReviews] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    // fetch avatars with random seed of their name and add to object via avatar_url
    const fetchAvatars = async () => {
      const avatarPromises = Reviews.map(async (review) => {
        const response = await fetch(
          `https://api.dicebear.com/6.x/thumbs/svg?seed=${review.name}`
        );
        const avatar_url = response.url; 
        return { ...review, avatar_url };
      });

      const reviewsWithAvatars = await Promise.all(avatarPromises);
      setReviews(reviewsWithAvatars);
      setLoading(false);
    };

    // function to see how many reviews can fit on the page
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      let columns;
      if (width >= 1024) {
        columns = 3; // Large screens => 3 col
      } else if (width >= 640) {
        columns = 2; // Medium screens => 2 col
      } else {
        columns = 1; // Small screens => 1 col
      }

      // see how many rows of review cards with an average height of 250px can fit onto the screen, use ceiling to add safety card in case of error
      const rows = Math.ceil(height / 250);
      // times rows by columns to see how many review cards fit on current screen
      setVisibleCount(rows * columns);
    };

    // fetch avatars and update review count
    fetchAvatars();
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    // reset the window's position to remove being locked on previous reload position
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

  // enable user scroll and view all reviews
  function showAllReviews() {
    setShowReviews(true);
    document.body.style.overflow = "auto";
  }

  return (
    <main className="flex flex-col gap-8 md:gap-10 items-center w-full pt-6 sm:mt-8">
      <section className="max-w-screen-xl w-full flex flex-col items-center">
        <Headline
          headline="What our customers are saying 🍦🫶🏼 "
          description="At The Cone Zone, we’re proud to serve up smiles with every scoop! Check out what our customers have to say about their favorite flavors, experiences, and sweet moments."
          label="Reviews"
        />
      </section>

      {/* Reviews can load before images can be fetched, so load reviews and then load images, but if reviews were fetched at same time as images, display them at the same time. */}
      <ReviewMasonry
        reviews={reviews}
        loading={loading}
        showReviews={showReviews}
        visibleCount={visibleCount}
      />

      {!showReviews && (
        <div className="fixed flex w-full bg-gradient-to-t from-[#FAFAFA] to-transparent items-center justify-center bottom-0 p-10 pb-8">
          <Button onClick={showAllReviews}>Show all reviews</Button>
        </div>
      )}
      <footer className="pb-8"></footer>
    </main>
  );
}

export default App;
