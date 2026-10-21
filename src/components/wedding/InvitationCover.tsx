import { useEffect, useRef, useState } from "react";
import coverArt from "@/assets/cover.jpg";
import openingVideo from "@/assets/opening-video.mp4.asset.json";
import { Flourish } from "./Flourish";

/** Full-screen, muted, looping background video; hides itself if it fails to load. */
function CoverVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // the separate song is the only sound source
    v.play().catch(() => {
      /* autoplay refused: first frame stays as a still */
    });
  }, []);

  if (failed) return null;
  return (
    <video
      ref={ref}
      className="cover-video"
      src={openingVideo.url}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      onError={() => setFailed(true)}
    />
  );
}

type InvitationCoverProps = {
  opening: boolean;
  onOpen: () => void;
};

/** One full copy of the closed invitation; rendered inside each door half. */
function CoverFace({ hidden }: { hidden?: boolean }) {
  return (
    <div className="cover-face" aria-hidden={hidden}>
      <img src={coverArt} alt="" width={768} height={1376} draggable={false} />
      <div className="cover-names">
        <span className="font-script leading-none" style={{ fontSize: "11.5cqw" }}>
          Dhyaani
        </span>
        <div
          className="my-[0.6cqw] flex items-center gap-[2cqw] font-display tracking-[0.3em] text-burgundy-deep"
          style={{ fontSize: "2.4cqw" }}
        >
          <span className="h-px w-[8cqw] bg-gold" />
          WEDS
          <span className="h-px w-[8cqw] bg-gold" />
        </div>
        <span className="font-script leading-none" style={{ fontSize: "11.5cqw" }}>
          Vinotha
        </span>
        <Flourish className="mt-[1.5cqw] w-[22cqw] text-gold" />
        <span
          className="mt-[1.5cqw] font-display leading-snug tracking-[0.18em] text-burgundy-deep"
          style={{ fontSize: "2.7cqw" }}
        >
          WEDDING
          <br />
          CELEBRATION
        </span>
      </div>
      <div className="cover-tap">TAP TO OPEN</div>
    </div>
  );
}

export function InvitationCover({ opening, onOpen }: InvitationCoverProps) {
  return (
    <div
      className={`cover-root ${opening ? "is-opening" : ""}`}
      role="button"
      tabIndex={0}
      aria-label="Tap to open the wedding invitation of Dhyaani and Vinotha"
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      <div className="cover-backdrop" aria-hidden="true">
        <CoverVideo />
      </div>
      <div className="cover-stage">
        <div className="cover-door cover-door--left">
          <div className="cover-door-inner">
            <CoverFace />
          </div>
        </div>
        <div className="cover-door cover-door--right">
          <div className="cover-door-inner">
            <CoverFace hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
