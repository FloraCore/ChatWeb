import React, {Dispatch, SetStateAction, useState} from 'react';
import {AppstoreOutlined, GithubOutlined, MailOutlined, SettingOutlined, TranslationOutlined} from '@ant-design/icons';
import { MenuProps, theme } from 'antd';
import {Button, Menu} from 'antd';
import ToggleButton from "./toggle";
import MoonIcon from "./moon";


export default function HeaderComponent({setDark}: HeaderProps){
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };


    let on = () => {
        setDark(true);
    }
    let off = () => {
        setDark(false);
    }

    const items: MenuProps['items'] = [
        {
            label: 'Navigation One',
            key: 'mail',
            icon: <MailOutlined rev={undefined} />,
        },
        {
            label: (
                <a href="https://github.com/FloraCore/ChatWeb" target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
            ),
            key: 'github',
            icon: <GithubOutlined rev={undefined} />
        },
        {
            key: 'translation',
            label: <TranslationOutlined rev={undefined} />
        },
        {
            key: "",
            label: <ToggleButton type={"primary"} title={<MoonIcon />} onToggleOn={on} onToggleOff={off} />,
            disabled: true
        }
    ];

    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} theme='light' />
    );
};

export interface HeaderProps {
    setDark: Dispatch<SetStateAction<boolean>>,
}
