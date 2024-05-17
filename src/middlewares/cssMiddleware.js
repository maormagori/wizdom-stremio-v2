const cssMiddleware = (req, res, next) => {
    res.setHeader("Content-Type", "text/html");

    next();
};


export default cssMiddleware;