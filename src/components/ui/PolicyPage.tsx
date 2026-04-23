import Breadcrumb from "@/components/ui/Breadcrumb";

interface PolicyPageProps {
  title: string;
  children: React.ReactNode;
}

export default function PolicyPage({ title, children }: PolicyPageProps) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Breadcrumb items={[{ label: title }]} />
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#3e2723] mb-8">{title}</h1>
        <div className="policy-content bg-white rounded-2xl border border-gray-100 p-6 md:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
