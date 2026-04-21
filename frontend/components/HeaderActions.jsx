"use client";

import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import HowToCookModal from "./HowToCookModal";
import PricingModal from "./PricingModal";
import { Badge } from "./ui/badge";
import UserDropdown from "./UserDropdown";

export default function HeaderActions({
  subscriptionTier = "free",
}) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;


  const isPro = subscriptionTier === "pro";

  return (
    <div className="flex items-center space-x-4">
      <HowToCookModal />

      {/* ✅ SIGNED IN */}
      {isSignedIn && (
        <>
          <PricingModal subscriptionTier={subscriptionTier}>
            <Badge
              variant="outline"
              className={`flex h-8 px-3 gap-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${isPro
                  ? "bg-linear-to-r from-orange-600 to-amber-500 text-white border-none shadow-sm hover:shadow-md"
                  : "bg-stone-200/50 text-stone-700 border-stone-200 hover:bg-stone-300/50 hover:border-stone-300"
                }`}
            >
              <Sparkles
                className={`h-3 w-3 ${isPro
                    ? "text-white fill-white/20"
                    : "text-stone-500"
                  }`}
              />

              <span>{isPro ? "Pro Chef" : "Free Plan"}</span>
            </Badge>
          </PricingModal>

          <UserDropdown />
        </>
      )}

      {/* ✅ SIGNED OUT */}
      {!isSignedIn && (
        <>
          <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
            <Button variant="ghost">Sign In</Button>
          </SignInButton>

          <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard">
            <Button>Get Started</Button>
          </SignUpButton>
        </>
      )}
    </div>
  );
}