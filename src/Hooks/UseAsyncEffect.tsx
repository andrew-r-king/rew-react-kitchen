import { DependencyList, useEffect, useMemo, useState } from "react";
import { Dictionary, Optional } from "../Types";
import { hashString } from "../Utils";

type CacheEntry = {
	id: number;
	remove: () => void;
};

type ReturnType<T> = [data: T | null, loading: boolean, error: Optional<string>, cacheEntry: CacheEntry];

let cache: Dictionary<any> = {};

const logCache = () => {
	console.log(cache);
};

const clearEntriesById = (ids: number[]) => {
	for (const id of ids) {
		if (!!cache[id]) delete cache[id];
	}
};

const clearEntries = (entries: CacheEntry[]) => {
	for (const entry of entries) {
		entry.remove();
	}
};

const clearAllEntries = () => {
	cache = {};
};

function useAsyncEffect<T>(asyncFunc: (...args: any[]) => Promise<T>, deps: DependencyList): ReturnType<T> {
	const [result, setResult] = useState<Optional<T>>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Optional<string>>(null);
	const [lastHash, setLastHash] = useState<number>(-1);

	// eslint-disable-next-line
	const memoizedFunction = useMemo(() => asyncFunc, deps);

	const hash = useMemo<number>(() => {
		const toHash = memoizedFunction.toString() + deps.toString();
		const ret = hashString(toHash);
		setLastHash(ret);
		return ret;
		// eslint-disable-next-line
	}, [memoizedFunction, ...deps]);

	const removeCacheEntry: () => void = useMemo(() => {
		return () => {
			if (!!cache[lastHash]) delete cache[lastHash];
		};
	}, [lastHash]);

	useEffect(() => {
		let cancelRequest: boolean = false;
		if (hash !== lastHash) {
			removeCacheEntry();
		}

		if (!!cache[lastHash] && !!result) {
			setLoading(false);
			setError(null);
		} else {
			memoizedFunction()
				.then((res: T) => {
					if (cancelRequest) return;

					cache[hash] = res;
					setResult(res);
					setLoading(false);
					setError(null);
				})
				.catch((err: any) => {
					if (cancelRequest) return;

					setResult(null);
					setLoading(false);

					if (err.message) {
						setError(err.message);
					} else {
						setError(err.toString());
					}
				});
		}

		return () => {
			cancelRequest = true;
		};
	}, [hash, lastHash, memoizedFunction, removeCacheEntry]);

	return [result, loading, error, { id: hash, remove: removeCacheEntry }];
}

const asyncEffectCache = {
	log: logCache,
	clearEntries,
	clearEntriesById,
	clearAllEntries,
};

export { useAsyncEffect, asyncEffectCache };
