"use client";

import { useState } from "react";
import type { Marketer, MarketerStatus } from "@/lib/marketers";
import { cn } from "@/lib/utils";

interface MarketerCardProps {
  marketer: Marketer;
  onClaim?: (id: string) => void;
}

const statusColors: Record<MarketerStatus, string> = {
  available: "bg-emerald-500",
  claimed: "bg-white/20",
  "active-bid": "bg-amber-500",
};

const statusText: Record<MarketerStatus, string> = {
  available: "Available",
  claimed: "Claimed",
  "active-bid": "Active Bid",
};

export function MarketerCard({ marketer, onClaim }: MarketerCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "relative group cursor-pointer transition-all duration-300",
        "bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10",
        "hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]",
        marketer.status === "claimed" && "opacity-60"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => marketer.status === "available" && onClaim?.(marketer.id)}
    >
      {/* Status indicator */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <span
          className={cn(
            "w-2 h-2 rounded-full",
            statusColors[marketer.status],
            marketer.status === "active-bid" && "animate-pulse"
          )}
        />
        <span className="text-xs text-white/60">{statusText[marketer.status]}</span>
      </div>

      {/* Avatar */}
      <div className="relative w-16 h-16 mx-auto mb-3">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <span className="text-white text-xl font-bold">
            {marketer.name.charAt(0)}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="text-center">
        <h3 className="font-semibold text-white text-sm truncate">{marketer.name}</h3>
        <p className="text-white/60 text-xs truncate">{marketer.role}</p>
        <p className="text-purple-300 text-xs mt-1 truncate">{marketer.company}</p>
      </div>

      {/* Hover overlay for available cards */}
      {marketer.status === "available" && isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/90 to-transparent rounded-xl flex items-end justify-center pb-4">
          <span className="text-white font-medium text-sm">Click to Claim Ticket</span>
        </div>
      )}
    </div>
  );
}
