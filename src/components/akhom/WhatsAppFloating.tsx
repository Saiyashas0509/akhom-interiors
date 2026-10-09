import { useState } from "react";

export function WhatsAppFloating() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip on desktop */}
      <div
        className={`hidden sm:block rounded-full bg-dark/90 px-4 py-2 text-[12px] uppercase tracking-[0.16em] text-ivory backdrop-blur-md transition-all duration-300 shadow-xl border border-ivory/15 ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        Chat on WhatsApp
      </div>

      <a
        href="https://wa.me/919704352346?text=Hi%20AKHOM%2C%20I%27d%20like%20to%20discuss%20my%20space."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with AKHOM Interiors"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)] focus:outline-none"
      >
        {/* Soft pulse glow ring */}
        <span className="absolute -inset-1.5 animate-ping rounded-full bg-[#25D366]/30 duration-1000" />

        <svg
          className="relative h-7 w-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 0C5.396 0 .016 5.38.016 12.015c0 2.12.553 4.188 1.603 6.01L0 24l6.167-1.618a11.96 11.96 0 005.864 1.523h.005c6.634 0 12.014-5.38 12.014-12.015C24.05 5.38 18.665 0 12.03 0zm-.001 21.893h-.004a9.92 9.92 0 01-5.06-1.39l-.363-.216-3.762.986 1.004-3.666-.237-.378a9.907 9.907 0 01-1.517-5.214C3.09 7.076 7.098 3.068 12.03 3.068c2.4 0 4.656.935 6.353 2.632a8.932 8.932 0 012.63 6.352c0 4.933-4.009 8.941-8.983 8.941zm4.925-6.72c-.27-.135-1.597-.788-1.844-.878-.248-.09-.428-.135-.608.135-.18.27-.698.878-.855 1.058-.158.18-.315.203-.585.068-.27-.135-1.14-.42-2.172-1.34-.803-.716-1.345-1.6-1.503-1.87-.157-.27-.017-.416.118-.55.122-.121.27-.315.405-.472.135-.158.18-.27.27-.45.09-.18.045-.338-.023-.473-.067-.135-.607-1.463-.832-2.003-.22-.526-.442-.454-.608-.463-.157-.008-.337-.01-.517-.01-.18 0-.472.068-.72.338-.247.27-.944.923-.944 2.25 0 1.328.966 2.61 1.101 2.79.135.18 1.901 2.903 4.606 4.07.643.278 1.145.444 1.536.568.646.205 1.233.176 1.698.107.517-.078 1.597-.653 1.822-1.283.225-.63.225-1.17.158-1.283-.068-.112-.248-.18-.518-.315z" />
        </svg>
      </a>
    </div>
  );
}
