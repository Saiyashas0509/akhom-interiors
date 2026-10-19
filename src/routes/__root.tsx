import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { WhatsAppFloating } from "@/components/akhom/WhatsAppFloating";
import { SmoothScroll } from "@/components/akhom/SmoothScroll";

import appCss from "../styles.css?url";
import { PHONE_TEL, WHATSAPP_URL } from "@/lib/contact";

// JSON-LD Structured Data Schema per Launch Checklist G13
const SCHEMA_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "InteriorDesigner",
      "@id": "https://akhominteriors.com/#organization",
      "name": "AKHOM INTERIORS",
      "url": "https://akhominteriors.com",
      "logo": "https://akhominteriors.com/logo-light.png",
      "image": "https://akhominteriors.com/media/hero-poster.jpg",
      "description": "Architectural interior design and turnkey fit-out studio based in Hyderabad, Telangana. Residential villas, commercial, healthcare and hospitality interiors.",
      "telephone": PHONE_TEL,
      "email": "info@akhominteriors.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "17.4123",
        "longitude": "78.4080"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "10:00",
          "closes": "19:00"
        }
      ],
      "sameAs": [
        WHATSAPP_URL
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://akhominteriors.com/#website",
      "url": "https://akhominteriors.com",
      "name": "AKHOM INTERIORS",
      "publisher": {
        "@id": "https://akhominteriors.com/#organization"
      }
    }
  ]
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dark px-6 py-20 text-center text-ivory">
      <div className="max-w-lg">
        <p className="eyebrow text-burgundy-light">404 Error</p>
        <h1 className="display mt-4 font-serif text-5xl font-light tracking-tight text-ivory sm:text-7xl">
          Page not found.
        </h1>
        <p className="mt-4 text-[14px] font-light leading-relaxed text-ivory/70">
          The architectural space you are looking for does not exist or may have been repositioned.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-burgundy bg-burgundy px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-burgundy-hover"
          >
            Return to Homepage
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center border border-ivory/25 px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-ivory/80 transition-colors hover:border-burgundy-light hover:text-ivory"
          >
            Contact Studio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dark px-6 py-20 text-center text-ivory">
      <div className="max-w-lg">
        <p className="eyebrow text-burgundy-light">Notice</p>
        <h1 className="mt-4 font-serif text-3xl font-light tracking-tight text-ivory sm:text-4xl">
          An unexpected interruption occurred.
        </h1>
        <p className="mt-3 text-[14px] font-light leading-relaxed text-ivory/70">
          Our team has been notified. You can refresh the view or return to the main gallery.
        </p>
        {error ? (
          <div className="mt-4 p-4 rounded-xl bg-red-950/80 border border-red-500/30 text-left text-xs font-mono text-red-200 overflow-auto max-h-48 max-w-full">
            <p className="font-bold text-red-300">{error.name}: {error.message}</p>
            {error.stack && <pre className="mt-2 text-[10px] opacity-75">{error.stack}</pre>}
          </div>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center border border-burgundy bg-burgundy px-7 py-3 text-[12px] font-medium uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-burgundy-hover"
          >
            Try Again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-ivory/25 px-7 py-3 text-[12px] uppercase tracking-[0.2em] text-ivory transition-colors hover:border-burgundy-light"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "AKHOM INTERIORS" },
      { name: "theme-color", content: "#F5EFE6" },
      { property: "og:site_name", content: "AKHOM INTERIORS" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@300;400;500;600&display=swap",
      },
      {
        // Digits-only Poppins subset: listed first in the font stacks so every number renders in Poppins.
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&text=0123456789%E2%82%B9&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "canonical", href: "https://akhominteriors.com" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(SCHEMA_DATA),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  // The static SPA build mounts into <div id="root"> (src/main.tsx). Rendering a second
  // <html>/<body> inside it nests documents and sends React's event dispatch into an
  // endless loop (typing in any form froze the page), so only SSR gets the full document.
  if (typeof document !== "undefined" && document.getElementById("root")) {
    return (
      <>
        <HeadContent />
        {children}
      </>
    );
  }

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <Outlet />
      {/* Persistent floating WhatsApp widget across all views per G9 */}
      <WhatsAppFloating />
    </QueryClientProvider>
  );
}
