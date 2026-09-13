export function BoilingFilter() {
  return (
    <svg
      className="sr-only"
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <defs>
        {/* Standard Line Boil Frames for Decorative Stickers */}
        <filter id="boil-frame-1" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.042"
            numOctaves="2"
            result="noise"
            seed="2"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2.6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="boil-frame-2" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.042"
            numOctaves="2"
            result="noise"
            seed="8"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2.9"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="boil-frame-3" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.042"
            numOctaves="2"
            result="noise"
            seed="16"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2.4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="boil-frame-4" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.042"
            numOctaves="2"
            result="noise"
            seed="24"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2.8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="boil-frame-5" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.042"
            numOctaves="2"
            result="noise"
            seed="35"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Subtle Line Boil Frames for smaller items & gift badges */}
        <filter id="boil-subtle-1" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="2"
            result="noise"
            seed="3"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="boil-subtle-2" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="2"
            result="noise"
            seed="11"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="boil-subtle-3" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="2"
            result="noise"
            seed="21"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="boil-subtle-4" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="2"
            result="noise"
            seed="31"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.7"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
