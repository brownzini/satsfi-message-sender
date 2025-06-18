import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

const limiter = (time:number, maxReq:number) => {
    return rateLimit({
        windowMs: time * 60 * 1000,
        max: maxReq,
        headers: true,
        keyGenerator(req: Request): string {
            return req.ip
        },
        handler(_, res: Response): void {
            res.status(429).json({ code: 429, message: "Too many requests" }).send();
        }
    });
}

export default limiter;