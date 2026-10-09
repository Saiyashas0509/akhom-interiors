import { Reveal } from "./ui";

const COMMITMENT = {
  quote:
    "We measure our success not by the volume of projects completed, but by how well each space functions years after the keys are handed over.",
  author: "Er. Ram Kalyan Kolasani",
  role: "Founder & Principal Lead, AKHOM INTERIORS",
};

export function Testimonials({ showQuotes = false }: { showQuotes?: boolean }) {
  if (!showQuotes) {
    return (
      <section className="border-t border-ink/10 bg-ivory px-6 py-20 text-ink md:px-10 md:py-28 lg:px-14">
        <div className="mx-auto max-w-[1200px] text-center">
          <Reveal>
            <p className="eyebrow text-burgundy">Studio Commitment</p>
            <blockquote className="mx-auto mt-6 max-w-[36ch] font-serif text-2xl font-light italic leading-relaxed text-ink/90 sm:text-3xl md:text-4xl">
              "{COMMITMENT.quote}"
            </blockquote>
            <div className="mt-8">
              <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink">
                {COMMITMENT.author}
              </p>
              <p className="mt-1 text-xs font-light tracking-wider text-ink/60">
                {COMMITMENT.role}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-ink/10 bg-ivory px-6 py-20 text-ink md:px-10 md:py-28 lg:px-14">
      <div className="mx-auto max-w-[1200px] text-center">
        <Reveal>
          <p className="eyebrow text-burgundy">Client Perspectives</p>
          <blockquote className="mx-auto mt-6 max-w-[36ch] font-serif text-2xl font-light italic leading-relaxed text-ink/90 sm:text-3xl md:text-4xl">
            "{COMMITMENT.quote}"
          </blockquote>
          <div className="mt-8">
            <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink">
              {COMMITMENT.author}
            </p>
            <p className="mt-1 text-xs font-light tracking-wider text-ink/60">
              {COMMITMENT.role}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
