"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share2, X } from "lucide-react";
import { AnimatedCursor } from "@/components/animated-cursor";

type MarketerStatus = "available" | "claimed" | "active-bid";

interface Marketer {
  id: string;
  name: string;
  company: string;
  role: string;
  status: MarketerStatus;
}

const initialMarketers: Marketer[] = [
  { id: "1", name: "Sarah Chen", company: "Glossier", role: "Chief Marketing Officer", status: "claimed" },
  { id: "2", name: "Marcus Johnson", company: "Peloton", role: "VP of Growth", status: "available" },
  { id: "3", name: "Emily Rodriguez", company: "Away", role: "Head of Brand", status: "active-bid" },
  { id: "4", name: "David Kim", company: "Casper", role: "Director of Performance", status: "available" },
  { id: "5", name: "Alexandra Petrov", company: "Warby Parker", role: "CMO", status: "claimed" },
  { id: "6", name: "James Wright", company: "Allbirds", role: "Growth Lead", status: "available" },
  { id: "7", name: "Mia Thompson", company: "Rent the Runway", role: "Brand Director", status: "available" },
  { id: "8", name: "Nathan Park", company: "Harry's", role: "Performance Marketing Lead", status: "active-bid" },
  { id: "9", name: "Olivia Santos", company: "Sweetgreen", role: "Chief Marketing Officer", status: "available" },
  { id: "10", name: "Chris Anderson", company: "Outdoor Voices", role: "VP Growth Marketing", status: "claimed" },
  { id: "11", name: "Jessica Liu", company: "Blue Apron", role: "Head of Brand Strategy", status: "available" },
  { id: "12", name: "Ryan Mitchell", company: "Hims & Hers", role: "Director of Paid Media", status: "available" },
  { id: "13", name: "Amanda Foster", company: "Everlane", role: "CMO", status: "active-bid" },
  { id: "14", name: "Derek Huang", company: "WeWork", role: "Growth Marketing Manager", status: "available" },
  { id: "15", name: "Sophia Martinez", company: "Mirror", role: "Creative Director", status: "claimed" },
  { id: "16", name: "Tyler Brooks", company: "Ro", role: "Head of Performance", status: "available" },
  { id: "17", name: "Rachel Green", company: "Bombas", role: "VP of Marketing", status: "available" },
  { id: "18", name: "Kevin Patel", company: "Compass", role: "Growth Lead", status: "available" },
  { id: "19", name: "Lauren Scott", company: "Reformation", role: "Brand Marketing Director", status: "active-bid" },
  { id: "20", name: "Michael Torres", company: "Slice", role: "Performance Marketing Lead", status: "claimed" },
  { id: "21", name: "Priya Sharma", company: "Squarespace", role: "VP of Marketing", status: "available" },
  { id: "22", name: "Brandon Lee", company: "Oscar Health", role: "Growth Director", status: "available" },
  { id: "23", name: "Nicole Adams", company: "Etsy", role: "Head of Brand", status: "active-bid" },
  { id: "24", name: "Jordan Hayes", company: "Spotify NYC", role: "Senior Marketing Manager", status: "available" },
  { id: "25", name: "Vanessa Cruz", company: "Framebridge", role: "CMO", status: "claimed" },
  { id: "26", name: "Andrew Chen", company: "Flatiron Health", role: "VP Growth", status: "available" },
  { id: "27", name: "Isabella Romano", company: "Daily Harvest", role: "Brand Director", status: "available" },
  { id: "28", name: "William Park", company: "Teachable", role: "Head of Acquisition", status: "active-bid" },
  { id: "29", name: "Samantha Wells", company: "Birchbox", role: "Marketing Director", status: "available" },
  { id: "30", name: "Daniel Okafor", company: "Justworks", role: "VP of Marketing", status: "claimed" },
  { id: "31", name: "Grace Kim", company: "Betterment", role: "Head of Growth", status: "available" },
  { id: "32", name: "Ethan Miller", company: "Glossier", role: "Performance Lead", status: "available" },
  { id: "33", name: "Zoe Washington", company: "Kickstarter", role: "Brand Marketing Lead", status: "active-bid" },
  { id: "34", name: "Lucas Rivera", company: "Monday.com NYC", role: "Growth Manager", status: "available" },
  { id: "35", name: "Hannah Goldberg", company: "Spring Health", role: "CMO", status: "available" },
  { id: "36", name: "Omar Hassan", company: "Lemonade", role: "VP of Brand", status: "claimed" },
  { id: "37", name: "Catherine Zhang", company: "Plaid", role: "Marketing Director", status: "available" },
  { id: "38", name: "Jack Thompson", company: "Ramp", role: "Head of Growth", status: "available" },
  { id: "39", name: "Aaliyah Brown", company: "ClassPass", role: "Senior Brand Manager", status: "active-bid" },
  { id: "40", name: "Sebastian Morales", company: "Faire", role: "Performance Marketing Lead", status: "available" },
  { id: "41", name: "Emma Wilson", company: "Notion NYC", role: "VP of Marketing", status: "available" },
  { id: "42", name: "Noah Garcia", company: "Cockroach Labs", role: "Growth Lead", status: "claimed" },
  { id: "43", name: "Lily Chen", company: "Attentive", role: "CMO", status: "available" },
  { id: "44", name: "Mason Taylor", company: "Datadog", role: "Director of Demand Gen", status: "available" },
  { id: "45", name: "Ava Nguyen", company: "Yieldstreet", role: "Head of Brand", status: "active-bid" },
  { id: "46", name: "Benjamin Clark", company: "Thirty Madison", role: "VP Growth Marketing", status: "available" },
  { id: "47", name: "Chloe Martin", company: "K Health", role: "Marketing Director", status: "available" },
  { id: "48", name: "Dylan Patel", company: "Noom", role: "Head of Performance", status: "claimed" },
  { id: "49", name: "Ella Robinson", company: "Calm", role: "Brand Strategy Lead", status: "available" },
  { id: "50", name: "Finn O'Brien", company: "Stash", role: "Growth Marketing Manager", status: "available" },
];

