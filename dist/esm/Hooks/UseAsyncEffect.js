var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { useEffect, useMemo, useState } from "react";
import { hashString } from "../Utils";
var cache = {};
var logCache = function () {
    console.log(cache);
};
var clearEntriesById = function (ids) {
    for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
        var id = ids_1[_i];
        if (!!cache[id])
            delete cache[id];
    }
};
var clearEntries = function (entries) {
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var entry = entries_1[_i];
        entry.remove();
    }
};
var clearAllEntries = function () {
    cache = {};
};
function useAsyncEffect(asyncFunc, deps) {
    var _a = useState(true), loading = _a[0], setLoading = _a[1];
    var _b = useState(null), error = _b[0], setError = _b[1];
    var _c = useState(-1), lastHash = _c[0], setLastHash = _c[1];
    // eslint-disable-next-line
    var memoizedFunction = useMemo(function () { return asyncFunc; }, []);
    var hash = useMemo(function () {
        var toHash = memoizedFunction.toString() + deps.toString();
        var ret = hashString(toHash);
        setLastHash(ret);
        return ret;
        // eslint-disable-next-line
    }, __spreadArrays([memoizedFunction], deps));
    var removeCacheEntry = useMemo(function () {
        return function () {
            if (!!cache[lastHash])
                delete cache[lastHash];
        };
    }, [lastHash]);
    useEffect(function () {
        var cancelRequest = false;
        if (hash !== lastHash) {
            removeCacheEntry();
        }
        if (!!cache[hash]) {
            setLoading(false);
            setError(null);
        }
        else {
            memoizedFunction()
                .then(function (result) {
                if (cancelRequest)
                    return;
                cache[hash] = result;
                setLoading(false);
                setError(null);
            })
                .catch(function (err) {
                if (cancelRequest)
                    return;
                setLoading(false);
                if (err.message) {
                    setError(err.message);
                }
                else {
                    setError(err.toString());
                }
            });
        }
        return function () {
            cancelRequest = true;
        };
    }, [asyncFunc, hash, lastHash, memoizedFunction, removeCacheEntry]);
    return [cache[hash], loading, error, { id: hash, remove: removeCacheEntry }];
}
var asyncEffectCache = {
    log: logCache,
    clearEntries: clearEntries,
    clearEntriesById: clearEntriesById,
    clearAllEntries: clearAllEntries,
};
export { useAsyncEffect, asyncEffectCache };
//# sourceMappingURL=UseAsyncEffect.js.map