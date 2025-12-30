import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Map,
  Smartphone,
  Star,
  Users,
  Bike,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Play,
  Sparkles,
  Target,
  Headphones,
  CreditCard,
  ArrowUpRight,
  Quote,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

export const Home = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { value: "10K+", label: t("home.stats.customers"), suffix: "" },
    { value: "500+", label: t("home.stats.vehicles"), suffix: "" },
    { value: "4.9", label: t("home.stats.rating"), suffix: "/5" },
    { value: "24/7", label: t("home.stats.support"), suffix: "" },
  ];

  const features = [
    {
      icon: Map,
      title: t("home.features.realTimeTracking"),
      desc: t("home.features.realTimeTrackingDesc"),
    },
    {
      icon: Smartphone,
      title: t("home.features.smartBooking"),
      desc: t("home.features.smartBookingDesc"),
    },
    {
      icon: ShieldCheck,
      title: t("home.features.verifiedFleet"),
      desc: t("home.features.verifiedFleetDesc"),
    },
    {
      icon: CreditCard,
      title: t("home.features.securityTitle"),
      desc: t("home.features.securityDesc"),
    },
  ];

  const testimonials = [
    {
      name: "Nguyen Minh Tuan",
      role: t("home.testimonials.role1"),
      content: t("home.testimonials.content1"),
      avatar: "T",
    },
    {
      name: "Tran Thi Mai",
      role: t("home.testimonials.role2"),
      content: t("home.testimonials.content2"),
      avatar: "M",
    },
    {
      name: "Le Van Hung",
      role: t("home.testimonials.role3"),
      content: t("home.testimonials.content3"),
      avatar: "H",
    },
  ];

  const steps = [
    {
      num: "01",
      title: t("home.steps.step1Title"),
      desc: t("home.steps.step1Desc"),
      icon: Target,
    },
    {
      num: "02",
      title: t("home.steps.step2Title"),
      desc: t("home.steps.step2Desc"),
      icon: CreditCard,
    },
    {
      num: "03",
      title: t("home.steps.step3Title"),
      desc: t("home.steps.step3Desc"),
      icon: Bike,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-blue-100/40 dark:from-blue-900/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-100/30 dark:from-indigo-900/20 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div
              className={`space-y-8 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-blue-500/25">
                <Sparkles className="w-4 h-4" />
                {t("home.hero.badge")}
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                  {t("home.hero.title1")}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                    {t("home.hero.title2")}
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-300 max-w-lg leading-relaxed">
                  {t("home.hero.description")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/search"
                  className="group inline-flex items-center justify-center gap-3 bg-slate-900 dark:bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-all duration-300 shadow-xl shadow-slate-900/20 dark:shadow-blue-600/20 hover:shadow-2xl hover:shadow-slate-900/30 dark:hover:shadow-blue-600/30 hover:-translate-y-0.5"
                >
                  {t("home.hero.cta1")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="group inline-flex items-center justify-center gap-3 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-200 px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-slate-200 dark:border-gray-600 hover:border-slate-300 dark:hover:border-gray-500 hover:bg-slate-50 dark:hover:bg-gray-700 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  </div>
                  {t("home.hero.cta2")}
                </button>
              </div>

              <div className="flex items-center gap-8 pt-8 border-t border-slate-200 dark:border-gray-700">
                {stats.slice(0, 3).map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">
                      {stat.value}
                      <span className="text-blue-600 dark:text-blue-400">
                        {stat.suffix}
                      </span>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-gray-400 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-gray-900/50 overflow-hidden border border-slate-100 dark:border-gray-700">
                <div className="aspect-[4/3] relative">
                  <img
                    src="/images/banner1.png"
                    alt="MixiRide"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-white/80 text-sm mb-1">
                          Honda Vision 2024
                        </p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-white">
                            150K
                          </span>
                          <span className="text-white/70">
                            /{t("home.hero.perDay")}
                          </span>
                        </div>
                      </div>
                      <Link
                        to="/search"
                        className="bg-white text-slate-900 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-100 transition-colors flex items-center gap-2"
                      >
                        {t("home.hero.bookNow")}
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl shadow-slate-200/50 dark:shadow-gray-900/50 border border-slate-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      4.9
                    </div>
                    <div className="text-xs text-slate-500 dark:text-gray-400">
                      10K+ {t("home.hero.reviews")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl shadow-slate-200/50 dark:shadow-gray-900/50 border border-slate-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      500+
                    </div>
                    <div className="text-xs text-slate-500 dark:text-gray-400">
                      {t("home.hero.activeVehicles")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider mb-3">
              {t("home.howItWorks.badge")}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              {t("home.howItWorks.title")}
            </h2>
            <p className="text-slate-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              {t("home.howItWorks.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 dark:border-gray-700 hover:border-blue-100 dark:hover:border-blue-800"
              >
                <div className="absolute -top-4 left-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                  {step.num}
                </div>
                <div className="pt-4">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-gray-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                    <step.icon className="w-8 h-8 text-slate-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 z-10">
                    <ChevronRight className="w-8 h-8 text-slate-300 dark:text-gray-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider mb-3">
                {t("home.features.title")}
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                {t("home.features.subtitle")}
              </h2>
              <p className="text-slate-600 dark:text-gray-300 text-lg mb-10">
                {t("home.features.award")}
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="group p-6 rounded-2xl bg-slate-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-slate-100 dark:hover:border-gray-600"
                  >
                    <div className="w-12 h-12 bg-white dark:bg-gray-900 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-sm transition-all duration-300">
                      <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50">
                <img
                  src="/images/banner1.png"
                  alt="Features"
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                    <Headphones className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-blue-100 text-sm">
                      {t("home.stats.support")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-900 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-400 dark:text-blue-500 font-semibold text-sm uppercase tracking-wider mb-3">
              {t("home.testimonials.badge")}
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t("home.testimonials.title")}
            </h2>
            <p className="text-slate-400 dark:text-gray-500 max-w-2xl mx-auto text-lg">
              {t("home.testimonials.subtitle")}
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Quote className="absolute -top-8 -left-8 w-24 h-24 text-slate-800 dark:text-gray-900" />
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-slate-800/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-3xl p-10 border border-slate-700/50 dark:border-gray-800/50">
                      <div className="flex items-center gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed font-light">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-white text-lg">
                            {testimonial.name}
                          </div>
                          <div className="text-slate-400">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-10">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-blue-500 w-10"
                      : "bg-slate-600 w-2 hover:bg-slate-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 rounded-[2.5rem] p-12 sm:p-16 lg:p-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {t("home.cta.title")}
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                {t("home.cta.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/search"
                  className="inline-flex items-center justify-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-slate-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  {t("home.cta.button1")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                {!user && (
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold text-lg border border-white/30 hover:bg-white/20 transition-all duration-300"
                  >
                    {t("home.cta.button2")}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-gray-800 border-t border-slate-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <Bike className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  MixiRide
                </span>
              </div>
              <p className="text-slate-600 dark:text-gray-300 mb-8 max-w-md leading-relaxed">
                {t("home.footer.description")}
              </p>
              <div className="flex gap-3">
                {["F", "I", "T", "Y"].map((letter, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-11 h-11 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center text-slate-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm border border-slate-200 dark:border-gray-600"
                  >
                    <span className="font-semibold text-sm">{letter}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-6">
                {t("home.footer.contact")}
              </h4>
              <div className="space-y-4">
                <a
                  href="tel:+84123456789"
                  className="flex items-center gap-3 text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>+84 123 456 789</span>
                </a>
                <a
                  href="mailto:contact@mixiride.com"
                  className="flex items-center gap-3 text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>contact@mixiride.com</span>
                </a>
                <div className="flex items-start gap-3 text-slate-600 dark:text-gray-300">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>2 Vo Oanh, Binh Thanh, TP.HCM</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-6">
                {t("home.footer.quickLinks")}
              </h4>
              <div className="space-y-3">
                {[
                  { label: t("nav.home"), to: "/" },
                  { label: t("nav.findVehicle"), to: "/search" },
                  { label: t("home.footer.about"), to: "#" },
                  { label: t("home.footer.support"), to: "#" },
                ].map((link) => (
                  <Link
                    key={link.to + link.label}
                    to={link.to}
                    className="block text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 dark:text-gray-400 text-sm">
              {t("home.footer.copyright")}
            </p>
            <div className="flex gap-8 text-sm">
              <a
                href="#"
                className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {t("home.footer.privacy")}
              </a>
              <a
                href="#"
                className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {t("home.footer.terms")}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
