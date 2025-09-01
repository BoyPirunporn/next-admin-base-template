import NavigationEventHandler from "@/components/navigation-event-handler";
import SessionErrorHandler from "@/components/session-handler";
import { Toaster } from "@/components/ui/sonner";
import { EnabledLocale } from "@/i18n/routing";
import { authOptions } from "@/lib/auth/auth";
import BackdropProvider from "@/providers/BackdropProvider";
import DialogProvider from "@/providers/DialogProvider";
import DrawerProvider from "@/providers/DrawerProvider";
import LanguageProvider from "@/providers/LanguageProvider";
import PermissionProvider from "@/providers/PermissionProvider";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { getServerSession } from "next-auth";
import { getMessages } from "next-intl/server";
import AuthProvider from "../../providers/AuthProvider";
import QueryClientProvider from "../../providers/QueryProvider";
import ThemeProvider from "../../providers/ThemeProvider";
import "../globals.css";


export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;

}) {
  const { locale } = await params;
  const messages = await getMessages({ locale: locale as EnabledLocale });
  const session = await getServerSession(authOptions);
  return (
    <html lang={locale}>
      <link
        rel="icon"
        href="./icon.png"
        type="image/png"
        sizes="50x50"
      />
      <body>
        <ThemeProvider>
          <AuthProvider session={session}>
            <LanguageProvider locale={locale} messages={messages} >
              <PermissionProvider permissions={session?.permissions ?? []}>
                <QueryClientProvider>
                  <div className="relative">
                    <main className="min-h-screen">{children}</main>
                    <DialogProvider />
                    <DrawerProvider />
                    <Toaster />
                    <BackdropProvider />
                    <NavigationEventHandler />
                    <SessionErrorHandler sessionError={session?.error} />
                  </div>
                </QueryClientProvider>
              </PermissionProvider>
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>

  );
}
