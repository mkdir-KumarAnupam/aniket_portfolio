import React, { useState, useEffect } from "react";
import {
  FaCampground,
  FaFire,
  FaTint,
  FaHotTub,
  FaHiking,
} from "react-icons/fa";

const InteractiveSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState([]);

  const options = [
    {
      title: "Luxury Tent",
      description: "Cozy glamping under the stars",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      icon: <FaCampground size={24} className="text-white" />,
    },
    {
      title: "Campfire Feast",
      description: "Gourmet s'mores & stories",
      image:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
      icon: <FaFire size={24} className="text-white" />,
    },
    {
      title: "Lakeside Retreat",
      description: "Private dock & canoe rides",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      icon: <FaTint size={24} className="text-white" />,
    },
    {
      title: "Mountain Spa",
      description: "Outdoor sauna & hot tub",
      image:
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
      icon: <FaHotTub size={24} className="text-white" />,
    },
    {
      title: "Guided Adventure",
      description: "Expert-led nature tours",
      image:
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
      icon: <FaHiking size={24} className="text-white" />,
    },
  ];

  const handleOptionClick = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers = [];

    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#222] text-white font-sans">
      {/* Header */}
      <div className="w-full max-w-2xl px-6 mt-8 mb-2 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight drop-shadow-lg animate-fadeInTop delay-[300ms]">
          Escape in Style
        </h1>
        <p className="text-lg md:text-xl text-gray-300 font-medium max-w-xl mx-auto animate-fadeInTop delay-[600ms]">
          Discover luxurious camping experiences in nature’s most breathtaking
          spots.
        </p>
      </div>

      <div className="h-12" />

      {/* Option Panels */}
      <div className="flex w-full max-w-[900px] min-w-[600px] h-[400px] overflow-hidden relative">
        {options.map((option, index) => {
          const isActive = activeIndex === index;
          const isVisible = animatedOptions.includes(index);

          return (
            <div
              key={index}
              className={`relative flex-col justify-end cursor-pointer transition-all duration-700 ease-in-out ${
                isActive ? "z-10" : "z-1"
              }`}
              onClick={() => handleOptionClick(index)}
              style={{
                backgroundImage: `url('${option.image}')`,
                backgroundSize: isActive ? "auto 100%" : "auto 120%",
                backgroundPosition: "center",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(-60px)",
                minWidth: "60px",
                border: "2px solid",
                borderColor: isActive ? "#fff" : "#292929",
                backgroundColor: "#18181b",
                boxShadow: isActive
                  ? "0 20px 60px rgba(0,0,0,0.5)"
                  : "0 10px 30px rgba(0,0,0,0.3)",
                flex: isActive ? "7 1 0%" : "1 1 0%",
                display: "flex",
              }}
            >
              {/* Shadow overlay */}
              <div
                className="absolute left-0 right-0 transition-all duration-700 pointer-events-none"
                style={{
                  bottom: isActive ? "0" : "-40px",
                  height: "120px",
                  boxShadow: isActive
                    ? "inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000"
                    : "inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000",
                }}
              ></div>

              {/* Icon + Title */}
              <div className="absolute bottom-5 left-0 right-0 flex items-center gap-3 px-4 h-12 z-10">
                <div className="w-11 h-11 rounded-full bg-[rgba(32,32,32,0.85)] backdrop-blur-[10px] flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.18)] border-2 border-[#444]">
                  {option.icon}
                </div>
                <div className="text-white">
                  <div
                    className="font-bold text-lg transition-all duration-700"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? "translateX(0)"
                        : "translateX(25px)",
                    }}
                  >
                    {option.title}
                  </div>
                  <div
                    className="text-base text-gray-300 transition-all duration-700"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? "translateX(0)"
                        : "translateX(25px)",
                    }}
                  >
                    {option.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tailwind keyframes */}
      <style>{`
        @keyframes fadeInFromTop {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInTop {
          animation: fadeInFromTop 0.8s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default InteractiveSelector;
