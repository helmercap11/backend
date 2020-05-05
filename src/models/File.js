const mongoose = require('mongoose');

const File = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        require: true,
    },
}, 
{
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true}
}
);

File.virtual('url').get(function() {

    const url = process.env.url || 'http://localhost:3000';

    return `${$url}/files/${encodeURIComponent(this.path)}`;
})

module.exports = mongoose.model("File", File);