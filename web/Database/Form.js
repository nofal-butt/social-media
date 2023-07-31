import mongoose from "mongoose"
const Form = mongoose.Schema({
    shop: {
        type: String,
        require: true
    },
    Phone: {
        phoneNum: {
            type: Number,
            require: true
        },
        phoneNumtoggle: {
            type: Boolean,
            require: false
        },
    },
    Whatsapp: {

        what_Num: {
            type: Number,
            require: true
        },
        what_Numtoggle: {
            type: Boolean,
            require: false
        },
    },
    Messanger: {
        messanger: {
            type: String,
            require: true
        },
        messangertoggle: {
            type: Boolean,
            require: false
        },

    },
    Instagram: {
        instagram: {
            type: String,
            require: true
        },
        instagramtoggle: {
            type: Boolean,
            require: false
        },
    },
    Email: {
        email: {
            type: String,
            require: true
        },
        emailtoggle: {
            type: Boolean,
            require: false
        },
    },
    Skype: {
        skype: {
            type: String,
            require: true
        },
        skypetoggle: {
            type: Boolean,
            require: false
        },
    },
    Telegram: {
        telegram: {
            type: String,
            require: true
        },
        telegramtoggle: {
            type: Boolean,
            require: false
        },

    }

})

const FormModel = mongoose.model("user", Form)
export default FormModel