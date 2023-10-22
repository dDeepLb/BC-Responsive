export type Setting = Button | Checkbox | Input | Label;

export type Button = {
    type: "button";
    position: number[];
    size: number[];
    label: string;
    color: string;
    image: string;
    disabled: boolean;
    callback(): void;
}

export type Checkbox = {
    type: "checkbox";
    label: string;
    description: string;
    disabled: boolean;
    setting(): any;
    setSetting(val: any): void;
}

export type Input = {
    type: "text" | "number";
    id: string;
    label: string;
    description: string;
    disabled: boolean;
    setting(): any;
    setSetting(val: any): void;
}

export type Label = {
    type: "label";
    label: string;
    description: string;
    disabled: boolean;
}