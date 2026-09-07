"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Heart, ArrowUpRight } from "lucide-react";
import { heroSlides } from "@/data/pk/home";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/cn";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "@/app/styles/hero-slider.css";

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10.438 5.489c0.451-0.451 1.161-0.451 1.613 0 0.436 0.436 0.436 1.161 0 1.596l-8.176 8.176h26.981c0.629 0 1.145 0.5 1.145 1.129s-0.516 1.145-1.145 1.145h-26.981l8.176 8.161c0.436 0.451 0.436 1.178 0 1.613-0.451 0.451-1.161 0.451-1.613 0l-10.112-10.112c-0.436-0.436-0.436-1.161 0-1.596l10.112-10.112z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M21.548 5.088c-0.436-0.451-1.162-0.451-1.613 0-0.436 0.436-0.436 1.162 0 1.596l8.177 8.177h-26.984c-0.629 0.001-1.129 0.501-1.129 1.13s0.5 1.145 1.129 1.145h26.984l-8.177 8.162c-0.436 0.451-0.436 1.178 0 1.613 0.451 0.451 1.178 0.451 1.613 0l10.113-10.113c0.451-0.436 0.451-1.162 0-1.596l-10.113-10.114z" />
    </svg>
  );
}

export function PKHeroSlider() {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { isUrdu, t } = useI18n();

  const onSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  return (
    <section
      className={cn("hero-slider", isUrdu && "hero-slider--rtl")}
      aria-label="Featured humanitarian initiatives in Pakistan"
      dir={isUrdu ? "rtl" : "ltr"}
    >
      {/* Subtle Warm Accent Glow */}
      <div className="hero-slider__glow" aria-hidden="true" />

      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        speed={850}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        slidesPerView={1}
        navigation={{
          prevEl,
          nextEl,
        }}
        pagination={{
          clickable: true,
          el: ".hero-slider__dots",
          bulletClass: "hero-slider__dot",
          bulletActiveClass: "hero-slider__dot--active",
        }}
        onSlideChange={onSlideChange}
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id || index}>
            <div className="hero-slider__slide">
              {/* Crisp Photography Background */}
              <div className="hero-slider__media">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  quality={90}
                />
              </div>

              {/* Directional Vignette Overlay (Leaves Photo Natural on the side) */}
              <div className="hero-slider__overlay" aria-hidden="true" />

              {/* Main Content Presentation */}
              <div className="hero-slider__content">
                <div className="hero-slider__intro">
                  {/* Status & Category Pill */}
                  <div className="hero-slider__badge">
                    <span className="hero-slider__badge-dot" />
                    <span>
                      {isUrdu
                        ? `۱۰۰٪ تصدیق شدہ زکوٰۃ • ${slide.categoryUrdu || "امدادی مشن"}`
                        : `100% Zakat Verified • ${slide.category || "Field Mission"}`}
                    </span>
                  </div>

                  {/* Brand Monogram Identity */}
                  <div className="hero-slider__brand">
                    <span className="hero-slider__brand-mark">
                      {isUrdu ? "الرحمٰن ویلفیئر فاؤنڈیشن" : "AWF PAKISTAN"}
                    </span>
                    <span className="hero-slider__brand-divider" aria-hidden="true" />
                    <span className="hero-slider__brand-full">
                      {isUrdu ? "پاکستان مشن" : "Arrahman Welfare Foundation"}
                    </span>
                  </div>

                  {/* Prominent Editorial Title */}
                  <h1
                    className={cn(
                      "hero-slider__title",
                      isUrdu && "hero-slider__title--urdu"
                    )}
                  >
                    {isUrdu ? slide.urduTitle : slide.title}
                  </h1>

                  {/* Clear Description Paragraph */}
                  <p className="hero-slider__text">
                    {slide.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="hero-slider__actions">
                    <Link
                      href={slide.donateUrl || "/donate"}
                      className="hero-slider__btn-primary"
                    >
                      <Heart className="w-5 h-5 fill-white text-white" />
                      <span>{isUrdu ? "عطیہ کریں" : t("hero.donateBtn", "Donate Now")}</span>
                    </Link>

                    <Link
                      href={slide.learnMoreHref || "/projects"}
                      className="hero-slider__btn-secondary"
                    >
                      <span>{isUrdu ? "منصوبہ دیکھیں" : t("hero.projectsBtn", "Explore Project")}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Floating Glassmorphic Arrow Controls */}
      <button
        ref={setPrevEl}
        type="button"
        className="hero-slider__nav hero-slider__nav--prev"
        aria-label="Previous slide"
      >
        <ArrowLeftIcon />
      </button>
      <button
        ref={setNextEl}
        type="button"
        className="hero-slider__nav hero-slider__nav--next"
        aria-label="Next slide"
      >
        <ArrowRightIcon />
      </button>

      {/* Pagination Pill Dots */}
      <div className="hero-slider__dots" />
    </section>
  );
}
