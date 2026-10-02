"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useCollection } from "@/context/CollectionContext";
import { GameCardProps } from "@/utils/types";
import { coverUrl, formatRating, formatYear } from "@/utils/overdrive";
import { OvIcon } from "./OvIcon";
import { AccountChip } from "./AccountChip";
import { SearchResultsSkeleton } from "./Skeletons";
import Image from "next/image";

const NAV = [
  { label: "Games", href: "/games" },
  { label: "Events", href: "/events" },
  { label: "Platforms", href: "/platforms" },
  { label: "Genres", href: "/genres" },
  { label: "Developers", href: "/developers" },
  { label: "Chat", href: "/ai" },
];

function isNavActive(pathname: string, href: string) {
  if (href === "/games") {
    return (
      pathname === "/games" ||
      pathname.startsWith("/games/") ||
      pathname === "/search"
    );
  }
  if (href === "/events") {
    return pathname === "/events" || pathname.startsWith("/events/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

type SearchBoxProps = {
  query: string;
  setQuery: (v: string) => void;
  dropdownOpen: boolean;
  setDropdownOpen: (v: boolean) => void;
  results: GameCardProps[];
  searching: boolean;
  goSearch: () => void;
  innerRef: React.RefObject<HTMLDivElement | null>;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  className?: string;
};

function SearchBox({
  query,
  setQuery,
  dropdownOpen,
  setDropdownOpen,
  results,
  searching,
  goSearch,
  innerRef,
  inputRef,
  className = "",
}: SearchBoxProps) {
  return (
    <div ref={innerRef} className={`relative ${className}`}>
      <div
        className={`ov-clip-md flex items-center gap-2.5 border bg-ov-panel px-3.5 py-2 transition-colors duration-200 ${
          query ? "border-ov-teal" : "border-ov-border"
        }`}
      >
        <OvIcon name="search" className="shrink-0 text-[14px] text-[#2dd4bf]" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setDropdownOpen(true);
          }}
          onFocus={() => query.trim() && setDropdownOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && goSearch()}
          placeholder="SEARCH THE GRID"
          className="min-w-0 flex-1 border-none bg-transparent text-[13px] tracking-wide text-[#e6edf6] outline-none placeholder:text-[#5b6b82]"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="flex shrink-0 items-center border-0 bg-transparent p-0 leading-none text-[#5b6b82] transition-colors duration-150 hover:text-ov-teal active:scale-90"
          >
            <OvIcon name="close" className="text-[14px]" />
          </button>
        )}
      </div>

      {dropdownOpen && query.trim() && (
        <div className="animate-ov-pop absolute left-0 right-0 top-[calc(100%+8px)] z-[60] max-h-[360px] origin-top overflow-y-auto border border-ov-teal bg-ov-panel shadow-[0_12px_30px_rgba(0,0,0,0.5)]">
          {searching && <SearchResultsSkeleton />}
          {!searching && results.length === 0 && (
            <div className="px-3.5 py-4 text-center text-[12px] text-ov-muted">
              No games match “{query.trim()}”.
            </div>
          )}
          {!searching &&
            results.slice(0, 6).map((game) => {
              const cover = coverUrl(game.cover);
              return (
                <Link
                  key={game.id}
                  href={`/games/${game.slug}`}
                  onClick={() => {
                    setQuery("");
                    setDropdownOpen(false);
                  }}
                  className="flex items-center gap-3 border-b border-ov-border px-3 py-2.5 transition-colors duration-150 hover:bg-[#0f1a2e]"
                >
                  {cover && (
                    <Image
                      src={cover}
                      alt=""
                      width={30}
                      height={40}
                      className="h-10 w-[30px] shrink-0 border border-ov-border object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <div className="truncate text-[13px] text-white">{game.name}</div>
                    <div className="text-[10px] uppercase tracking-wide text-ov-muted">
                      {game.genres?.[0]?.name || "Game"} · {formatYear(game.first_release_date)}
                    </div>
                  </div>
                  <span className="ml-auto font-orbitron text-xs font-bold text-ov-teal">
                    {formatRating(game.aggregated_rating)}
                  </span>
                </Link>
              );
            })}
          {!searching && results.length > 0 && (
            <button
              type="button"
              onClick={goSearch}
              className="w-full px-3 py-2.5 text-center text-[11px] tracking-[2px] text-ov-teal transition-colors duration-150 hover:bg-[#0f1a2e]"
            >
              SEE ALL RESULTS ▸
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { wishlist, library } = useCollection();
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [results, setResults] = useState<GameCardProps[]>([]);
  const [searching, setSearching] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSearching(false);
      return;
    }
    // Flip to searching as soon as the query changes so the dropdown shows
    // progress through the debounce window too, not just the request itself.
    setSearching(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await axios.get(
          `/api/search?q=${encodeURIComponent(query)}`
        );
        setResults(res.data.filter((g: GameCardProps) => g.cover));
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const inDesktop = desktopSearchRef.current?.contains(target);
      const inMobile = mobileSearchRef.current?.contains(target);
      if (!inDesktop && !inMobile) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close the mobile search row automatically once the viewport grows into
  // the desktop layout, so it can't be left open behind the inline search.
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1080px)");
    const handler = () => setMobileSearchOpen(false);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (mobileSearchOpen) mobileInputRef.current?.focus();
  }, [mobileSearchOpen]);

  const goSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setDropdownOpen(false);
      setMobileSearchOpen(false);
    }
  };

  const searchBoxCommonProps = {
    query,
    setQuery,
    dropdownOpen,
    setDropdownOpen,
    results,
    searching,
    goSearch,
  };

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-[10px]"
      style={{
        borderBottom: "1px solid #16324a",
        background: "rgba(5,8,16,.92)",
      }}
    >
      <div className="mx-auto flex max-w-[1320px] items-center gap-3 px-4 py-3 sm:gap-4 lg:px-6 lg:py-4">
        <Link
          href="/games"
          className="shrink-0 font-orbitron text-[15px] font-black transition-opacity duration-150 hover:opacity-80 sm:text-[17px]"
          style={{ color: "#2dd4bf", letterSpacing: "1px" }}
        >
          GAME//HUB
        </Link>

        {/* Desktop (xl+): nav, search and the wishlist/library links share one row. */}
        <div className="hidden min-w-0 flex-1 items-center gap-4 xl:flex 2xl:gap-6">
          <nav
            className="flex shrink-0 gap-3.5 text-[13px] uppercase 2xl:gap-5"
            style={{ letterSpacing: "1px" }}
          >
            {NAV.map((item) => {
              const active = isNavActive(pathname, item.href);
              const accent = active ? "#2dd4bf" : "#c3cede";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="cursor-pointer whitespace-nowrap pb-1 transition-colors duration-150 hover:opacity-80"
                  style={{
                    color: accent,
                    borderBottom: `2px solid ${active ? accent : "transparent"}`,
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <SearchBox
            {...searchBoxCommonProps}
            innerRef={desktopSearchRef}
            className="min-w-[140px] max-w-[360px] flex-1 2xl:max-w-[440px]"
          />

          <Link
            href="/wishlist"
            title="Wishlist"
            className="flex shrink-0 items-center gap-1.5 transition-transform duration-150 hover:scale-105 active:scale-95"
            style={{ color: "#f43f5e", cursor: "pointer" }}
          >
            <OvIcon name="heart" className="text-[14px]" />
            <span className="hidden text-[11px] tracking-[1px] text-ov-text 2xl:inline">
              WISHLIST
            </span>
            <span className="font-orbitron text-[11px] font-bold" style={{ color: "#c3cede" }}>
              {wishlist.length}
            </span>
          </Link>

          <Link
            href="/library"
            title="Library"
            className="flex shrink-0 items-center gap-1.5 transition-transform duration-150 hover:scale-105 active:scale-95"
            style={{ color: "#2dd4bf", cursor: "pointer" }}
          >
            <OvIcon name="library" className="text-[15px]" />
            <span className="hidden text-[11px] tracking-[1px] text-ov-text 2xl:inline">
              LIBRARY
            </span>
            <span className="font-orbitron text-[11px] font-bold" style={{ color: "#c3cede" }}>
              {library.length}
            </span>
          </Link>
        </div>

        {/* Below xl: a compact icon cluster replaces the inline nav/search/links. */}
        <div className="ml-auto flex items-center gap-4 sm:gap-5 xl:hidden">
          <button
            type="button"
            onClick={() => setMobileSearchOpen((v) => !v)}
            aria-label={mobileSearchOpen ? "Close search" : "Open search"}
            aria-expanded={mobileSearchOpen}
            className="transition-transform duration-150 active:scale-90"
            style={{ color: mobileSearchOpen ? "#2dd4bf" : "#c3cede" }}
          >
            <OvIcon name={mobileSearchOpen ? "close" : "search"} className="text-[18px]" />
          </button>

          <Link
            href="/wishlist"
            title="Wishlist"
            className="flex items-center gap-1 transition-transform duration-150 active:scale-90"
            style={{ color: "#f43f5e" }}
          >
            <OvIcon name="heart" className="text-[16px]" />
            <span className="font-orbitron text-[11px] font-bold" style={{ color: "#c3cede" }}>
              {wishlist.length}
            </span>
          </Link>

          <Link
            href="/library"
            title="Library"
            className="flex items-center gap-1 transition-transform duration-150 active:scale-90"
            style={{ color: "#2dd4bf" }}
          >
            <OvIcon name="library" className="text-[17px]" />
            <span className="font-orbitron text-[11px] font-bold" style={{ color: "#c3cede" }}>
              {library.length}
            </span>
          </Link>
        </div>

        {/* Account slot: pinned to the far right at every breakpoint. */}
        <div className="shrink-0 xl:ml-auto">
          <AccountChip />
        </div>
      </div>

      {/* Below xl: search expands into its own row, toggled by the icon above. */}
      {mobileSearchOpen && (
        <div className="animate-ov-fade-up xl:hidden" style={{ borderTop: "1px solid #16324a" }}>
          <div className="mx-auto max-w-[1320px] px-4 py-3 md:px-6 lg:px-6">
            <SearchBox
              {...searchBoxCommonProps}
              innerRef={mobileSearchRef}
              inputRef={mobileInputRef}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Below xl: the primary nav is a persistent, horizontally scrollable strip
          instead of a hidden hamburger menu, so every section stays one tap away. */}
      <div className="xl:hidden" style={{ borderTop: "1px solid #16324a" }}>
        <nav
          className="mx-auto flex max-w-[1320px] gap-5 overflow-x-auto px-4 py-2.5 text-[12px] uppercase [-ms-overflow-style:none] [scrollbar-width:none] md:gap-7 md:px-6 md:py-3 md:text-[13px] lg:px-6 [&::-webkit-scrollbar]:hidden"
          style={{ letterSpacing: "1px" }}
        >
          {NAV.map((item) => {
            const active = isNavActive(pathname, item.href);
            const accent = active ? "#2dd4bf" : "#c3cede";
            return (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 whitespace-nowrap pb-1 transition-colors duration-150 hover:opacity-80"
                style={{
                  color: accent,
                  borderBottom: `2px solid ${active ? accent : "transparent"}`,
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
