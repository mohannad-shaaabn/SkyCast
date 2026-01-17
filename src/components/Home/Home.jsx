import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchWeather from "../../constant/api";
import { Hatch } from "ldrs/react";
import "ldrs/react/Hatch.css";

/* ===== Weather → Background mapping ===== */
const weatherBackgrounds = {
  Sunny:
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
  Clear:
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
  "Partly cloudy":
    "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31",
  Cloudy:
    "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31",
  Overcast:
    "https://images.unsplash.com/photo-1527766833261-b09c3163a791",
  Rain:
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
  Drizzle:
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
  Thunderstorm:
    "https://images.unsplash.com/photo-1500673922987-e212871fec22",
  Snow:
    "https://images.unsplash.com/photo-1608889175119-3f3b8f7c7c34",
  Mist:
    "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227",
  Fog:
    "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227",
};

export default function Home() {
  const [city, setCity] = useState(
    () => localStorage.getItem("city") || "London"
  );
  const [debouncedCity, setDebouncedCity] = useState(city);
  const [fallbackUsed, setFallbackUsed] = useState(false);
  const [hasFocused, setHasFocused] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  /* ===== Debounce ===== */
  useEffect(() => {
    const t = setTimeout(() => {
      const value = city.trim() || "London";
      setDebouncedCity(value);
      setFallbackUsed(false);
    }, 500);
    return () => clearTimeout(t);
  }, [city]);

  useEffect(() => {
    localStorage.setItem("city", debouncedCity);
  }, [debouncedCity]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["weather", debouncedCity],
    queryFn: () => fetchWeather(debouncedCity),
    enabled: !!debouncedCity,
    retry: false,
    onError: () => {
      if (debouncedCity !== "London" && !fallbackUsed) {
        setDebouncedCity("London");
        setFallbackUsed(true);
      }
    },
  });

  /* ===== Dynamic background ===== */
  const conditionText = data?.current?.condition?.text;
  const backgroundImage =
    weatherBackgrounds[conditionText] ||
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat text-white transition-all duration-700"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45 z-0"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="h-[250px] flex justify-center items-center">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => {
              if (!hasFocused) {
                setCity("");
                setHasFocused(true);
                setTimeout(() => setShowPlaceholder(true), 100);
              }
            }}
            placeholder={showPlaceholder ? "Find your location..." : ""}
            className="w-2/3 md:w-1/2 px-4 py-3 rounded-full text-black outline-none bg-white/80 backdrop-blur-sm border border-white/40"
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {(isLoading || isFetching) && (
            <div className="flex justify-center col-span-full">
              <Hatch size="40" stroke="4" speed="3.5" color="white" />
            </div>
          )}

          {data?.forecast?.forecastday?.map((day, index) => (
            <div
              key={day.date}
              className="
                bg-white/10 
                backdrop-blur-md 
                p-6 
                rounded-xl 
                shadow-lg 
                text-center
                border border-white/20
              "
            >
              <h3 className="text-lg mb-1">
                {new Date(day.date).toLocaleDateString("en-GB", {
                  weekday: "long",
                })}
              </h3>

              <p className="mb-4 text-sm text-white/80">
                {new Date(day.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })}
              </p>

              {index === 0 && (
                <h2 className="text-4xl font-bold mb-2">
                  {data.location.name}
                </h2>
              )}

              <div className="text-3xl font-bold">
                {day.day.avgtemp_c}°C
              </div>
              <div className="text-sm text-white/70">
                {day.day.mintemp_c}°
              </div>

              <img
                src={`https:${day.day.condition.icon}`}
                alt={day.day.condition.text}
                className="mx-auto my-2"
              />

              <p className="text-cyan-300">
                {day.day.condition.text}
              </p>

              {index === 0 && (
                <div className="flex justify-center gap-4 text-sm mt-4">
                  <span>💧 {day.day.daily_chance_of_rain}%</span>
                  <span>🌬 {day.day.maxwind_kph} km/h</span>
                  <span>🧭 {data.current.wind_dir}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
