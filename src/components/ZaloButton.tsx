import React from "react";
import { MessageCircle } from "lucide-react";

export default function ZaloButton() {
  return (
    <a
      href="https://zalo.me/2322482873678684778"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex items-center"
      id="zalo-floating-button"
    >
      {/* Outer pulsing ring for emphasis */}
      <span className="absolute inset-0 rounded-full bg-[#0068ff]/40 animate-ping opacity-75"></span>
      
      {/* Hover tooltip label */}
      <span className="mr-3 bg-white text-neutral-800 text-xs font-bold py-1.5 px-3 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-gray-100 hidden sm:inline-block">
        Chat Zalo với STHC
      </span>

      {/* Main Circular Button with Gradient */}
      <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#0052cc] to-[#0068ff] shadow-xl flex flex-col items-center justify-center border-2 border-white text-white transform hover:scale-110 active:scale-95 transition-all duration-300">
        <MessageCircle className="w-5 h-5 animate-bounce mb-0.5" />
        <span className="text-[10px] font-extrabold tracking-wider leading-none">ZALO</span>
      </div>
    </a>
  );
}
