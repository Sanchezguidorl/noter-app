import AuthUserProvider from "@/contexts/AuthUserProvider";
import "./globals.css";
import NavCompact from "@/components/layouts/NavCompact";
import NavComponent from "@/components/layouts/NavComponent";
import GetNotesProvider from "@/contexts/GetNotesProvider";
import GetNotebooksProvider from "@/contexts/GetNotebooksProvider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthUserProvider>
          <GetNotebooksProvider>
            <GetNotesProvider>
              <div className="flex flex-col sm:flex-row h-full">
                <NavCompact />
                <NavComponent />
                {children}
              </div>
            </GetNotesProvider>
          </GetNotebooksProvider>
        </AuthUserProvider>
      </body>
    </html>
  );
}
