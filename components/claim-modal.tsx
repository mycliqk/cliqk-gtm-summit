"use client";

import React from "react"

import { useState } from "react";
import type { Marketer } from "@/lib/marketers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface ClaimModalProps {
  marketer: Marketer | null;
  onClose: () => void;
  onConfirm: (email: string) => void;
}

export function ClaimModal({ marketer, onClose, onConfirm }: ClaimModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!marketer) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onConfirm(email);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-purple-900 to-purple-950 rounded-2xl p-6 w-full max-w-md border border-white/10 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {marketer.name.charAt(0)}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Claim Your Ticket
          </h2>
          <p className="text-white/60">
            Meet <span className="text-purple-300">{marketer.name}</span> at the event
          </p>
          <p className="text-white/40 text-sm">
            {marketer.role} at {marketer.company}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-purple-400"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-6"
          >
            {isSubmitting ? "Claiming..." : "Claim Ticket"}
          </Button>
        </form>

        <p className="text-center text-white/40 text-xs mt-4">
          By claiming, you agree to receive event updates
        </p>
      </div>
    </div>
  );
}
