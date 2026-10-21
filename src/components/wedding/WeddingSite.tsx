import { CalendarDays, ChevronRight, MapPin } from "lucide-react";
import coupleArt from "@/assets/couple.jpg";
import mahalArt from "@/assets/royal-mahal.jpg";
import garland from "@/assets/garland.png";
import floralCluster from "@/assets/floral-cluster.png";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import { Countdown } from "./Countdown";
import { Flourish, LinedWord } from "./Flourish";

export const DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=The%20Royal%20Mahal%2C%20Vayalur%2C%20Trichy%2C%20Tamil%20Nadu%2C%20India";

function SideGarlands({ count }: { count: number }) {
  const strip = (flip: boolean) => (
    <div
      className={`pointer-events-none absolute top-0 z-20 flex w-16 flex-col sm:w-24 ${
        flip ? "-right-3 -scale-x-100 sm:-right-4" : "-left-3 sm:-left-4"
      }`}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <img
          key={i}
          src={garland}
          alt=""
          width={512}
          height={1536}
          loading={i === 0 ? "eager" : "lazy"}
          className={`h-auto w-full ${i > 0 ? "-mt-8" : ""} ${i % 2 ? "-scale-y-100" : ""}`}
        />
      ))}
    </div>
  );
  return (
    <>
      {strip(false)}
      {strip(true)}
    </>
  );
}

