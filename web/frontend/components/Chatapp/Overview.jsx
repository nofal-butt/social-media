import { Page, CalloutCard, MediaCard, Grid, LegacyCard, Card, Text } from '@shopify/polaris';
import { React, useEffect, useState } from 'react';
import { useAuthenticatedFetch } from "../../hooks/useAuthenticatedFetch";
import SkeletonExample from "../Skeleton/Skeleton";
import Icon from "../../image/image.jpg";

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
                <div >
                    <Card sectioned>
                        <Text as="h2" fontWeight="semibold" variant="headingMd" alignment="justify">Overview</Text>
                        <div style={{ display: "flex", marginTop: "20px" }}>
                            <div>
                                <Text as="h1" variant="bodyMd" alignment="justify" >
                                    Social Media Widget App is a Shopify app that makes it easy for customers to connect with the customer support team. With just one click, customers can select their preferred social media platform and send a message to the team. The app supports Facebook, Instagram, Pinterest, Telegram, Gmail, Skype, and contact numbers. Social Media Widget App is the perfect way to improve customer satisfaction and reduce customer support costs. the app's built-in automation features empower your customer support team to set up instant responses and automated replies, ensuring quick acknowledgment and resolution of common queries, further enhancing overall customer experience and satisfaction.
                                </Text>
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
                <div style={{ marginTop: "20px" }}>
                    <Grid >
                        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                            <LegacyCard title="Multi-platform Integration" sectioned>
                                <Text as="h2" variant="bodyMd" alignment="justify" style={{ height: 150 }}>The app offers a comprehensive range of social media platforms and contact channels, ensuring customers have various options to connect with the support team. It includes popular platforms like Facebook, Instagram, Pinterest, and Telegram, along with email (Gmail), voice communication (Skype), and traditional contact numbers.</Text>
                            </LegacyCard>
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                            <LegacyCard title="One-Click Messaging" sectioned>
                                <Text as="h2" variant="bodyMd" alignment="justify" style={{ height: 150 }}>The app simplifies the communication process by enabling customers to send messages to the support team with just one click. Upon selecting their preferred platform from the widget, customers can quickly compose and send their inquiries, feedback, or issues directly to the support team. With just one click, customers can select their preferred social media platform</Text>
                            </LegacyCard>
                        </Grid.Cell>
                    </Grid>
                </div>
                <div style={{ marginTop: "20px" }}>
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
                            src={Icon}
                        />
                    </MediaCard>
                </div>

            </Page>

            )
        }
    </>);
}
export default OverViewGrid