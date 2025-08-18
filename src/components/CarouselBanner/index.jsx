import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { classNames } from "../../utils/classname";
import Button from "../ui/button";
import { ArrowRight, ArrowLeft, Play, Shield, Clock, Users } from "lucide-react";
import metaData from "../../utils/lib/site.config";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      image: "/slider1.jpg",
      title: "Your Financial Partner",
      subtitle: "Trusted loan solutions for every need",
      description: "Get the financial support you need with our comprehensive loan services. Quick approval, competitive rates, and personalized solutions.",
      cta: "Apply Now",
      ctaLink: "/apply-loan",
      secondaryCta: "Learn More",
      secondaryCtaLink: "/about-us",
      features: [
        { icon: Shield, text: "Secure & Trusted" },
        { icon: Clock, text: "Quick Approval" },
        { icon: Users, text: "24/7 Support" }
      ]
    },
    {
      id: 2,
      image: "/slider2.jpg",
      title: "Multiple Loan Options",
      subtitle: "From personal to business loans",
      description: "Choose from our wide range of loan products designed to meet your specific financial requirements and goals.",
      cta: "Explore Loans",
      ctaLink: "/services/loan",
      secondaryCta: "Calculate EMI",
      secondaryCtaLink: "/calculator",
      features: [
        { icon: Shield, text: "Low Interest Rates" },
        { icon: Clock, text: "Flexible Terms" },
        { icon: Users, text: "Expert Guidance" }
      ]
    },
    {
      id: 3,
      image: "/slider3.jpg",
      title: "Join Our Network",
      subtitle: "Become a financial partner",
      description: "Start your career with us as an agent and help others achieve their financial dreams while building your own success.",
      cta: "Join Now",
      ctaLink: "/Career",
      secondaryCta: "Contact Us",
      secondaryCtaLink: "/contact-us",
      features: [
        { icon: Shield, text: "Training Provided" },
        { icon: Clock, text: "Flexible Hours" },
        { icon: Users, text: "Growth Opportunities" }
      ]
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={classNames(
            "absolute inset-0 transition-all duration-1000 ease-in-out",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-white space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {slides[currentSlide].title}
                </h1>
                <p className="text-xl md:text-2xl text-neutral-200 font-medium">
                  {slides[currentSlide].subtitle}
                </p>
                <p className="text-lg text-neutral-300 max-w-2xl">
                  {slides[currentSlide].description}
                </p>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-6">
                {slides[currentSlide].features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-neutral-200">
                    <feature.icon className="w-5 h-5 text-primary-400" />
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => window.location.href = slides[currentSlide].ctaLink}
                  className="text-lg px-8 py-4"
                >
                  {slides[currentSlide].cta}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => window.location.href = slides[currentSlide].secondaryCtaLink}
                  className="text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  {slides[currentSlide].secondaryCta}
                </Button>
              </div>
            </div>

            {/* Visual Element */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-96 h-96 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex items-center space-x-4">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Slide Indicators */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={classNames(
                  "w-3 h-3 rounded-full transition-all duration-200",
                  index === currentSlide
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                )}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 text-white"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
