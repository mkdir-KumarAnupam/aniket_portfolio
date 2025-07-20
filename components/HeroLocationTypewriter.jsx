const LocationTypewriter = ({
  animate,
  darkMode,
  locations,
  locIndex,
  locSubIndex,
}) => (
  <p
    className={`mt-6 font-normal text-center text-lg sm:text-xl tracking-widest font-sans transition-all duration-700 ${
      animate ? "animate-slide-in-bottom opacity-100" : "opacity-0"
    } ${darkMode ? "text-white" : "text-gray-800"}`}
  >
    based in{" "}
    <span
      className={`font-bold px-2 py-1 inline-block min-w-[200px] transition-colors duration-500 ${
        darkMode ? "bg-white text-[black]" : "bg-[black] text-white"
      }`}
    >
      {locations[locIndex].substring(0, locSubIndex)}
      <span className={darkMode ? "text-[black]" : "text-white"}>|</span>
    </span>
  </p>
);

export default LocationTypewriter;