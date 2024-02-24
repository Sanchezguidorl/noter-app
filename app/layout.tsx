import AuthUserProvider from "@/contexts/AuthUserProvider";
import "./globals.css";
import NavCompact from "@/components/layouts/NavCompact";
import NavComponent from "@/components/layouts/NavComponent";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthUserProvider>
          <div className="flex flex-col sm:flex-row h-full">
            <NavCompact />
            <NavComponent />
            {children}
          </div>
        </AuthUserProvider>
      </body>
    </html>
  );
}
