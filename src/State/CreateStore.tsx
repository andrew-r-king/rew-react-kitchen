import React, { useReducer, useContext, useEffect, PropsWithChildren } from "react";

import { BaseState } from "./BaseState";
import { ClassType } from "../Types";
import { ActionEvent, ActionType } from "./ActionType";

export type StoreProvider = (props: PropsWithChildren<object>) => JSX.Element;

export function createStore<T extends BaseState>(classConstructor: ClassType<T>): [StoreProvider, () => T, T] {
	let inst: T = new classConstructor();
	const InternalContext: React.Context<T> = React.createContext(inst);

	const initialize = (_state: T) => {
		inst = new classConstructor();
		return inst;
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
		const [state, dispatcher] = useReducer(reducer, inst);

		useEffect(() => {
			// setDispatcher is private, so inst is cast to any to get around it
			(inst as any).setDispatcher(dispatcher);

			return () => {
				(inst as any).setDispatcher(null);
			};
			// eslint-disable-next-line
		}, [inst]);

		return <InternalContext.Provider value={state}>{props.children}</InternalContext.Provider>;
	};

	const Context = () => useContext(InternalContext);

	return [Provider, Context, inst];
}
