"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PricingSection from "./PricingSection";

export default function PricingModal({ subscriptionTier = "free", children }) {
  const [isOpen, setIsOpen] = useState(false);

  // Only allow opening if user is on free plan
  const canOpen = subscriptionTier === "free";

  return (
    <Dialog open={isOpen} onOpenChange={canOpen ? setIsOpen : undefined}>
      <DialogTrigger asChild disabled={!canOpen}>
        {children}
      </DialogTrigger>

      <DialogContent className="p-8 pt-4 sm:max-w-4xl">
        <DialogTitle />
        <div className="px-4 sm:px-6 md:px-8 py-6 max-h-[88vh] overflow-y-auto">
          <PricingSection
            subscriptionTier={subscriptionTier}
            isModal={true}
            onClose={() => setIsOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
