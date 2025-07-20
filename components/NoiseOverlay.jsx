"use client";

import Image from "next/image";

const NoiseOverlay = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Image
        src="/noise.png"
        alt="grain texture"
        width={1920}
        height={1080}
        priority
        className="sm:w-[50%] md:w-[100%] lg:w-[50%] xl:w-[50%] h-full object-cover opacity-10 mix-blend-multiply"
      />
    </div>
  );
};

export default NoiseOverlay;