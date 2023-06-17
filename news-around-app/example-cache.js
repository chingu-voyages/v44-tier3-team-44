// below is an example of caching using a file to store and the file to be loaded when app rerenders to avoid more api requests 

const NodeCache = require('node-cache');
const fs = require("fs");

const cache = new NodeCache({ stdTTL: 3600 });

if (process.env.NODE_ENV == "development") {
    const initialData = JSON.parse(fs.readFileSync("./storage.json"));
    cache.mset(initialData)

    cache.on("set", () => {

        const data = Object.keys(cache.data).map(k => {
            return {
                key: k,
                value: cache.data[k].v,
                ttl: 3600
            }
        })
        // console.log(cache.data)
        fs.writeFileSync("./storage.json", JSON.stringify(data))
    });
}

console.log("data at the beginning", cache.data)


cache.set(1, "value1")
cache.set(2, "value2")
cache.set(3, "value2")

// console.log("second", cache.get(cacheKey))
