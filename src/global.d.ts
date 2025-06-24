declare module "*.scss" {
    const content: { [className: string]: string };
    export default content;
}

declare module "*.svg" {
    const content: any;
    export default content;
}

declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.module.scss" {
    const classes: { [key: string]: string };
    export default classes;
}
