import KnouxBookWriter from "@/components/KnouxBookWriter";

// Force dynamic rendering to ensure CSS is properly loaded
export const dynamic = "force-dynamic";

export default function HomePage() {
  return <KnouxBookWriter />;
}
