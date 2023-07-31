// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import shopify from "./shopify.js";
import mongoose from "mongoose"
// import addData from "./helper/addData.js"
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";
import { addPhoneMeta, addThemeData } from "./helper/addPhoneMeta.js";
import FormModel from "./Database/Form.js"
import axios from "axios"
const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

mongoose.connect("mongodb://0.0.0.0:/chatApp",).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log(err)
});

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());
//----------------------------------starting point---------------


//-------chatApp api -----------------
app.post("/api/phone", async (req, res) => {

  let status;
  let error = false;
  let message;
  let output;

  const session = res.locals.shopify.session
  const shop = session.shop
  let data = req.body
  data["shop"] = shop
  console.log(data, " nofal")
  try {
    const metavalue = {
      namespace: "chatapp",
      key: "phone",
      value: JSON.stringify(data),
      type: 'json'
    }
    const response = await addPhoneMeta(session, metavalue)
    // console.log(output)
    if (response) {
      output = response
      const update = await FormModel.findOneAndUpdate({ shop }, data)
      // console.log(update)
      if (update === null) {
        const account = new FormModel(data)
        await account.save()
      }
      status = 200
      message = "Data Save Successfully"

    } else {
      error = true
      message = "ADDING ISSUE IN META FIELD"
      status = 500
    }
  } catch (err) {
    console.log(err);
    error = true
    message = "ADDING ISSUE IN META FIELD"
    status = 500
  }

  res.status(status).send({ message, error, output });
})
app.get("/api/phone", async (req, res) => {
  const data = await FormModel.findOne();
  try {
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(console.log("Error"));
  }
});


//------------merchant data----
app.get("/api/merchentStore", async (req, res) => {
  const session = res.locals.shopify.session;
  // console.log("Session", session);
  const token = session.accessToken;
  const shop = session.shop;
  let status = 200;
  let error = false;
  let message;
  let shopDetail;
  await axios.get(`https://${shop}/admin/api/2023-07/shop.json`, {
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip,deflate,compress",
      "X-Shopify-Access-Token": token,
    },
  }).then((result) => {
    shopDetail = result.data.shop
    message = "Data Got Successfully!"
  }).catch((err) => {
    console.log(err.message);
    error = true;
    status = 500;
    message = err.message
  });
  res.status(status).json({ shopDetail, error, message })
});


//-----------------theme APi ---------
app.get("/api/theme", async (req, res) => {
  const session = res.locals.shopify.session;
  const themeDetail = await addThemeData(session)
  // const themAppExtSetting = await 
  // console.log(themeDetail)
  res.status(themeDetail.status).json(themeDetail)
});


//----------------------------------end ---------------


app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));
console.log(`SERVER IS RUNNING ${PORT}`)
app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
