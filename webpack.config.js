module.exports={
    entry:'./node_modules/mqtt/mqtt.js',
    output:{
        path: __dirname + 'routes',
        filename:'browserMQTT.js'
    },

    module: {
        rules:[
            {
                use:'babel-loader',
                test:/\.js$/,
                exclude: /node_modules/,

            },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }

};