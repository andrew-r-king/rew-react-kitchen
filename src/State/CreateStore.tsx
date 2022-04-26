import React, { useReducer, useContext, useEffect, PropsWithChildren } from "react";

import { BaseState } from "./BaseState";
import { ClassType, Optional } from "../Types";
import { ActionEvent, ActionType } from "./ActionType";

export type StoreProvider = (props: PropsWithChildren<object>) => JSX.Element;

type InternalContext<T extends BaseState> = {
	inst: T;
	Context: React.Context<T>;
};

export function createStore<T extends BaseState>(
	classConstructor: ClassType<T>,
	...args: any[]
): [StoreProvider, () => T, () => T] {
	let container: Optional<InternalContext<T>> = null;

	const postContainer = (): InternalContext<T> => {
		if (!container) {
			const inst = new classConstructor(...args);
			container = {
				inst,
				Context: React.createContext(inst),
			};
		}
		return container;
	};

	const initialize = (_state: T) => {
		if (!container) {
			return postContainer().inst;
		} else {
			container.inst = new classConstructor(...args);
		}
		return container.inst;
	};

	const reducer = (state: T, action: ActionEvent<T>) => {
		switch (action.type) {
			case ActionType.Bound:
				return { ...action.payload } as T; // payload is inst, as "this"

			case ActionType.Reset:
				return initialize(state);
		}
	};

	const Provider = (props: PropsWithChildren<object>) => {
		const container = React.useMemo(() => postContainer(), []);
		const [state, dispatcher] = useReducer(reducer, container.inst);

		useEffect(() => {
			// setDispatcher is private, so inst is cast to any to get around it
			(container.inst as any).setDispatcher(dispatcher);

			return () => {
				(container.inst as any).setDispatcher(null);
				(container as any) = null;
			};
			// eslint-disable-next-line
		}, []);

		return <container.Context.Provider value={state}>{props.children}</container.Context.Provider>;
	};

	// Public Context
	const Context = () => useContext(postContainer().Context);

	// Public getter
	const getInstance = (): T => {
		if (!container) {
			throw new Error(`Store getter for ${classConstructor.name} called outside of its context.`);
		}
		return container.inst;
	};

	return [Provider, Context, getInstance];
}
