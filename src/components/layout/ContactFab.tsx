"use client";

import { useState } from "react";
import { Phone, X } from "lucide-react";

export default function ContactFab() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Phone popup */}
      {open && (
        <a
          href="tel:02877748885"
          className="flex items-center gap-3 bg-white rounded-2xl shadow-2xl border border-gray-100 px-5 py-3.5
                     hover:shadow-xl transition-all animate-in slide-in-from-bottom-2"
        >
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Gọi ngay</p>
            <p className="text-base font-bold text-[#3e2723]">028 7774 8885</p>
          </div>
        </a>
      )}

      {/* FAB button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl
                   flex items-center justify-center transition-all duration-200 hover:scale-105"
        aria-label="Liên hệ"
      >
        {open ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
      </button>
    </div>
  );
}
