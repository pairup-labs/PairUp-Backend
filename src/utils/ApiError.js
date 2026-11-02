class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        error = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.error = error;
        this.name = "ApiError";

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export const errorMiddleware = (err, req, res, next) => {
    void req;
    void next;
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal server error.";

    // Handle invalid Mongo ObjectId
    if (err.name === "CastError") {
        message = `Invalid ${err.path}`;
        err = new ApiError(400, message);
        statusCode = 400;
    }

    // Duplicate field error 11000
    if (err.code === 11000) {
        message = `Duplicate ${Object.keys(err.keyValue || {})} entered`;
        err = new ApiError(400, message);
        statusCode = 400;
    }

    // JWT errors
    if (err.name === "JsonWebTokenError") {
        err = new ApiError(401, "Invalid JSON Web Token");
        statusCode = 401;
    }

    if (err.name === "TokenExpiredError") {
        err = new ApiError(401, "JSON Web Token expired");
        statusCode = 401;
    }

    return res.status(statusCode).json({
        statusCode,
        success: false,
        message: err.message || message,
        errors: err.errors || err.error || [],
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};

export { ApiError };