export default function Home() {
  const [marketers, setMarketers] = useState<Marketer[]>(initialMarketers);
  const [claimingMarketer, setClaimingMarketer] = useState<Marketer | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [email, setEmail] = useState("");

  const handleClaim = (id: string) => {
    const marketer = marketers.find((m) => m.id === id);
    if (marketer && marketer.status === "available") {
      setClaimingMarketer(marketer);
    }
  };

  const confirmClaim = () => {
    if (claimingMarketer && linkedInUrl) {
      setMarketers((prev) =>
        prev.map((m) =>
          m.id === claimingMarketer.id ? { ...m, status: "claimed" as const } : m
        )
      );
      setClaimingMarketer(null);
      setLinkedInUrl("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <main 
      className="min-h-screen overflow-x-hidden"
      style={{
        background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(255,255,255,0.04) 0%, transparent 40%), black"
      }}
    >
      {/* Header */}
      <header className="pt-6 md:pt-8 pb-4 px-4 animate-fade-in">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-purple-600 shrink-0" />
            <span className="text-white/60 text-xs md:text-sm truncate">GTM Summit by <a href="https://mycliqk.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors duration-300">Cliqk</a></span>
          </div>
          <button className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-all duration-300 text-xs md:text-sm shrink-0 hover:scale-105">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-6 md:py-8 px-4 relative">
        <AnimatedCursor />
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 animate-slide-up tracking-tight">
            Best
            <span className="text-purple-400"> Marketers</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl mt-2 text-white/60 font-normal tracking-wide">NYC</span>
          </h1>
          <p className="text-white/60 text-sm mb-6 animate-slide-up animation-delay-100">
            GTM Summit by{" "}
            <a 
              href="https://mycliqk.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors duration-300"
            >
              Cliqk
            </a>
          </p>
          
          {/* Legend */}
          <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm animate-slide-up animation-delay-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-white/70">Active bid</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500" />
              <span className="text-white/70">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-white/20" />
              <span className="text-white/70">Claimed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {marketers.map((marketer, index) => (
              <div
                key={marketer.id}
                onClick={() => marketer.status === "available" && handleClaim(marketer.id)}
                className={`relative group cursor-pointer transition-all duration-300 bg-zinc-900 rounded-xl p-3 md:p-4 border border-zinc-800 hover:bg-zinc-800 hover:border-purple-500/30 hover:scale-[1.03] hover:-translate-y-1 ${
                  marketer.status === "claimed" ? "opacity-60" : ""
                }`}
              >
                {/* Status indicator */}
                <div className="absolute top-2 right-2 md:top-3 md:right-3 flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      marketer.status === "available"
                        ? "bg-emerald-500"
                        : marketer.status === "active-bid"
                        ? "bg-amber-500 animate-pulse"
                        : "bg-white/20"
                    }`}
                  />
                </div>

                {/* Avatar */}
                <div className="relative w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800 transition-transform duration-300 group-hover:scale-110">
                    <span className="text-white text-lg md:text-xl font-serif font-bold">{marketer.name.charAt(0)}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="font-semibold text-white text-xs md:text-sm truncate">{marketer.name}</h3>
                  <p className="text-white/60 text-[10px] md:text-xs truncate">{marketer.role}</p>
                  <p className="text-purple-400 text-[10px] md:text-xs mt-1 truncate">{marketer.company}</p>
                </div>

                {/* Hover overlay for available cards */}
                {marketer.status === "available" && (
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent rounded-xl flex items-end justify-center pb-3 md:pb-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-white font-medium text-xs md:text-sm">Click to Claim</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4">The Process</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 md:mb-20 leading-tight">
            How it <span className="italic font-normal">works</span>
          </h2>
          <div className="space-y-16 md:space-y-20">
            {[
              { num: "01", title: "Browse the Directory", desc: "Explore NYC's top marketing professionals. Each card represents a leader in their field." },
              { num: "02", title: "Claim Your Ticket", desc: "Found yourself? Repost your profile on LinkedIn and submit the link to claim your exclusive invite." },
              { num: "03", title: "Attend GTM Summit", desc: "Join the gathering. Network with the best marketers in NYC and build lasting connections." },
            ].map((step, index) => (
              <div key={step.num} className="flex gap-6 md:gap-10 items-start">
                <span className="text-purple-500 font-bold text-sm md:text-base shrink-0 pt-1">{step.num}</span>
                <div>
                  <h3 className="text-white font-bold text-lg md:text-2xl mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-md">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4">Questions</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 md:mb-20 leading-tight">
            Frequently <span className="italic font-normal">Asked</span>
          </h2>
          <div className="space-y-12 md:space-y-16">
            <div className="border-t border-white/10 pt-8">
              <h3 className="text-white font-bold text-lg md:text-xl mb-4">What is GTM Summit?</h3>
              <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-2xl">
                GTM Summit is an <strong className="text-white">exclusive invite-only event</strong> hosted by{" "}
                <a href="https://mycliqk.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">Cliqk</a>{" "}
                that brings together the best marketers in New York City. This curated gathering fosters meaningful connections between top marketing professionals, providing a unique opportunity to network, share insights, and collaborate with the most influential minds in the NYC marketing scene.
              </p>
            </div>
            <div className="border-t border-white/10 pt-8">
              <h3 className="text-white font-bold text-lg md:text-xl mb-4">Can I transfer my ticket to another marketer?</h3>
              <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-2xl">
                <strong className="text-white">Yes, absolutely.</strong> If you have claimed a ticket but would like to transfer it to another deserving marketer, simply reach out to us at{" "}
                <a href="https://mycliqk.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">Cliqk</a>{" "}
                with the details and we will facilitate the transfer. We encourage sharing this opportunity with fellow marketers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GTM Summit Event */}
      <section className="px-4 pb-20 md:pb-32">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-4">The Event</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            GTM <span className="italic font-normal">Summit</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg mb-12 md:mb-16 max-w-xl leading-relaxed">
            An invite-only gathering for <strong className="text-white">CMOs, growth leaders, founders</strong>, and social media operators building modern go-to-market engines.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 mb-12 md:mb-16">
            <div>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-2">Location</p>
              <p className="text-white font-bold text-base md:text-lg">404 Broadway, 2nd Floor</p>
              <p className="text-white/50 text-sm">New York, NY</p>
            </div>
            <div>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-2">Hosted By</p>
              <p className="text-white font-bold text-base md:text-lg">Ilias Anwar & Rohan Gurram</p>
              <p className="text-white/50 text-sm">Cliqk</p>
            </div>
          </div>
          
          <a
            href="https://lu.ma/1gl9fcra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-bold text-sm md:text-base group"
          >
            Apply to Attend
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>
        </div>
      </section>

      {/* Claim Modal */}
      {claimingMarketer && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setClaimingMarketer(null)} />
          <div className="relative rounded-t-2xl sm:rounded-2xl p-5 md:p-6 w-full sm:max-w-md border-t sm:border border-zinc-800 shadow-2xl bg-zinc-900 animate-slide-up-modal">
            <button
              onClick={() => setClaimingMarketer(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-5 md:mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800">
                <span className="text-white text-xl md:text-2xl font-serif font-bold">{claimingMarketer.name.charAt(0)}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-white mb-1">Claim Your Ticket</h2>
              <p className="text-zinc-400 text-sm">
                Meet <span className="text-purple-400">{claimingMarketer.name}</span> at GTM Summit
              </p>
              <p className="text-white/40 text-xs md:text-sm">
                {claimingMarketer.role} at {claimingMarketer.company}
              </p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="bg-zinc-800 rounded-lg p-3 md:p-4 border border-zinc-700">
                <p className="text-zinc-300 text-xs md:text-sm mb-2 md:mb-3">
                  To claim your ticket, repost your photo from the directory on LinkedIn and submit the link below.
                </p>
                <p className="text-zinc-500 text-[10px] md:text-xs">
                  Can't attend? You can still claim by reposting and give your ticket to another deserving marketer.
                </p>
              </div>
              <Input
                type="url"
                placeholder="Paste your LinkedIn post link"
                value={linkedInUrl}
                onChange={(e) => setLinkedInUrl(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 text-sm"
              />
              <Button
                onClick={confirmClaim}
                disabled={!linkedInUrl}
                className="w-full text-white font-semibold py-5 md:py-6 bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:scale-[1.02]"
              >
                Submit & Claim Ticket
              </Button>
            </div>
            <p className="text-center text-zinc-500 text-[10px] md:text-xs mt-3 md:mt-4">
              By claiming, you agree to attend or transfer your ticket to another marketer
            </p>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-4 md:bottom-8 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 bg-emerald-500 text-white px-4 md:px-6 py-3 rounded-xl md:rounded-full font-medium shadow-lg text-sm md:text-base text-center animate-slide-up-modal">
          Ticket claimed successfully!
        </div>
      )}
    </main>
  );
}
