import "../styles/globals.css";

import React, { type ReactNode } from "react";
import type { Metadata } from "next";
import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";

export const metadata: Metadata = {};

type RootLayoutProps = Readonly<{ children: ReactNode }>;

export default async function RootLayout({ children }: RootLayoutProps): Promise<ReactNode> {
  const locale: string = await getLocale();
  const messages: AbstractIntlMessages = await getMessages();

  return (
    <html lang={locale} dir="ltr">
      <body className="antialiased" suppressHydrationWarning={true}>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
