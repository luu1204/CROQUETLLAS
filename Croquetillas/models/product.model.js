const {schema, model, Schema} = require ("mongoose")

const productSchema = new Schema(
    {
        name: {
            type : String,
            required: true,
            unique: true
        },
        price: {
            type: Number,
            required: true
        },
        isNew:{
            type: Boolean,
            required: true,
            default: true
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref:"user",
            required: true
        },
        image: {
            type: String,
            default:""
        },
        number: {
            type: Number,
            required:true
        }
    }
    
)

const product = model("product", productSchema)

module.exports = product