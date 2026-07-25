import {ComponentType} from 'react';

export type ViewProps<TViewData, TIntent> = {
    viewData: TViewData;
    send: (intent: TIntent) => void;
};

export abstract class ViewController<TViewData, TIntent = never> {
    abstract readonly View: ComponentType<ViewProps<TViewData, TIntent>>;

    private currentViewData: TViewData;
    private readonly listeners = new Set<() => void>();

    protected constructor(initialViewData: TViewData) {
        this.currentViewData = initialViewData;
    }

    getSnapshot = (): TViewData => this.currentViewData;

    subscribe = (listener: () => void): (() => void) => {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    };

    protected setViewData(next: TViewData): void {
        this.currentViewData = next;
        this.listeners.forEach(listener => listener());
    }

    onMount(): void {}

    onUnmount(): void {}

    onMessage(_intent: TIntent): void {}
}
