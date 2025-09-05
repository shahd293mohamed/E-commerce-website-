const cors= require("cors");

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
const corsOptions={
origin:function(origin, callback) {//callback is a function that will be called with the origin of the request and a boolean as a parameter. The boolean will be true if the origin is allowed, and false if it is not.
    if(!origin) return callback(null,true)//shosho if no origin okay because it's server or postman like backend talk to me 
    if(allowedOrigins.includes(origin)){
        callback(null, true);
    }
    else{
        callback(new Error("Not allowed by CORS policy"));
    }
},
credentials: true,//like token authorization or cookie
methods: ['GET', 'POST', 'PUT', 'DELETE'],//in frontend can use these methods
allowedHeaders:['Content-Type' /*json*/, 'Authorization'],//in frontend can use these headers
}

module.exports= cors(corsOptions);

