"use client";

import { useState, useMemo } from "react";
import { marketers as initialMarketers, type Marketer } from "@/lib/marketers";
import { MarketerCard } from "./marketer-card";
import { CategoryFilter, type Category } from "./category-filter";
import { StatusLegend } from "./status-legend";
import { ClaimModal } from "./claim-modal";
import { CountdownTimer } from "./countdown-timer";
import { Share2 } from "lucide-react";

export function MarketersGrid() {
  const [marketers, setMarketers] = useState<Marketer[]>(initialMarketers);
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [claimingMarketer, setClaimingMarketer] = useState<Marketer | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredMarketers = useMemo(() => {
    if (selectedCategory === "All") return marketers;
    return marketers.filter((m) => m.category === selectedCategory);
  }, [marketers, selectedCategory]);

  const handleClaim = (id: string) => {
    const marketer = marketers.find((m) => m.id === id);
    if (marketer && marketer.status === "available") {
      setClaimingMarketer(marketer);
    }
  };

  const confirmClaim = (email: string) => {
    if (claimingMarketer) {
      setMarketers((prev) =>
        prev.map((m) =>
          m.id === claimingMarketer.id ? { ...m, status: "claimed" as const } : m
        )
      );
      setClaimingMarketer(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Helpful Marketers NYC",
        text: "Check out the best marketers in NYC!",
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="pt-8 pb-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500" />
            <span className="text-white/60 text-sm">A NYC Marketing Event</span>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors text-sm"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-8 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance">
          helpful<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300"> Marketers</span>
          <span className="block text-3xl md:text-4xl mt-2 text-white/80">NYC</span>
        </h1>
        <div className="mb-8">
          <CountdownTimer />
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 pb-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <CategoryFilter
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />
          <StatusLegend />
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMarketers.map((marketer) => (
              <MarketerCard
                key={marketer.id}
                marketer={marketer}
                onClaim={handleClaim}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6">How it works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-300 font-bold">1</span>
              </div>
              <h3 className="text-white font-medium mb-2">Browse Marketers</h3>
              <p className="text-white/60 text-sm">
                Explore NYC&apos;s top marketers by specialty
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-300 font-bold">2</span>
              </div>
              <h3 className="text-white font-medium mb-2">Claim Your Ticket</h3>
              <p className="text-white/60 text-sm">
                Select an available marketer to meet
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-300 font-bold">3</span>
              </div>
              <h3 className="text-white font-medium mb-2">Attend the Event</h3>
              <p className="text-white/60 text-sm">
                Network with the best in NYC marketing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Claim Modal */}
      <ClaimModal
        marketer={claimingMarketer}
        onClose={() => setClaimingMarketer(null)}
        onConfirm={confirmClaim}
      />

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-3 rounded-full font-medium shadow-lg">
          Ticket claimed successfully! Check your email.
        </div>
      )}
    </div>
  );
}
