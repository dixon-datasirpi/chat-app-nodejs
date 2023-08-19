const mongoose = require('mongoose');

module.exports = {
    mongoose,
    connect: async (database) => {
        try {
            mongoose.connect(database, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            });
        } catch (err) {
            console.error('Error to connect on mongo', err);
        }
    },
    diconnect: async () => mongoose.connection.close(),
};
