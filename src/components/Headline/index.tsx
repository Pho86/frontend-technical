export default function Headline({
  headline,
  description,
  label,
}: {
  headline: string;
  description: string;
  label: string;
}) {
  return (
    <header className="flex flex-col gap-3 text-left text-pretty sm:text-center px-6 lg:px-8 sm:w-10/12 md:w-11/12 lg:w-8/12">
      <section className="flex flex-col gap-2">
        <label className="text-primary text-sm font-semibold">{label}</label>
        <h1 className="font-semibold text-3xl text-balance sm:text-pretty ">{headline}</h1>
      </section>
      <p className="text-pretty">{description}</p>
    </header>
  );
}
