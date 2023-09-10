import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { GithubOutlined, TranslationOutlined } from '@ant-design/icons';
import { Button, Menu, MenuProps } from 'antd';
import MoonIcon from "./moon";
import { useTranslation } from 'react-i18next';
import Logo from "./logo";
import { useRouter } from "next/router";
import AutoIcon from './autoicon';

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
            setWidth(Math.min(childrenWidth, window.innerWidth - 200));
        };

        const ob = new ResizeObserver(fn);
        ob.observe(el.children[0]);

        window.addEventListener("resize", fn);

        return () => {
            ob.disconnect();
            window.removeEventListener("resize", fn);
        }
    }, []);

    const backToHome = () => {
        router.push("/");
    };

    const [colorPreferenceDark, setColorPreferenceDark] = useState(false);

    useEffect(() => {
        const onChange = (e: MediaQueryListEvent) => setColorPreferenceDark(e.matches);

        const m = window.matchMedia("(prefers-color-scheme: dark)");
        setColorPreferenceDark(m.matches);

        m.addEventListener("change", onChange);
        return () => m.removeEventListener("change", onChange);
    }, []);

    const itemsPropAdditions = {
        style: { marginTop: 0 }
    };

    const triStateMapping = [
        true,
        false,
        colorPreferenceDark
    ];

    const [triState, setTriState] = useState(1);
    const triStateProvisionStatus = useRef(false);

    const triStateIcons = [
        () => <MoonIcon />, // Dark
        () => <MoonIcon />, // Light
        () => <div style={{ position: "relative" }}>
            <MoonIcon />
            <AutoIcon style={{
                position: "absolute",
                right: -2,
                top: 4,
                width: 7,
                height: 7
            }} />
        </div>   // Auto
    ];

    const changeDarkMode = () => setTriState(item => (item + 1) % 3);

    useEffect(() => {
        setTriState(+(localStorage.getItem(LOCALSTORAGE_TRISTATE_KEY) || 2));
        triStateProvisionStatus.current = true;
    }, []);

    useEffect(() => {
        if (!triStateProvisionStatus.current) return;
        localStorage.setItem(LOCALSTORAGE_TRISTATE_KEY, triState.toString());
        setDark(triStateMapping[triState]);
    }, [triState, triState === 2 && colorPreferenceDark]);

    const onChangeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("APP_SELECTED_LANGUAGE", lang);
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
                    onClick: () => onChangeLanguage("zh")
                },
                {
                    key: 'en',
                    label: (
                        <span style={{ cursor: 'pointer' }}>
                            {t("i18n.english")}
                        </span>
                    ),
                    onClick: () => onChangeLanguage("en")
                },
            ],
        },
        {
            key: "3",
            label: <Button type={dark ? "primary" : "dashed"} size="small" onClick={changeDarkMode}>{triStateIcons[triState]()}</Button>,
            disabled: true,
        },
    ].map(item => ({ ...item, ...itemsPropAdditions }));

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
                <Menu mode="horizontal" items={items} theme='light' style={{ borderBottom: "none" }} />
            </div>
        </div>
    );
};

export interface HeaderProps {
    setDark: Dispatch<SetStateAction<boolean>>,
    dark: boolean,
    colorBgContainer: string
}