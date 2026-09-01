"use client";

import { motion } from "motion/react";

export function SubscriptionConfirmation() {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/40 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal Card */}
      <motion.div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="bg-[#efe6d3] border border-[#e2d4b7] border-solid flex flex-col items-start p-[40px] rounded-[8px] w-[550px] max-w-[90vw]">
          <div className="flex flex-col gap-[32px] items-center leading-[1.5] text-center w-full">
            {/* Text Group */}
            <div className="flex flex-col gap-[10px] items-center text-[#152a31] w-full">
              <p className="font-['IBM_Plex_Sans:Medium'] font-medium text-[25px] tracking-[0.5px]">
                Thanks for subscribing!
              </p>
              <p className="font-['IBM_Plex_Sans:Regular'] font-normal text-[16px] tracking-[0.32px]">
                Your first issue lands in your inbox this week. Keep an eye out.
              </p>
            </div>

            {/* Browse Link */}
            <a
              href="/articles"
              className="font-['IBM_Plex_Sans:Medium_Italic'] font-medium italic text-[#be5b3f] text-[16px] tracking-[0.32px] hover:opacity-80 transition-opacity"
            >
              Browse recent articles
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}
