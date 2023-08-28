import React, {Dispatch, SetStateAction} from 'react';
import {GithubOutlined, TranslationOutlined} from '@ant-design/icons';
import {Menu, MenuProps} from 'antd';
import ToggleButton from "./toggle";
import MoonIcon from "./moon";
import {useTranslation} from 'react-i18next';
import Logo from "./logo";
import {useRouter} from "next/router";
import {changeLanguage} from "i18next";

export default function HeaderComponent({setDark, dark, colorBgContainer}: HeaderProps) {
    const router = useRouter();
    const {t, i18n} = useTranslation();

    const onClick: MenuProps['onClick'] = (e) => {
        let key = e.key;
        if (key === "ch") {
            i18n.changeLanguage("zh").then(() => changeLanguage());
        } else if (key === "en") {
            i18n.changeLanguage("en").then(() => changeLanguage());
        }
    };

    const backToHome = () => {
        router.push("/").then(() => backToHome());
    };

    let on = () => {
        setDark(true);
    };
    let off = () => {
        setDark(false);
    };

    const items: MenuProps['items'] = [
        {
            label: t('header.chat-record'),
            key: '0',
        },
        {
            label: (
                <a href="https://floracore.cc/" target="_blank" rel="noopener noreferrer">
                    {t("header.website")}
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
            icon: <GithubOutlined rev={undefined}/>,
        },
        {
            key: 'translation',
            label: <TranslationOutlined rev={undefined}/>,
            children: [
                {
                    key: 'zh',
                    label: (
                        <span onClick={() => i18n.changeLanguage('zh')} style={{cursor: 'pointer'}}>
                            {t("i18n.chinese")}
                        </span>
                    ),
                },
                {
                    key: 'en',
                    label: (
                        <span onClick={() => i18n.changeLanguage('en')} style={{cursor: 'pointer'}}>
                            {t("i18n.english")}
                        </span>
                    ),
                },
            ],
        },
        {
            key: "3",
            label: <ToggleButton type={"primary"} title={<MoonIcon/>} onToggleOn={on} onToggleOff={off}/>,
            disabled: true,
        },
    ];

    return (
        <div style={{background: dark ? '#141414' : colorBgContainer, display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
            <div style={{cursor: "pointer"}} onClick={backToHome}>
                <Logo color={dark ? colorBgContainer : '#141414'}/>
                <a style={{
                    position: "relative",
                    left: 10,
                    fontSize: 20,
                    top: 2,
                    color: dark ? colorBgContainer : '#141414',
                }}>
                    FloraCore
                </a>
            </div>
            <div style={{position: "absolute", right: 10, width: 480}}>
                <Menu onClick={onClick} mode="horizontal" items={items} theme='light'/>
            </div>
        </div>
    );
};

export interface HeaderProps {
    setDark: Dispatch<SetStateAction<boolean>>,
    dark: boolean,
    colorBgContainer: string,
}