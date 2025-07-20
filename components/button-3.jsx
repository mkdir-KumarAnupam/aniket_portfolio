import { ArrowRight } from "lucide-react";

export const ButtonAboutMe = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      {/* Let's Build Something Button */}
      <div className="group relative cursor-pointer px-4 py-3 w-full sm:w-1/2 border-2 border-black dark:border-white bg-white dark:bg-black rounded-sm overflow-hidden text-black dark:text-white text-center font-sans font-semibold transition-all duration-300">
        {/* Initial Text */}
        <span className="translate-x-1 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-300 inline-block whitespace-nowrap">
          Let's Build Something
        </span>

        {/* Hover Text */}
        <div className="flex gap-2 text-white dark:text-black z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-300">
          <span>Get In Touch</span>
          <ArrowRight />
        </div>

        {/* Expanding Background */}
        <div
          className="absolute top-[40%] left-[20%] h-2 w-2 rounded-lg
          bg-black dark:bg-white
          group-hover:h-full group-hover:w-full group-hover:scale-[1.8]
          group-hover:top-0 group-hover:left-0
          transition-all duration-300 z-0"
        />
      </div>

      {/* Get Resume Button */}
      <div className="group relative cursor-pointer px-4 py-3 w-full sm:w-1/2 border-2 border-black dark:border-white bg-white dark:bg-black rounded-sm overflow-hidden text-black dark:text-white text-center font-sans font-semibold transition-all duration-300">
        {/* Initial Text */}
        <span className="translate-x-1 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-300 inline-block whitespace-nowrap">
          Get Resume
        </span>

        {/* Hover Text */}
        <div className="flex gap-2 text-white dark:text-black z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-300">
          <span>Click To Download</span>
          <ArrowRight />
        </div>

        {/* Expanding Background */}
        <div
          className="absolute top-[40%] left-[20%] h-2 w-2 rounded-lg
          bg-black dark:bg-white
          group-hover:h-full group-hover:w-full group-hover:scale-[1.8]
          group-hover:top-0 group-hover:left-0
          transition-all duration-300 z-0"
        />
      </div>
    </div>
  );
};