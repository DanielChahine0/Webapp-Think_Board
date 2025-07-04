// Import the pre-configured Upstash Ratelimit instance.
import ratelimit from "../config/upstash.js";

/**
 * Express middleware that rate-limits requests.
 *
 * Strategy:
 *   – Consume one token from a bucket (keyed below).
 *   – If the bucket is empty, immediately return HTTP 429.
 *   – Otherwise, continue down the middleware chain.
 *
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit("my-limit-key");
        

        if (!success){
            return res.status(429).json({message:"Too many requests, please try again later !!!"});
        }

        // hand control to the next middleware/route handler.
        next();
    } catch (error) {
        console.log("Rate Limit Error", error);
        next(error); // pass to Express error handler
    }
};

export default rateLimiter;