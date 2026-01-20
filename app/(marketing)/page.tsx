"use client";

import Link from "next/link";
import {
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Home,
  Users,
  Star,
  Heart,
  Bell,
  Search,
  MapPin,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import FeaturedRooms from "@/components/landing/featuredRooms";
import PropertySearchBar from "@/components/search/PropertySearchBar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900"></div>

        {/* Animated circles */}
        <div className="absolute top-20 right-20 h-64 w-64 animate-pulse rounded-full bg-indigo-500/30 blur-3xl"></div>
        <div
          className="absolute bottom-20 left-20 h-80 w-80 animate-pulse rounded-full bg-indigo-400/30 blur-3xl"
          style={{ animationDuration: "8s" }}
        ></div>

        <div className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 py-24 text-center text-white">
          <motion.h1
            className="mb-6 text-4xl font-bold md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Find Your Perfect <span className="inline-block">Room in Nepal</span>
          </motion.h1>

          <motion.p
            className="mb-8 max-w-2xl text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Discover verified rooms across Nepal. Connect with owners instantly and move in faster.
          </motion.p>

          <motion.div
            className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              href="/property"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-white px-8 py-3 font-semibold text-indigo-700 shadow-lg transition-all hover:shadow-xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                Browse Properties
                <ArrowRight className="h-5 w-5" />
              </span>
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-indigo-100 to-white transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
            </Link>
            <Link
              href="/add-property"
              className="group inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              List Property
            </Link>
          </motion.div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-3">
            {[
              { icon: Home, value: "500+", label: "Properties" },
              { icon: Users, value: "1000+", label: "Users" },
              { icon: Star, value: "50+", label: "Cities" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-indigo-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full"
            height="40"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white dark:bg-gray-950 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <motion.h2
              className="text-3xl font-bold text-gray-900 dark:text-white mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Start Your Search
            </motion.h2>
            <motion.p
              className="text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Find your perfect room in seconds
            </motion.p>
          </div>
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <PropertySearchBar />
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center mx-auto mb-2 border border-green-200 dark:border-green-900">
                    <CheckCircle2 className="h-7 w-7 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    Verified
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center mx-auto mb-2 border border-indigo-200 dark:border-indigo-900">
                    <Shield className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">Secure</div>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center mx-auto mb-2 border border-purple-200 dark:border-purple-900">
                    <Clock className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">Fast</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Rooms */}
      <FeaturedRooms />

      {/* Features Grid */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Everything You Need in One Platform
            </motion.h2>
            <motion.p
              className="text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Powerful features to help you find your perfect room
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Search,
                title: "Smart Search",
                desc: "Advanced filters to find what you need",
              },
              {
                icon: Shield,
                title: "Verified Listings",
                desc: "All properties verified for safety",
              },
              {
                icon: MessageSquare,
                title: "Direct Contact",
                desc: "Connect with owners instantly",
              },
              {
                icon: Heart,
                title: "Save Favorites",
                desc: "Bookmark properties you love",
              },
              {
                icon: Bell,
                title: "Notifications",
                desc: "Get instant updates",
              },
              {
                icon: MapPin,
                title: "Location-based",
                desc: "Find rooms in your area",
              },
              {
                icon: Clock,
                title: "Quick Process",
                desc: "Move in within days",
              },
              {
                icon: CheckCircle2,
                title: "No Middleman",
                desc: "Connect directly with owners",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group rounded-xl border border-gray-100 bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 flex h-12 w-12 items-center justify-center transition-transform group-hover:scale-110">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              How It Works
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Get started in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Search & Browse",
                desc: "Use our smart search to find properties that match your needs",
              },
              {
                step: "02",
                title: "Send Inquiry",
                desc: "Contact property owners directly through our platform",
              },
              {
                step: "03",
                title: "Move In",
                desc: "Finalize details and move into your perfect room",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-6xl font-black text-gray-200 dark:text-gray-800 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-indigo-600"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-20 text-center text-white">
        {/* Animated circles */}
        <div className="absolute top-10 right-10 h-48 w-48 animate-pulse rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div
          className="absolute bottom-10 left-10 h-64 w-64 animate-pulse rounded-full bg-indigo-400/20 blur-3xl"
          style={{ animationDuration: "6s" }}
        ></div>

        <div className="mx-auto max-w-7xl relative z-10">
          <motion.h2
            className="mb-6 text-3xl font-bold md:text-4xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Ready to Find Your Room?
          </motion.h2>
          <motion.p
            className="mx-auto mb-8 max-w-2xl text-lg text-indigo-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands who found their perfect space with RoomFinder
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href="/property"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-white px-8 py-3 font-semibold text-indigo-700 shadow-lg transition-all hover:shadow-xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                Browse Properties Now
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-indigo-100 to-white transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12 bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Logo size={50} />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">RoomFinder</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} RoomFinder. Made with ❤️ in Nepal.
          </p>
        </div>
      </footer>
    </div>
  );
}
