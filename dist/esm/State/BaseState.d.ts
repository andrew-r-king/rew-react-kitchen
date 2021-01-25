import React from "react";
import "reflect-metadata";
import { Optional } from "../Types";
import { ActionEvent } from "./ActionType";
export declare abstract class BaseState {
    private dispatch;
    private deferred;
    private deferCount;
    private isDeferring;
    protected setDispatcher: (dispatcher: Optional<React.Dispatch<ActionEvent>>) => void;
    reset: () => void;
    private dispatchDeferredState;
    private dispatchStateInternal;
    protected dispatchStoreState: () => void;
}
declare type BabelPropertyDescriptor<T> = TypedPropertyDescriptor<T> & {
    initializer?: Function;
};
export declare function Action<T>(target: any, key: string, descriptor?: BabelPropertyDescriptor<T>): any;
export {};
