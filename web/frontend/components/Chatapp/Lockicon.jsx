import { LegacyCard, EmptyState } from '@shopify/polaris';
import { React, useEffect, useState } from 'react';
import tala from '../../image/lock.jpg'
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
function Lockicon() {
    const fetch = useAuthenticatedFetch();
    const [storeData, setStoreData] = useState();
    const [activate, setActivate] = useState(true);
    useEffect(() => {
        shopDetails()
    }, []);

    const shopDetails = () => {
        fetch("/api/merchentStore", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Accept-Encoding": "gzip,deflate,compress",
            },
        })
            .then((data) => {
                data.json().then((res) => {
                    // console.log(res);
                    setStoreData(res.shopDetail);

                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
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

                    // setStoreData(res.shopDetail);

                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <LegacyCard sectioned>
            <EmptyState
                action={{
                    url: `https://${storeData?.myshopify_domain}/admin/themes/current/editor?context=apps&collection&activateAppId=b844127b-ede7-427e-83e9-7947ce1a3874/phoneNumber`,
                    content: 'Enabale Embeds App '
                }}
                image={tala}
                fullWidth
            >
                <p>





                </p>
            </EmptyState>
        </LegacyCard>
    );
}
export default Lockicon