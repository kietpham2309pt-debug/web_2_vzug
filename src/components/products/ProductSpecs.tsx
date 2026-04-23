"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Spec } from "@/types";
import { cn } from "@/lib/utils";

interface ProductSpecsProps {
  specs: Spec[];
  description: string;
}

type Tab = "specs" | "description";

export default function ProductSpecs({ specs, description }: ProductSpecsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("specs");
  const [showAll, setShowAll] = useState(false);

  const tabs: { id: Tab; label: string }[] = [
    { id: "specs", label: "Thông Số Kỹ Thuật" },
    { id: "description", label: "Mô Tả Sản Phẩm" },
  ];

  const displayedSpecs = showAll ? specs : specs.slice(0, 6);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 px-4 py-4 text-sm font-semibold transition-all border-b-2 -mb-px",
              activeTab === tab.id
                ? "text-[#3e2723] border-[#3e2723]"
                : "text-gray-500 border-transparent hover:text-gray-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Specs Tab */}
        {activeTab === "specs" && (
          specs.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-10">Chưa có thông số kỹ thuật.</p>
          ) : (
            <div>
              <table className="w-full text-sm">
                <tbody>
                  {displayedSpecs.map((spec, i) => (
                    <tr
                      key={i}
                      className={cn(
                        "border-b border-gray-50 last:border-0",
                        i % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                      )}
                    >
                      <td className="py-3 px-3 text-gray-500 font-medium w-2/5">{spec.label}</td>
                      <td className="py-3 px-3 text-gray-900 font-semibold">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {specs.length > 6 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="mt-4 flex items-center gap-1.5 text-sm text-[#3e2723] font-semibold hover:text-[#8d6e63] transition-colors w-full justify-center py-2"
                >
                  {showAll ? "Thu gọn" : `Xem thêm ${specs.length - 6} thông số`}
                  <ChevronDown className={cn("w-4 h-4 transition-transform", showAll && "rotate-180")} />
                </button>
              )}
            </div>
          )
        )}

        {/* Description Tab — render raw HTML from product data */}
        {activeTab === "description" && (
          description ? (
            <div
              className="product-description text-gray-700 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <p className="text-center text-gray-400 text-sm py-10">Chưa có mô tả sản phẩm.</p>
          )
        )}
      </div>
    </div>
  );
}
