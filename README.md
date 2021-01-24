## @andrew-r-king/react-kitchen

A place for all of this complex typescript & react-related boilerplate

---

## Components

---

**Base/BaseApi** - abstract class for easily interacting with apis (wraps around axios)

```ts
import { BaseApi } from "@andrew-r-king/react-kitchen";

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
import { useAsyncEffect } from "@andrew-r-king/react-kitchen";
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
import { asyncEffectCache } from "@andrew-r-king/react-kitchen";

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

**State/BaseState** - An abstract base class for creating easy to read MobX-style states that utilize React Hooks/Context under the hood (i.e. no cruft between you and your data, especially during debugging)

**State/Action** - A decorator for declaring state actions. Also works with promises

```ts
import { BaseState, Action } from "@andrew-r-king/react-kitchen";

class CounterState extends BaseState {
    count: number = 0;

    constructor(public min: number = 0, public max: number = 10, public defaultValue: number = 5) {
        super();

        this.count = this.defaultValue;
    }

    @Action
    increase = (amount: number) => {
        if (this.count + amount <= this.max) this.count += amount;
    };

    @Action
    decrease = (amount: number) => {
        if (this.count - amount >= this.min) this.count -= amount;
    };
}

export { CounterState };
```

Note about decorators: they are still experimental and your mileage with BaseState will vary depending on how your React project is setup. Typically, you'll want to use something like:

```json
{
    "module": "esnext",
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
    ...
}
```

I was not able to get this working with the Parcel 2 beta (due to their bizarre typescript/Babel setup), but it should work with any create-react-app or NextJS project.

---

**State/createStore** - A function that creates a store out of a state class

**State/makeRootStoreProvider** - A function that takes in a number of store providers and returns a nested provider (less ugly than nesting them manually)

```tsx
import { createStore, makeRootStoreProvider } from "@andrew-r-king/react-kitchen";

import { CounterState } from "./CounterState";
import { JokeState } from "./JokeState";

// Return type is [Provider, hook, store instance]
// With the store instance, you can directly call a state action from another state
const [CounterProvider, useCounterStore, counterStore] = createStore(CounterState);
const [JokeStoreProvider, useJokeStore, jokeStore] = createStore(JokeState);

// Providers would be wrapped around anything that needs these states, or if globally, your root component
const Providers = makeRootStoreProvider([CounterProvider, JokeStoreProvider]);

export { Providers, useCounterStore, counterStore, useJokeStore, jokeStore };
```

Finally, you'd use it similarly to other hooks:

```tsx
import { useCounterStore, counterStore } from "Stores";

// inside some component
const { increase } = useCounterStore();

// or, direct access somewhere
counterStore.increase();
```

---

**Router/makeRoutes** - Wrapper around react-router-dom v6 (useRoutes) that takes in some routes and returns a component. It can also accept a Home & 404 layout which will conveniently crate those automatically

**Router/Navigate** - same as react-router-dom/Navigate (v6 component for manual redirects)

**Router/useNavigate** - same as react-router-dom/useNavigate

**Router/useLocation** - same as react-router-dom/useLocation

**Router/useParams** - same as react-router-dom/useParams

**Router/useMatch** - same as react-router-dom/useMatch

**Router/NavLink** - same as react-router-dom/Link

Note: See [v6 migration guide for details](https://github.com/ReactTraining/react-router/blob/f59ee5488bc343cf3c957b7e0cc395ef5eb572d2/docs/advanced-guides/migrating-5-to-6.md)

```tsx
import { makeRoutes, RouteProps } from "@andrew-r-king/react-kitchen";

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

---

Form - Form-related components to make them as easy as possible to create (wraps around formik & yup)
