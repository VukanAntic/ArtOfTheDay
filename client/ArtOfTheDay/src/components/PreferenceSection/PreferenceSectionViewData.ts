export default class PreferenceSectionViewData {
    title: string;
    selected: string[];
    all: string[];

    constructor(title: string, selected: string[], all: string[]) {
        this.title = title;
        this.selected = selected;
        this.all = all;
    }
}
