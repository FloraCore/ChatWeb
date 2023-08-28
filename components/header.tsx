import React, {Dispatch, SetStateAction, useState} from 'react';
import {AppstoreOutlined, GithubOutlined, MailOutlined, SettingOutlined, TranslationOutlined} from '@ant-design/icons';
import { MenuProps, theme } from 'antd';
import {Button, Menu} from 'antd';
import ToggleButton from "./toggle";
import MoonIcon from "./moon";


export default function HeaderComponent({setDark}: HeaderProps){
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        let key = e.key;
        if (key == "ch") {
            i18n.changeLanguage("ch").then();
        } else if (key == "en") {
            i18n.changeLanguage("en").then();
        }
        console.log(key);
    };
    
    const backToHome = () => {
        router.push("/");
    }


    let on = () => {
        setDark(true);
    }
    let off = () => {
        setDark(false);
    }

    const items: MenuProps['items'] = [
        {
            label: '聊天查看器',
            key: 'mail',
        },
        {
            label: (
                <a href="https://www.floracore.cc/" target="_blank" rel="noopener noreferrer">
                    官方网站
                </a>
            ),
            key: '1',
        },
        {
            label: (
                <a href="https://github.com/FloraCore/ChatWeb" target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
            ),
            key: '2',
            icon: <GithubOutlined rev={undefined}/>
        },
        {
            key: 'translation',
            label: <TranslationOutlined rev={undefined}/>,
            children: [
                {
                    key: "zh",
                    label: "中文"
                },
                {
                    key: "en",
                    label: "英文"
                }
            ]
        },
        {
            key: "3",
            label: <ToggleButton type={"primary"} title={<MoonIcon/>} onToggleOn={on} onToggleOff={off}/>,
            disabled: true
        }
    ];

    return (
        <div style={{ background: dark ? '#141414' : colorBgContainer, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{cursor: "pointer"}} onClick={backToHome}>
                <Logo color={dark ? colorBgContainer : '#141414'}/>
                <a style={{position: "relative", left: 10, fontSize: 20, top: 2, color: dark ? colorBgContainer : '#141414'}}>
                    FloraCore
                </a>
            </div>
            <div style={{position: "absolute", right: 10, width: 480}}>
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} theme='light' />
            </div>
        </div>
    );
};

export interface HeaderProps {
    setDark: Dispatch<SetStateAction<boolean>>,
    dark: boolean,
    colorBgContainer: string
}
