const mongoose = require('mongoose')
const userData = require('./Models/Userdata')

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/freelancer');
        console.log("Connection with mongoose established");

        const user = new userData({
            name: 'Anav',
            email: 'random.random@hotmail.com',
            mobile: '9999999999',
            age: 99
        });

        await user.save();
        console.log("Value inserted");

    } catch(err) {
        console.error("Error:", err);
    }
}

main();