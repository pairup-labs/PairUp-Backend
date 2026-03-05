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
    const statusCode = err.statusCode || 500;
    let message = err.message || "Internal server error.";

    // Handle invalid Mongo ObjectId
    if (err.name === "CastError") {
        message = `Invalid ${err.path}`;
        err = new ApiError(400, message);
    }

    // Duplicate field error 11000
    if (err.code === 11000) {
        message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ApiError(400, message);
    }

    // JWT errors
    if (err.name === "JsonWebTokenError") {
        err = new ApiError(400, "Invalid JSON Web Token");
    }

    if (err.name === "TokenExpiredError") {
        err = new ApiError(400, "JSON Web Token expired");
    }

    return res.status(statusCode).json({
        statusCode,
        success: false,
        message: err.message,
        errors: err.errors || [],
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};

export { ApiError };
