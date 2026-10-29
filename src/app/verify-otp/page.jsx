import OtpVerification from "@/components/auth/GetOtpPage";
import { Suspense } from "react";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={null}>
      <OtpVerification />
    </Suspense>
  );
}
