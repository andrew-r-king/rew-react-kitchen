## @rewrking/react-kitchen

A place for all of this complex typescript & react-related boilerplate

---

## Components

---

**Base/BaseApi** - abstract class for easily interacting with apis (wraps around axios)

```ts
import { BaseApi } from "@rewrking/react-kitchen";

export type DadJoke = {
    setup: string;
    punchline: string;
};

class DadJokesApi extends BaseApi {
    constructor() {
        super("https://api.dadjokes.space");
    }

    // this.GET returns Promise<DadJoke>
    getRandomJoke = () => this.GET<DadJoke>("/joke");
}

const dadJokes = new DadJokesApi();

export { dadJokes };
```

---

**Hooks/useAsyncEffect** - a useEffect-style hook that takes in an async function and caches the result by default

```tsx
import { useAsyncEffect } from "@rewrking/react-kitchen";
import { dadJokes } from "Api/DadJokes";

const JokesLayout = () => {
    const [joke, loading, error, cache] = useAsyncEffect(dadJokes.getRandomJoke, [maxJokes]);

    // Removes the cached content when the component unmounts
    // useEffect(() => cache.remove, []);

    return (
        <div>
            {loading ? (
                <>Loading...</>
            ) : error ? (
                <>Error: {error}</>
            ) : joke ? (
                <>
                    <div className="setup">{joke.setup}</div>
                    <div className="punchline">{joke.punchline}</div>
                </>
            ) : null}
        </div>
    );
};
```

---

**Hooks/asyncEffectCache** - an object export for interacting with the async effect cache

```tsx
import { asyncEffectCache } from "@rewrking/react-kitchen";

...

// Save the cache id for later and remove them manually when the component unmounts
const [cachedIds, setCachedIds] = useState<number[]>([]);
useEffect(() => {
    setCachedIds((prev) => {
        prev.push(cache.id);
        return prev;
    });
    return () => {
        asyncEffectCache.clearEntriesById(cachedIds);
    };
}, [cache.id]);

...
```

---

**Router/makeRoutes** - Wrapper around react-router-dom v6 (useRoutes) that takes in some routes and returns a component. It can also accept a Home & 404 layout which will conveniently crate those automatically

**Router/Navigate** - same as react-router-dom/Navigate (v6 component for manual redirects)

**Router/useNavigate** - same as react-router-dom/useNavigate

**Router/useLocation** - same as react-router-dom/useLocation

**Router/useParams** - same as react-router-dom/useParams

**Router/useMatch** - same as react-router-dom/useMatch

**Router/Link** - wrapper around react-router-dom/Link that adds an extra 'label' prop as an alternative to children

**Router/NavLink** - wrapper around react-router-dom/NavLink that adds an extra 'label' prop as an alternative to children, adds typing to the 'activeStyle' prop, adds a fallback to activeClassName of 'is-active', and brings back 'exact' instead of v6's 'end'

Note: See [v6 migration guide for details](https://github.com/ReactTraining/react-router/blob/f59ee5488bc343cf3c957b7e0cc395ef5eb572d2/docs/advanced-guides/migrating-5-to-6.md)

```tsx
import { makeRoutes, RouteProps } from "@rewrking/react-kitchen";

import { JokesLayout, HomeLayout, NotFoundLayout, CountersLayout } from "Layouts";

const routes: RouteProps[] = [
    {
        path: "/jokes",
        component: JokesLayout,
    },
    {
        path: "/counters",
        component: CountersLayout,
    },
];

const Routes = makeRoutes(routes, HomeLayout, NotFoundLayout);

export { Routes };
```

