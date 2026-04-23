/**
 * Generic JSON-LD injector — render bất kỳ schema nào dưới dạng <script type="application/ld+json">
 * Dùng trong server components (không cần "use client").
 */
interface JsonLdProps {
  data: Record<string, unknown>;
  id?: string;
}

export default function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // dangerouslySetInnerHTML an toàn vì data đến từ code nội bộ, không phải user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 0) }}
    />
  );
}
