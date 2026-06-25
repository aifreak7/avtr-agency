export default function ChapterNumeral({ n }: { n: string }) {
  return (
    <span className="font-serif text-[14vw] leading-none tracking-tightest text-accent md:text-[10vw]">
      {n}
    </span>
  );
}
