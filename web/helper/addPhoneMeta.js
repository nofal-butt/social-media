import axios from "axios"
const addPhoneMeta = async (session, metavalue) => {
    let themeId;
    const token = session.accessToken
    const shop = session.shop

    const requestHeader = () => ({
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip,deflate,compress",
        "X-Shopify-Access-Token": token,
    });
    const newData = JSON.stringify({
        metafield: metavalue
    })



    await axios.post(`https://${shop}/admin/api/2023-04/metafields.json`, newData, {
        headers: requestHeader()
    }).then((result) => {
        themeId = true
    }).catch(err => {
        console.log(err.message);
        themeId = false
    })
    return themeId
}
const addThemeData = async (session) => {
    let themeId;
    const token = session.accessToken
    const shop = session.shop
    let status = 200;
    let error = false;
    let message;
    let ActivationStatus;
    const requestHeader = () => ({
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip,deflate,compress",
        "X-Shopify-Access-Token": token,
    });

    let url = `https://${shop}/admin/api/2023-07/themes.json`;
    await axios.get(url, {
        headers: requestHeader()
    }).then((result) => {
        themeId = result.data.themes.find((theme) => {
            return theme?.role === "main"
        })
        themeId = themeId?.id
        message = "Data Get Successfully!"
    }).catch(err => {
        console.log(err.message);
        error = true
        status = 500
        message = err.message
    })


    url = `https:///${shop}/admin/api/2023-07/themes/${themeId}/assets.json?asset[key]=config/settings_data.json`
    await axios.get(url, {
        headers: requestHeader()
    }).then((result) => {
        ActivationStatus = JSON.parse(result.data.asset.value)
        ActivationStatus = ActivationStatus.current.blocks
        ['14178122596446758159'].disabled
        console.log(ActivationStatus, "ActivationStatus")
    }).catch(err => {
        console.log(err.message);
        error = true
        status = 500
        message = err.message
    })
    return { status, error, message, ActivationStatus }
}

export { addPhoneMeta, addThemeData }