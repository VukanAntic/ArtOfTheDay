export class SplashScreenViewData {
    constructor(readonly loading: boolean = false) {}
}

export class AnimationCompleteIntent {}

export type SplashScreenIntent = AnimationCompleteIntent;
