import React, { useReducer, useContext, useEffect, PropsWithChildren, useMemo } from "react";

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
			const newInst = new classConstructor(...args);
			for (const [key, value] of Object.entries(newInst)) {
				if (typeof value === "function" || key === "dispatch") continue;
				container.inst[key] = value;
			}
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
		const local = useMemo(() => postContainer(), []);
		const [state, dispatcher] = useReducer(reducer, local.inst);

		useEffect(() => {
			// dispatch is private, so inst is cast to any to get around it
			(local.inst as any).dispatch = dispatcher;

			return () => {
				if (container) {
					(container.inst as any).dispatch = null;
					container = null;
				}
			};
			// eslint-disable-next-line
		}, []);

		return <local.Context.Provider value={state}>{props.children}</local.Context.Provider>;
	};

	// Public Context
	const ContextHook = () => useContext(postContainer().Context);

	// Public getter
	const getInstance = (): T => {
		if (!container) {
			throw new Error(`Store getter for ${classConstructor.name} called outside of its context.`);
		}
		return container.inst;
	};

	return [Provider, ContextHook, getInstance];
}