function EventCard({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center sm:flex-row sm:items-start sm:gap-3 sm:text-left">
      <CalendarDays className="h-6 w-6 shrink-0 text-burgundy sm:mt-0.5" strokeWidth={1.5} />
      <div>
        <h3 className="font-display text-sm font-semibold tracking-[0.12em] text-burgundy">
          {title}
        </h3>
        {lines.map((l) => (
          <p key={l} className="font-serif text-[15px] leading-snug text-burgundy-deep sm:text-base">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}

function Polaroid({ src, rotate, className }: { src: string; rotate: string; className?: string }) {
  return (
    <figure
      className={`bg-ivory p-1.5 pb-4 shadow-polaroid ring-1 ring-gold/40 ${rotate} ${className ?? ""}`}
    >
      <img
        src={src}
        alt="Illustrated memory of Dhyaani and Vinotha"
        width={928}
        height={1152}
        loading="lazy"
        className="aspect-[4/5] w-full object-cover"
      />
    </figure>
  );
}

export function WeddingSite() {
  return (
    <div className="min-h-screen bg-parchment">
      <main className="relative mx-auto max-w-[640px] overflow-hidden bg-parchment-page shadow-card">
        {/* ---------- Header: couple + names ---------- */}
        <div className="relative">
          <SideGarlands count={4} />

          <header className="relative z-10 pt-5">
            <div className="flex flex-col items-center text-gold">
              <span className="font-script text-4xl leading-none text-burgundy">
                D<span className="mx-0.5 text-2xl text-gold">&</span>V
              </span>
              <Flourish className="mt-1 w-28" />
            </div>

            <div className="mt-1 grid grid-cols-[1.2fr_1fr] items-center gap-1 pr-10 sm:pr-16">
              <img
                src={coupleArt}
                alt="Illustration of Dhyaani and Vinotha"
                width={1152}
                height={928}
                className="mask-soft aspect-square w-full object-cover"
              />
              <div className="text-center">
                <p className="font-serif text-[13px] italic leading-snug text-burgundy-deep sm:text-base">
                  Under aligned stars and with hearts united, two families become one as a
                  beautiful new journey begins.
                </p>
                <h1 className="mt-2 text-burgundy">
                  <span className="block font-script text-[42px] leading-[1.05] sm:text-6xl">
                    Dhyaani
                  </span>
                  <LinedWord className="font-display text-[11px] tracking-[0.3em] text-burgundy-deep">
                    WEDS
                  </LinedWord>
                  <span className="block font-script text-[42px] leading-[1.05] sm:text-6xl">
                    Vinotha
                  </span>
                </h1>
                <p className="mt-2 font-serif text-[13px] italic text-burgundy-deep sm:text-base">
                  Awaiting Your Gracious Presence
                </p>
                <Flourish className="mx-auto mt-1 w-24 text-gold" />
              </div>
            </div>
          </header>

          {/* ---------- Our Special Dates ---------- */}
          <section className="relative z-30 mx-auto mt-2 w-[calc(100%-64px)] sm:w-[calc(100%-120px)]">
            <div className="rounded-sm border border-gold bg-ivory/85 p-1 shadow-card">
              <div className="rounded-sm border border-gold/60 px-3 py-4 sm:px-6 sm:py-5">
                <h2 className="text-center font-script text-[34px] leading-none text-burgundy sm:text-4xl">
                  Our Special Dates
                </h2>
                <div className="gold-rule mx-auto mt-2 w-3/4" />
                <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-start gap-3 sm:gap-5">
                  <EventCard
                    title="RECEPTION"
                    lines={["Saturday,", "21 November 2026", "6:00 PM onwards"]}
                  />
                  <div className="flex h-full flex-col items-center" aria-hidden="true">
                    <span className="w-px flex-1 bg-gold" />
                    <span className="my-1 h-2 w-2 rotate-45 bg-gold" />
                    <span className="w-px flex-1 bg-gold" />
                  </div>
                  <EventCard
                    title="MUHURTHAM"
                    lines={["Sunday,", "22 November 2026", "10:00 AM to 11:50\u00A0AM"]}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ---------- Venue ---------- */}
        <section className="relative z-10 mt-7 text-center">
          <div className="flex items-center justify-center gap-1.5 text-burgundy">
            <MapPin className="h-5 w-5 fill-burgundy text-burgundy" strokeWidth={1.5} />
            <span className="font-script text-3xl leading-none">Venue</span>
          </div>
          <h2 className="mt-1 font-serif text-2xl font-semibold text-burgundy-deep sm:text-3xl">
            The Royal Mahal
          </h2>
          <p className="font-serif text-[15px] text-burgundy-deep sm:text-base">
            Vayalur, Trichy, Tamil Nadu, India
          </p>
          <img
            src={mahalArt}
            alt="Hand-drawn illustration of The Royal Mahal, Vayalur, Trichy"
            width={1584}
            height={672}
            loading="lazy"
            className="mask-fade-x -mt-6 w-full mix-blend-multiply"
          />
        </section>

        {/* ---------- Countdown ---------- */}
        <section className="relative z-10 mx-auto -mt-6 w-[calc(100%-24px)] sm:w-[calc(100%-80px)]">
          <Countdown />
        </section>

        {/* ---------- Memories + Directions ---------- */}
        <section className="relative z-10 mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 sm:px-8">
          <Polaroid src={memory1} rotate="-rotate-6" />
          <div className="flex justify-center">
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-gold bg-burgundy-panel px-3.5 py-2.5 font-serif text-[15px] font-semibold text-ivory shadow-card transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:px-6 sm:text-lg"
            >
              <MapPin className="h-4 w-4 text-gold" />
              Get Directions
              <ChevronRight className="h-4 w-4 text-gold" />
            </a>
          </div>
          <div className="relative aspect-[1/2]">
            <Polaroid src={memory2} rotate="rotate-6" className="absolute right-0 top-0 w-[80%]" />
            <Polaroid
              src={memory3}
              rotate="-rotate-3"
              className="absolute bottom-0 left-0 w-[76%]"
            />
          </div>
        </section>

        {/* ---------- Closing ---------- */}
        <footer className="relative z-10 mt-6 text-center">
          <p className="px-6 font-serif text-xl italic text-burgundy-deep sm:text-2xl">
            Your Presence, Our Greatest Blessing
          </p>
          <Flourish className="mx-auto mt-1 w-32 text-gold" />
          <img
            src={floralCluster}
            alt=""
            aria-hidden="true"
            width={1536}
            height={512}
            loading="lazy"
            className="mx-auto -mb-2 mt-2 w-full max-w-[520px]"
          />
        </footer>
      </main>
    </div>
  );
}
