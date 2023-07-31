import { Page, CalloutCard, MediaCard, Grid, LegacyCard, Card } from '@shopify/polaris';
import { React, useEffect, useState } from 'react';
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import SkeletonExample from "../Skeleton/Skeleton"

function OverViewGrid() {

    const fetch = useAuthenticatedFetch();
    const [storeData, setStoreData] = useState();
    const [isloading, setIsloading] = useState(true);

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
                    setIsloading(false);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (<>
        {isloading ? (<SkeletonExample />) :
            (<Page>
                <div style={{ height: 300 }}>
                    <Card sectioned>
                        <div style={{ fontSize: "16px", fontWeight: "600" }}>Overview</div>
                        <div style={{ display: "flex" }}>
                            <div>
                                <p style={{ padding: "15px 16px 0px 0px" }}>
                                    Social Media Widget App is a Shopify app that makes it easy for customers to connect with the customer support team. With just one click, customers can select their preferred social media platform and send a message to the team. The app supports Facebook, Instagram, Pinterest, Telegram, Gmail, Skype, and contact numbers. Social Media Widget App is the perfect way to improve customer satisfaction and reduce customer support costs.
                                </p>
                            </div>
                            <div>
                                <img
                                    alt=""
                                    width="180px"
                                    height="180px"
                                    style={{
                                        objectFit: "cover",
                                        objectPosition: "center",
                                        justifyItems: "center",
                                        justifyContent: "center",
                                    }}
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwoGl6UtxY_PESzqcxl7PTXiAxzzxgb3Is8w&usqp=CAU"
                                />
                            </div>
                        </div>
                    </Card>
                </div>
                <div style={{ height: 300 }}>
                    <Grid >
                        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                            <LegacyCard title="Multi-platform Integration" sectioned>
                                <p style={{ height: 150 }}>The app offers a comprehensive range of social media platforms and contact channels, ensuring customers have various options to connect with the support team. It includes popular platforms like Facebook, Instagram, Pinterest, and Telegram, along with email (Gmail), voice communication (Skype), and traditional contact numbers.</p>
                            </LegacyCard>
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                            <LegacyCard title="One-Click Messaging" sectioned>
                                <p style={{ height: 150 }}>The app simplifies the communication process by enabling customers to send messages to the support team with just one click. Upon selecting their preferred platform from the widget, customers can quickly compose and send their inquiries, feedback, or issues directly to the support team.</p>
                            </LegacyCard>
                        </Grid.Cell>
                    </Grid>
                </div>
                <MediaCard
                    title="Getting Started"
                    primaryAction={{
                        url: `https://${storeData?.myshopify_domain}/admin/themes/current/editor?context=apps&collection&activateAppId=b844127b-ede7-427e-83e9-7947ce1a3874/phoneNumber`,
                        external: "true",
                        content: 'Enable Embeds App',
                    }}
                    description="The Social Media Widget App is an innovative Shopify app designed to enhance customer support and satisfaction. It streamlines the communication process between customers and the support team by integrating various social media platforms and contact channels into a single widget. With just one click, customers can effortlessly reach out to the support team on their preferred platform, be it Facebook, Instagram, Pinterest, Telegram, Gmail, Skype, or through a contact number. This seamless integration aims to improve customer satisfaction while also reducing customer support costs for businesses"
                >
                    <img
                        alt=""
                        width="100%"
                        height="100%"
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                        src="https://png.pngtree.com/png-clipart/20190515/original/pngtree-social-media-icons-set-png-image_3591936.jpg"
                    />
                </MediaCard>
            </Page>

            )
        }
    </>);
}
export default OverViewGrid