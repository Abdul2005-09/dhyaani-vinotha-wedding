import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { InvitationCover } from "@/components/wedding/InvitationCover";
import { WeddingSite } from "@/components/wedding/WeddingSite";
import { MusicToggle } from "@/components/wedding/MusicToggle";
import weddingMusic from "@/assets/wedding-music.m4a.asset.json";

const TITLE = "Dhyaani Weds Vinotha — Wedding Invitation";
const DESCRIPTION =
  "Reception on 21 November 2026 and Muhurtham on 22 November 2026 at The Royal Mahal, Vayalur, Trichy. Awaiting your gracious presence.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

type Phase = "closed" | "opening" | "open";
const OPEN_DURATION_MS = 1600;

function Index() {
  const [phase, setPhase] = useState<Phase>("closed");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const startedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const userMutedRef = useRef(false);

  const playMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return; // never start a second copy
    audio.play().catch(() => setMusicPlaying(false));
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      userMutedRef.current = false;
      playMusic();
    } else {
      userMutedRef.current = true;
      audio.pause();
    }
  }, [playMusic]);

  const open = useCallback(() => {
    if (startedRef.current) return; // ignore repeated taps
    startedRef.current = true;
    if (!userMutedRef.current) playMusic(); // first interaction unlocks sound
    setPhase("opening");
    window.setTimeout(() => setPhase("open"), OPEN_DURATION_MS);
  }, [playMusic]);

  useEffect(() => {
    const lock = phase !== "open";
    document.documentElement.style.overflow = lock ? "hidden" : "";
    document.body.style.overflow = lock ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [phase]);

  return (
    <>
      <div className={phase === "closed" ? "" : "site-reveal"} aria-hidden={phase === "closed"}>
        <WeddingSite />
      </div>
      {phase !== "open" && <InvitationCover opening={phase === "opening"} onOpen={open} />}
      <audio
        ref={audioRef}
        src={weddingMusic.url}
        loop
        preload="auto"
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
        onError={() => setMusicPlaying(false)}
      />
      <MusicToggle playing={musicPlaying} onToggle={toggleMusic} />
    </>
  );
}
