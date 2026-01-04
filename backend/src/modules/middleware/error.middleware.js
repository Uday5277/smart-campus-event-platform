const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    //  Log the error for the developer (Internal)
    console.error(`[Error] ${err.message}`);
    if (process.env.NODE_ENV !== 'production') {
        console.error(err.stack); // Only show detailed path in development
    }

    // Send clean JSON response (External)
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        //  Avoid leaking internals in production
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export default errorHandler;