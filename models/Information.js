import mongoose from 'mongoose'

const InfoSchema = new mongoose.Schema({
    vara: {
        type: String,
        required: [true, 'Ange ett varunamn.'],
    },
    pris: {
        type: Number,
        required: [true, "Ange ett pris"],
    },
    datum: {
        type: Date,
        required: [true, 'Ange datum.'],
    },
    bild: {
        type: String,
        required: [true, 'Skicka bild.'],
    },
    swish: {
        type: Number,
        required: [true, 'Ange swishnummer.'],
    },
})

export default mongoose.models.Info || mongoose.model('Info', InfoSchema)
