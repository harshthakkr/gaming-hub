"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CollectionContextValue = {
  wishlist: number[];
  library: number[];
  ready: boolean;
  toggleWish: (id: number) => void;
  toggleLibrary: (id: number) => void;
  isWished: (id: number) => boolean;
  isInLibrary: (id: number) => boolean;
};

const CollectionContext = createContext<CollectionContextValue | null>(null);

function readStorage(key: string) {
  if (typeof window === "undefined") return [] as number[];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

export function CollectionProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [library, setLibrary] = useState<number[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setWishlist(readStorage("ov-wishlist"));
    setLibrary(readStorage("ov-library"));
    setReady(true);
  }, []);

  const persist = (key: string, value: number[]) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const toggleWish = useCallback((id: number) => {
    setWishlist((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      persist("ov-wishlist", next);
      return next;
    });
  }, []);

  const toggleLibrary = useCallback((id: number) => {
    setLibrary((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      persist("ov-library", next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      wishlist,
      library,
      ready,
      toggleWish,
      toggleLibrary,
      isWished: (id: number) => wishlist.includes(id),
      isInLibrary: (id: number) => library.includes(id),
    }),
    [wishlist, library, ready, toggleWish, toggleLibrary]
  );

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollection() {
  const ctx = useContext(CollectionContext);
  if (!ctx) throw new Error("useCollection must be used within CollectionProvider");
  return ctx;
}
