import {Button} from "antd";
import {ReactNode, useState} from "react";
import {ButtonType} from "antd/es/button";

export default function ToggleButton({title, type, onToggleOn, onToggleOff}: SwitchButtonProps) {
    let [state, setState] = useState<ButtonType>("dashed");

    let toggle = () => {
        if (state == "dashed") {
            setState(type);
            onToggleOn();
        } else {
            setState("dashed");
            onToggleOff();
        }
    }

    return (
        <>
            <Button type={state} size={"small"} onClick={toggle}>{title}</Button>
        </>
    );
}

export interface SwitchButtonProps {
    title: ReactNode,
    type: ButtonType,
    onToggleOn: () => void,
    onToggleOff: () => void
}