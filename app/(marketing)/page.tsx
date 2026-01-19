"use client";

import Link from "next/link";
import { Shield, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import FeaturedRooms from "@/components/landing/featuredRooms";
import PropertySearchBar from "@/components/search/PropertySearchBar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="pt-32 pb-20 px-6">
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
              Find Your Perfect Room
              <br />
              in Nepal
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Discover verified rooms and apartments. Connect directly with owners. Move in faster.
            </p>

            {/* Search Bar */}
            <PropertySearchBar />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Listings</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">1000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Tenants</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Cities</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Featured Rooms */}
      <FeaturedRooms />
      {/* Features */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose RoomFinder
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Everything you need to find your perfect room
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Verified Listings",
                desc: "All properties and owners are verified for your safety",
              },
              {
                icon: Clock,
                title: "Quick Process",
                desc: "Find and move into your room within days",
              },
              {
                icon: CheckCircle2,
                title: "Direct Contact",
                desc: "Connect directly with property owners",
              },
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-purple-600 to-blue-600 mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Find Your Room?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Join thousands who found their perfect space
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8"
            >
              <Link href="/property">Browse Properties</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8">
              <Link href="/owner">List Property</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Logo size={50} />
            <span className="text-xl font-bold text-gray-900 dark:text-white">RoomFinder</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 RoomFinder. Made in Nepal.
          </p>
        </div>
      </footer>
    </div>
  );
}
