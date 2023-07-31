
import { TextField, Button, FormLayout, Page, LegacyCard, } from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';
import { useAuthenticatedFetch } from '../../hooks/useAuthenticatedFetch';
import { FaWhatsapp, FaPhoneSquare, FaFacebookMessenger, FaInstagram, FaRegEnvelope, FaSkype, FaTelegram } from 'react-icons/fa';
import SkeletonExample from "../Skeleton/Skeleton"


function ChatAppFoams() {
    const fetch = useAuthenticatedFetch()
    const [update, setUpdate] = useState({})
    const [isloading, setIsLoading] = useState(true)

    const [data, setData] = useState({
        Phone: {
            phoneNum: '',
            phoneNumtoggle: false,
        },
        Whatsapp: {
            what_Num: '',
            what_Numtoggle: false,
        },
        Messanger: {
            messanger: '',
            messangertoggle: false,
        },
        Instagram: {
            instagram: '',
            instagramtoggle: false,
        },
        Email: {
            email: '',
            emailtoggle: false,
        },
        Skype: {
            skype: '',
            skypetoggle: false,
        },
        Telegram: {
            telegram: '',
            telegramtoggle: false,
        },
    });
    const [isToggled, setisToggled] = useState({
        phoneNumtoggle: false,
        what_Numtoggle: false,
        messangertoggle: false,
        instagramtoggle: false,
        emailtoggle: false,
        skypetoggle: false,
        telegramtoggle: false,


    });

    useEffect(() => {

        fetch('/api/phone', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Accept-Encoding': 'gzip,deflate,compress',
            },
        })
            .then((res) => res.json())
            .then((val) => {
                setUpdate(val);
                setIsLoading(false)

            })
            .catch((err) => {
                console.log(err);

            });
    }, []);

    useEffect(() => {
        // Update data state with received data or initialize with default values
        setData((prevData) => ({
            ...prevData,
            Phone: {
                ...prevData.Phone,
                phoneNum: update?.Phone?.phoneNum ?? '',
                phoneNumtoggle: update?.Phone?.phoneNumtoggle ?? false,
            },
            Whatsapp: {
                ...prevData.Whatsapp,
                what_Num: update?.Whatsapp?.what_Num ?? '',
                what_Numtoggle: update?.Whatsapp?.what_Numtoggle ?? false,
            },
            Messanger: {
                ...prevData.Messanger,
                messanger: update?.Messanger?.messanger ?? '',
                messangertoggle: update?.Messanger?.messangertoggle ?? false,
            },
            Instagram: {
                ...prevData.Instagram,
                instagram: update?.Instagram?.instagram ?? '',
                instagramtoggle: update?.Instagram?.instagramtoggle ?? false,
            },
            Email: {
                ...prevData.Email,
                email: update?.Email?.email ?? '',
                emailtoggle: update?.Email?.emailtoggle ?? false,
            },
            Skype: {
                ...prevData.Skype,
                skype: update?.Skype?.skype ?? '',
                skypetoggle: update?.Skype?.skypetoggle ?? false,
            },
            Telegram: {
                ...prevData.Telegram,
                telegram: update?.Telegram?.telegram ?? '',
                telegramtoggle: update?.Telegram?.telegramtoggle ?? false,
            },
        }));
        setisToggled((prevData) => ({
            ...prevData,
            phoneNumtoggle: update?.Phone?.phoneNumtoggle ?? false,
            what_Numtoggle: update?.Whatsapp?.what_Numtoggle ?? false,
            messangertoggle: update?.Messanger?.messangertoggle ?? false,
            instagramtoggle: update?.Instagram?.instagramtoggle ?? false,
            emailtoggle: update?.Email?.emailtoggle ?? false,
            skypetoggle: update?.Skype?.skypetoggle ?? false,
            telegramtoggle: update?.Telegram?.telegramtoggle ?? false,
        }));
    }, [update]);


    //-------------toggle----------

    const handleToggle = useCallback((name, subname) => {
        setisToggled((prevData) => ({
            ...prevData,
            [subname]: !isToggled[subname]
        }));
        // console.log(isToggled?)
        data[name][subname] = !isToggled[subname]

    });
    //-----------------------------------------------

    const handleChange = useCallback((value, name, title) => {
        setData((prevData) => ({
            ...prevData,
            [title]: {
                ...prevData[title],
                [name]: value,
            }
        }));
    });

    const handleOnClick = useCallback(() => {
        console.log(data)
        fetch("/api/phone", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Accept-Encoding": "gzip,deflate,compress",
            }, body: JSON.stringify(data)
        }).then((res) => { res.text() })
            .catch((err) => {
                console.log(err);
            })
    })
    const handleClearButtonClick = useCallback((name, title) => {
        setData((prevData) => ({
            ...prevData,
            [title]: {
                ...prevData[title],
                [name]: "",
            }
        }));


    });

    return (
        <>
            {isloading ? (<SkeletonExample />) :
                (
                    <div style={{ width: '600px', justifyContent: "center", marginLeft: "20%" }}>
                        <LegacyCard title="Apps Widget:" sectioned>
                            <FormLayout>
                                <div style={{ width: '500px' }}>
                                    <TextField
                                        label="Phone Number :"
                                        connectedLeft=<FaPhoneSquare className="phone-icon" size={30} color="#0084FF" />
                                        placeholder="Enter Phone Number here"
                                        type="tel"
                                        value={data.Phone?.phoneNum}
                                        onChange={(value) => handleChange(value, "phoneNum", "Phone")}
                                        helpText="Fill in Phone number in the international format. Eg: +923104988753."
                                        monospaced
                                        clearButton
                                        onClearButtonClick={() => handleClearButtonClick("phoneNum", "Phone")}
                                        autoComplete="off"
                                        minLength={11}
                                        connectedRight={
                                            <Button primary={!isToggled?.phoneNumtoggle} onClick={() => handleToggle("Phone", "phoneNumtoggle")} >
                                                {isToggled?.phoneNumtoggle ? "Disable" : "Enable"}
                                            </Button>} />
                                </div>
                                <div style={{ width: '500px' }}>
                                    <TextField
                                        label="Whatsapp Number :"
                                        connectedLeft={<FaWhatsapp className="whatsapp-icon" size={30} color="#25D366" />}
                                        placeholder="Enter Whatsapp Number here"
                                        type="tel"
                                        value={data.Whatsapp?.what_Num}
                                        onChange={(value) => handleChange(value, "what_Num", "Whatsapp")}
                                        helpText="Fill in WhatsApp phone number in the international format. Eg: +923104988753."
                                        clearButton
                                        onClearButtonClick={() => handleClearButtonClick("what_Num", "Whatsapp")}
                                        monospaced
                                        autoComplete="off"
                                        connectedRight={
                                            <Button primary={!isToggled?.what_Numtoggle} onClick={() => handleToggle("Whatsapp", "what_Numtoggle")} >
                                                {isToggled?.what_Numtoggle ? "Disable" : "Enable"}
                                            </Button>} />
                                </div>
                                <div style={{ width: '500px' }}>
                                    <TextField
                                        label="Messanger :"
                                        placeholder="Enter User Name here"
                                        connectedLeft={<FaFacebookMessenger className="messenger-icon" size={30} color="#0084FF" />}
                                        type="text"
                                        value={data.Messanger?.messanger}
                                        onChange={(value) => handleChange(value, "messanger", "Messanger")}
                                        helpText="Fill in Messanger TextField like . Eg: myusername."
                                        clearButton
                                        onClearButtonClick={() => handleClearButtonClick("messanger", "Messanger")}
                                        monospaced
                                        autoComplete="off"
                                        connectedRight={
                                            <Button primary={!isToggled?.messangertoggle} onClick={() => handleToggle("Messanger", "messangertoggle")} >
                                                {isToggled?.messangertoggle ? "Disable" : "Enable"}
                                            </Button>} />
                                </div>
                                <div style={{ width: '500px' }}>
                                    <TextField
                                        label="Instagram :"
                                        connectedLeft={<FaInstagram className="instagram-icon" size={30} color="#E1306C" />}
                                        placeholder="Enter User Name here"
                                        type="text"
                                        value={data.Instagram?.instagram}
                                        onChange={(value) => handleChange(value, "instagram", "Instagram")}
                                        helpText="Fill in Instagram TextField like . Eg: example_user."
                                        clearButton
                                        onClearButtonClick={() => handleClearButtonClick("instagram", "Instagram")}
                                        monospaced
                                        autoComplete="off"
                                        connectedRight={
                                            <Button primary={!isToggled?.instagramtoggle} onClick={() => handleToggle("Instagram", "instagramtoggle")} >
                                                {isToggled?.instagramtoggle ? "Disable" : "Enable"}
                                            </Button>} />
                                </div>
                                <div style={{ width: '500px' }}>
                                    <TextField
                                        label="Email :"
                                        placeholder="Enter Email here"
                                        connectedLeft={<FaRegEnvelope className="Envelope-icon" size={30} color="#E1306C" />}
                                        type="email"
                                        value={data.Email?.email}
                                        onChange={(value) => handleChange(value, "email", "Email")}
                                        helpText="Fill in Email TextField like. Eg: username@gmail.com."
                                        clearButton
                                        onClearButtonClick={() => handleClearButtonClick("email", "Email")}
                                        monospaced
                                        autoComplete="off"
                                        connectedRight={
                                            <Button primary={!isToggled?.emailtoggle} onClick={() => handleToggle("Email", "emailtoggle")} >
                                                {isToggled?.emailtoggle ? "Disable" : "Enable"}
                                            </Button>} />
                                </div>
                                <div style={{ width: '500px' }}>
                                    <TextField
                                        label="Skype :"
                                        placeholder="Enter Skype Username here"
                                        connectedLeft={<FaSkype className="skype-icon" size={30} color="#00AFF0" />}
                                        type="text"
                                        value={data.Skype?.skype}
                                        onChange={(value) => handleChange(value, "skype", "Skype")}
                                        helpText="Fill in Skype TextField like. Eg: john.doe."
                                        clearButton
                                        onClearButtonClick={() => handleClearButtonClick("skype", "Skype")}
                                        monospaced
                                        autoComplete="off"
                                        connectedRight={
                                            <Button primary={!isToggled?.skypetoggle} onClick={() => handleToggle("Skype", "skypetoggle")} >
                                                {isToggled?.skypetoggle ? "Disable" : "Enable"}
                                            </Button>} />
                                </div>
                                <div style={{ width: '500px' }}>
                                    <TextField
                                        label="Telegram :"
                                        placeholder="Enter Telegram ID here"
                                        connectedLeft={<FaTelegram className="telegram-icon" size={30} color="#0088cc" />}
                                        type="text"
                                        value={data.Telegram?.telegram}
                                        onChange={(value) => handleChange(value, "telegram", "Telegram")}
                                        helpText="Fill in Telegram TextField like . Eg: @examplechanne."
                                        clearButton
                                        onClearButtonClick={() => handleClearButtonClick("telegram", "Telegram")}
                                        monospaced
                                        autoComplete="off"
                                        connectedRight={
                                            <Button primary={!isToggled?.telegramtoggle} onClick={() => handleToggle("Telegram", "telegramtoggle")} >
                                                {isToggled?.telegramtoggle ? "Disable" : "Enable"}
                                            </Button>} />


                                </div>

                                <div>
                                    <Button primary onClick={handleOnClick}>Save Accounts </Button>
                                </div>

                            </FormLayout>
                        </LegacyCard>
                    </div>
                )
            }

        </>
    );
}
export default ChatAppFoams