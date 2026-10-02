"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

type CollectionKey = "wishlist" | "library";

type CollectionContextValue = {
  wishlist: number[];
  library: number[];
  ready: boolean;
  signedIn: boolean;
  toggleWish: (id: number) => void;
  toggleLibrary: (id: number) => void;
  isWished: (id: number) => boolean;
  isInLibrary: (id: number) => boolean;
};

const CollectionContext = createContext<CollectionContextValue | null>(null);

export function loginHref(pathname: string | null) {
  return `/register?mode=login&callbackUrl=${encodeURIComponent(pathname || "/games")}`;
}

/// Wishlist and library live on the signed-in user's account. Signed-out
/// visitors see empty collections and are sent to log in when they try to
/// add something.
export function CollectionProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const pathname = usePathname();
  const [collection, setCollection] = useState<Record<CollectionKey, number[]>>({
    wishlist: [],
    library: [],
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Collections used to be kept in localStorage, unattached to any account.
    try {
      localStorage.removeItem("ov-wishlist");
      localStorage.removeItem("ov-library");
    } catch {}
  }, []);

  useEffect(() => {
    if (status === "loading") return;
    setCollection({ wishlist: [], library: [] });
    if (!userId) {
      setReady(true);
      return;
    }
    setReady(false);
    let cancelled = false;
    axios
      .get<Record<CollectionKey, number[]>>("/api/collection")
      .then((res) => {
        if (!cancelled) setCollection(res.data);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [status, userId]);

  const toggle = useCallback(
    (key: CollectionKey, id: number) => {
      if (!userId) {
        router.push(loginHref(pathname));
        return;
      }
      const saved = !collection[key].includes(id);
      const apply = (add: boolean) =>
        setCollection((prev) => ({
          ...prev,
          [key]: add
            ? [id, ...prev[key].filter((x) => x !== id)]
            : prev[key].filter((x) => x !== id),
        }));

      apply(saved);
      axios
        .post("/api/collection", { kind: key, gameId: id, saved })
        .catch(() => apply(!saved));
    },
    [userId, collection, router, pathname]
  );

  const toggleWish = useCallback((id: number) => toggle("wishlist", id), [toggle]);
  const toggleLibrary = useCallback((id: number) => toggle("library", id), [toggle]);

  const value = useMemo(
    () => ({
      wishlist: collection.wishlist,
      library: collection.library,
      ready,
      signedIn: !!userId,
      toggleWish,
      toggleLibrary,
      isWished: (id: number) => collection.wishlist.includes(id),
      isInLibrary: (id: number) => collection.library.includes(id),
    }),
    [collection, ready, userId, toggleWish, toggleLibrary]
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
