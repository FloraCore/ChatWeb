import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { GithubOutlined, TranslationOutlined } from '@ant-design/icons';
import { Button, Menu, MenuProps } from 'antd';
import MoonIcon from "./moon";
import { useTranslation } from 'react-i18next';
import Logo from "./logo";
import { useRouter } from "next/router";

const LOCALSTORAGE_TRISTATE_KEY = "APP_THEME_TRISTATE";

export default function HeaderComponent({ setDark, dark, colorBgContainer }: HeaderProps) {
    const router = useRouter();
    const { t, i18n } = useTranslation();

    const [width, setWidth] = useState<number | string>("100%");
    const ref = useRef(null);

    useEffect(() => {
        //
        // TODO: A workaround before following the correct `antd` usage.
        //

        const el = (((ref.current as any as HTMLElement).children[0] as any as HTMLElement)); // .ant-menu-overflow

        const fn = () => {
            const childrenWidth = [...(el.children as any as Array<HTMLElement>)].reduce((prev, curr) => prev + curr.offsetWidth, 0);
            setWidth(childrenWidth);
        };

        const ob = new ResizeObserver(fn);
        ob.observe(el.children[0]);

        return () => ob.disconnect();
    }, []);

    const backToHome = () => {
        router.push("/");
    };

    const itemsPropAdditionals = {
        style: { marginTop: 0 }
    };

    const triStateMapping = [
        () => true,
        () => false,
        () => window.matchMedia('(prefers-color-scheme: dark)').matches
    ];

    const [triState, setTriState] = useState(1);
    const triStateProvisionStatus = useRef(false);

    const triStateIcons = [
        <MoonIcon />, // Dark
        <MoonIcon />, // Light
        <div style={{ position: "relative" }}>
            <MoonIcon />
            <div style={{
                position: "absolute",
                right: 0,
                top: 2,
                fontSize: 7
            }}>A</div>
        </div>   // Auto
    ];

    const changeDarkMode = () => setTriState(item => (item + 1) % 3);

    useEffect(() => {
        setTriState(+(localStorage.getItem(LOCALSTORAGE_TRISTATE_KEY) || 0));
        triStateProvisionStatus.current = true;
    }, []);

    useEffect(() => {
        if (!triStateProvisionStatus.current) return;
        localStorage.setItem(LOCALSTORAGE_TRISTATE_KEY, triState.toString());
        setDark(triStateMapping[triState]());
    }, [triState]);

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
            icon: <GithubOutlined rev={undefined} />,
        },
        {
            key: 'translation',
            label: <TranslationOutlined rev={undefined} />,
            children: [
                {
                    key: 'zh',
                    label: (
                        <span style={{ cursor: 'pointer' }}>
                            {t("i18n.chinese")}
                        </span>
                    ),
                    onClick: () => i18n.changeLanguage('zh')
                },
                {
                    key: 'en',
                    label: (
                        <span style={{ cursor: 'pointer' }}>
                            {t("i18n.english")}
                        </span>
                    ),
                    onClick: () => i18n.changeLanguage('en')
                },
            ],
        },
        {
            key: "3",
            label: <Button type={dark ? "primary" : "dashed"} size="small" onClick={changeDarkMode}>{triStateIcons[triState]}</Button>,
            disabled: true,
        },
    ].map(item => ({ ...item, ...itemsPropAdditionals }));

    return (
        <div style={{ background: dark ? '#141414' : colorBgContainer, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ cursor: "pointer" }} onClick={backToHome}>
                <Logo color={dark ? colorBgContainer : '#141414'} />
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
            <div style={{ position: "absolute", right: 10, width, visibility: width === "100%" ? "hidden" : "visible" }} ref={ref}>
                <Menu mode="horizontal" items={items} theme='light' />
            </div>
        </div>
    );
};

export interface HeaderProps {
    setDark: Dispatch<SetStateAction<boolean>>,
    dark: boolean,
    colorBgContainer: string
}