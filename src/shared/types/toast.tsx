export interface ToastProps {
    count: number;
    visible: boolean;
    position: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
    message: string;
}

export type animationState = "entering" | "exiting" | "idle";