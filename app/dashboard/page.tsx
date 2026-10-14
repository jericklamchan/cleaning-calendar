import { Suspense } from "react";
import DashboardContent from "@/components/DashboardContent";

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}