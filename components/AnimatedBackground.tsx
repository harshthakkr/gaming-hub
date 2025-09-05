"use client";

import Image from "next/image";
import { memo } from "react";

const AnimatedColumn = memo(
  ({
    covers,
    animationClass,
  }: {
    covers: string[];
    animationClass: string;
  }) => {
    const totalHeight = covers.length * 298;

    return (
      <div className="relative h-screen overflow-hidden">
        <div
          className={`flex flex-col gap-8 ${animationClass}`}
          style={{ height: `${totalHeight * 2}px` }}
        >
          {covers.map((cover, index) => (
            <div
              key={`set1-${cover}-${index}`}
              className="relative rounded-xl overflow-hidden shadow-2xl w-[200px] h-[266px] flex-shrink-0"
            >
              <Image
                src={`/covers/${cover}`}
                alt="Game Cover"
                fill
                className="object-contain"
                sizes="200px"
                quality={90}
                priority={index < 2}
              />
            </div>
          ))}

          {covers.map((cover, index) => (
            <div
              key={`set2-${cover}-${index}`}
              className="relative rounded-xl overflow-hidden shadow-2xl w-[200px] h-[266px] flex-shrink-0"
            >
              <Image
                src={`/covers/${cover}`}
                alt="Game Cover"
                fill
                className="object-contain"
                sizes="200px"
                quality={90}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

AnimatedColumn.displayName = "AnimatedColumn";

export const AnimatedBackground = memo(() => {
  const column1Games = [
    "Silent_Hill_2_cover.jpg",
    "Red_Dead_Redemption_2_cover.jpg",
    "Sekiro_Shadows_Die_Twice_cover.jpg",
    "Assassin_s_Creed_Origins_cover.jpg",
    "Minecraft_cover.jpg",
    "The_Legend_of_Zelda_Breath_of_the_Wild_cover.jpg",
    "Valorant_cover.jpg",
  ];

  const column2Games = [
    "Elden_Ring_cover.jpg",
    "Marvel_s_Spider_Man_cover.jpg",
    "Cyberpunk_2077_cover.jpg",
    "God_of_War_Ragnar_k_cover.jpg",
    "Resident_Evil_4_cover.jpg",
    "The_Last_of_Us_cover.jpg",
    "Grand_Theft_Auto_VI_cover.jpg",
  ];

  const column3Games = [
    "Ghost_of_Yotei_cover.jpg",
    "Alan_Wake_II_cover.jpg",
    "Call_of_Duty_Modern_Warfare_cover.jpg",
    "Sifu_cover.jpg",
    "EA_Sports_FC_25_cover.jpg",
    "Limbo_cover.jpg",
    "Subway_Surfers_cover.jpg",
  ];

  return (
    <div className="absolute inset-0 flex justify-center items-start overflow-hidden gap-8">
      <div className="w-52">
        <AnimatedColumn
          covers={column1Games}
          animationClass="animate-scroll-up-slow"
        />
      </div>

      <div className="w-52">
        <AnimatedColumn
          covers={column2Games}
          animationClass="animate-scroll-down-medium"
        />
      </div>

      <div className="w-52">
        <AnimatedColumn
          covers={column3Games}
          animationClass="animate-scroll-up-slow"
        />
      </div>
    </div>
  );
});

AnimatedBackground.displayName = "AnimatedBackground";
