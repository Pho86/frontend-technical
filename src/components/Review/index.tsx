import { reviewType } from "../../lib/types/reviewType";

export default function Review({
  review,
  loading,
}: {
  review: reviewType;
  loading: boolean;
}) {
  return (
    <div className="bg-white flex item flex-col gap-3 rounded-xl p-5 h-max border-2 border-[#F5F5F5]">
      <figure className="flex gap-3 items-center">
        {loading ? (
          <div className="w-10 h-10 "></div>
        ) : (
          <img
            src={review.avatar_url}
            className="w-10 h-10 rounded-full bg-white"
            alt="Avatar"
          />
        )}
        <figcaption className="flex flex-col">
          <span className="font-semibold">{review.name}</span>
          <span className="text-sm text-zinc-500">{review.reviewer_level}</span>
        </figcaption>
      </figure>
      <p className="flex">
        <Star grade={review.grade} />
      </p>
      <p className="text-pretty text-sm">{review.review}</p>
    </div>
  );
}

// Helper Star function, takes integer and prints stars from HeroIcons Library
function Star({ grade }: { grade: number }) {
  return (
    <>
      {[...Array(grade)].map((_, index) => (
        <span key={index}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 text-[#FBBF24] "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        </span>
      ))}
    </>
  );
}
