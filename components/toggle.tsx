import {Button} from "antd";
import {ReactNode, useEffect, useState} from "react";
import {ButtonType} from "antd/es/button";

export default function ToggleButton({title, type, onToggleOn, onToggleOff, defaultState}: SwitchButtonProps) {
    let [state, setState] = useState<ButtonType>("dashed");

    useEffect(() => {
        if (defaultState) {
            setState(type);
        }
    })
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
    onToggleOff: () => void,
    defaultState?: boolean
}