import { Music, VolumeX } from "lucide-react";

type MusicToggleProps = {
  playing: boolean;
  onToggle: () => void;
};

/** Small fixed bottom-left music on/off control. The audio element itself lives in the page. */
export function MusicToggle({ playing, onToggle }: MusicToggleProps) {
  return (
    <button
      type="button"
      className={`music-toggle ${playing ? "is-playing" : ""}`}
      aria-pressed={playing}
      aria-label={playing ? "Turn music off" : "Turn music on"}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    >
      {playing ? <Music className="h-4 w-4" aria-hidden /> : <VolumeX className="h-4 w-4" aria-hidden />}
    </button>
  );
}
