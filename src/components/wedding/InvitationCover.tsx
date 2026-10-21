import coverArt from "@/assets/cover.jpg";
import { Flourish } from "./Flourish";

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
        <img src={coverArt} alt="" />
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
