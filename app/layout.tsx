import AuthUserProvider from "@/contexts/AuthUserProvider";
import "./globals.css";
import GetNotesProvider from "@/contexts/GetNotesProvider";
import GetNotebooksProvider from "@/contexts/GetNotebooksProvider";
import NavCompact from "@/components/layouts/NavCompact";
import NavComponent from "@/components/layouts/NavComponent";

interface Metadata {
  title: string;
  description: string;
  tags?: string[];
}

export const metadata: Metadata = {
  title: 'Noter',
  description: 'Tu app de notas gratuita favorita para tomar notas, organizarlas y ser más productivo. Sincroniza tus notas en la nube, usa etiquetas, crea listas y recordatorios, y comparte tus ideas con otros. Ideal para estudiantes, profesionales, universitarios, emprendedores y freelancers.',
  tags: [
    '#notas',
    '#notasgratis',
    '#appnotas',
    '#tomarnotas',
    '#organizarnotas',
    '#productividad',
    '#herramientasdeestudio',
    '#appsgratis',
    '#sincronizacionennube',
    '#etiquetas',
    '#listas',
    '#recordatorios',
    '#estudiantes',
    '#profesionales',
    '#universitarios',
    '#emprendedores',
    '#freelancers',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
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
