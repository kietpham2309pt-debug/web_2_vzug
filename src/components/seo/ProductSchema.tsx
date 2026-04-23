import JsonLd from "./JsonLd";
import { Product } from "@/types";
import { BASE_URL } from "@/lib/seo";

interface ProductSchemaProps {
  product: Product;
}

export default function ProductSchema({ product }: ProductSchemaProps) {
  const productUrl = `${BASE_URL}/san-pham/${product.slug}`;

  // Guard: đảm bảo các trường có thể undefined không crash
  const images = Array.isArray(product.images) ? product.images : [];
  const specs = Array.isArray(product.specs) ? product.specs : [];
  const brandName = product.brand
    ? product.brand.charAt(0).toUpperCase() + product.brand.slice(1)
    : "V-ZUG Vietnam";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name || "",
    description: product.description || product.shortDescription || "",
    sku: product.id,
    mpn: product.slug,
    image: images,
    brand: {
      "@type": "Brand",
      name: brandName,
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "VND",
      price: product.price ?? 0,
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      )
        .toISOString()
        .split("T")[0],
      availability:
        product.inStock !== false
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "V-ZUG Vietnam",
      },
    },
    // Chỉ thêm aggregateRating khi có reviewCount > 0 (tránh Google warning)
    ...(product.reviewCount > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating ?? 4.5,
        bestRating: 5,
        worstRating: 1,
        reviewCount: product.reviewCount,
      },
    }),
    // Chỉ thêm specs nếu có dữ liệu
    ...(specs.length > 0 && {
      additionalProperty: specs.map((spec) => ({
        "@type": "PropertyValue",
        name: spec.label,
        value: spec.value,
      })),
    }),
  };

  return <JsonLd data={schema} id="product-schema" />;
}
