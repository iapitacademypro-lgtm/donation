import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import LayoutClientWrapper from "@/app/LayoutClientWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FGRF Africa - Give Hope Give Sadaqah",
  description:
    "Transform lives through your Sadaqah. Every donation brings nourishment to the hungry, clean water to the thirsty, and hope to the forgotten. Give for the sake of Allah — and let your charity echo in both this life and the next.",
  keywords:
    "FGRF Africa, community development, education, health, Africa NGO, Sadaqah, Zakat, Islamic Charity",
  icons: {
    icon: "/FGRFLOGO.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>FGRF Africa - Empowering Communities</title>
        <meta
          name="description"
          content="FGRF Africa works for education, health, and community development across Africa."
        />
        <meta
          name="keywords"
          content="FGRF Africa, community development, education, health, Africa NGO"
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NPPXXTS8');`,
          }}
        />
      </head>
      <body
        className={`${inter.className} dark:bg-white dark:text-cyan-950 bg-white text-cyan-950`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NPPXXTS8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <LayoutClientWrapper>{children}</LayoutClientWrapper>
      </body>
    </html>
  );
}
