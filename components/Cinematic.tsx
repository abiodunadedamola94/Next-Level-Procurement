import Image from "next/image";

// The cinematic layer: a still that moves like footage (slow push-in, drifting haze, grain),
// or a real looping video once one is approved. Decorative only: the meaning is always in the text.
// Reduced motion: globals.css stops the animations, the still stays.
export default function Cinematic({
  src,
  video,
  position = "center",
  className = "",
  priority = false,
  haze = true,
}: {
  src: string;
  video?: string;
  position?: string;
  className?: string;
  priority?: boolean;
  haze?: boolean;
}) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${className}`}>
      {video ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: position }}
          src={video}
          poster={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <div className="absolute inset-0 kenburns">
          <Image src={src} alt="" fill priority={priority} sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
        </div>
      )}
      {haze && (
        <>
          <div className="absolute -inset-[20%] drift opacity-60 bg-[radial-gradient(40%_30%_at_30%_40%,rgba(244,245,242,.22),transparent_70%)]" />
          <div className="absolute -inset-[20%] drift-slow opacity-50 bg-[radial-gradient(35%_25%_at_70%_65%,rgba(44,186,172,.16),transparent_70%)]" />
        </>
      )}
      <div className="absolute inset-0 grain opacity-[0.07] mix-blend-overlay" />
    </div>
  );
}
