import { LegacyCard, LegacyTabs, Page } from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';
import ChatAppFoams from "../Chatapp/ChatAppFoams"
import OverViewGrid from "../Chatapp/Overview"
import Contact from '../Chatapp/Contact';
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import Lockicon from "../Chatapp/Lockicon"

function TopBar() {
    const fetch = useAuthenticatedFetch();
    const [selected, setSelected] = useState(0);
    const [activate, setActivate] = useState();

    useEffect(() => {
        themeDetails()
    }, []);

    const themeDetails = () => {
        fetch("/api/theme", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Accept-Encoding": "gzip,deflate,compress",
            },
        })
            .then((data) => {
                data.json().then((res) => {
                    console.log(res.ActivationStatus);
                    setActivate(res.ActivationStatus)
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );

    const tabs = [
        {
            id: 'Overview',
            content: 'Overview',
            panelID: 'selected-Overview',
            components: <OverViewGrid />,
        },

        {
            id: 'Widget',
            content: 'Social Media Widget',
            panelID: 'select-Widget',
            components: !activate ? <ChatAppFoams /> : <h1 variation="subdued"><Lockicon /></h1>,
            disabled: !activate,
        },

        {
            id: 'Contact us',
            content: 'Contact Us',
            panelID: 'selected-Contact',
            components: <Contact />
        },
        //     {
        //         id: 'prospects-1',
        //         content: 'Prospects',
        //         panelID: 'prospects-content-1',
        //         components: <Phone />

        //     },
    ];
    const selectedTab = tabs[selected];

    return (

        // <LegacyCard>
        <LegacyTabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
            <LegacyCard.Section key={selectedTab.id} hidden={false}>
                {selectedTab.components}
            </LegacyCard.Section>

        </LegacyTabs>
        // </LegacyCard>

    );
}
export default TopBar
