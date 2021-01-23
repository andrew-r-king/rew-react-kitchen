import { DependencyList } from "react";
import { Optional } from "../Types";
declare type CacheEntry = {
    id: number;
    remove: () => void;
};
declare type ReturnType<T> = [data: T | null, loading: boolean, error: Optional<string>, cacheEntry: CacheEntry];
declare function useAsyncEffect<T>(asyncFunc: (...args: any[]) => Promise<T>, deps: DependencyList): ReturnType<T>;
declare const asyncEffectCache: {
    log: () => void;
    clearEntries: (entries: CacheEntry[]) => void;
    clearEntriesById: (ids: number[]) => void;
    clearAllEntries: () => void;
};
export { useAsyncEffect, asyncEffectCache };
