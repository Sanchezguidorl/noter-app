import IdentificationContainer from "@/components/layouts/IdentificationContainer";
import React from "react";

function RegisterUserLayout({ children }: { children: React.ReactNode }) {
  return <IdentificationContainer>{children}</IdentificationContainer>;
}

export default RegisterUserLayout;
