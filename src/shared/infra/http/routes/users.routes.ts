//Middleware
import { Router } from "express";
import limiter from "../../../../shared/infra/middleware/rateLimit";

const usersRoutes = Router();

usersRoutes.get("/ping", limiter(1, 5), async (req, res) => {
  return res.status(200).json({
    msg: "pong",
  });
});

export { usersRoutes };
