const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        const message = statusCode === 500 ? "Internal server error" : error.message;
        res.status(statusCode).json({
            status: statusCode,
            success: false,
            message,
        });
    }
};

// const asyncHandler = async (requestHandler) => {
//     return (req, res, next) => {
//         Promise.resolve(requestHandler(req, res, next)).catch((err) =>
//             next(err)
//         );
//     };
// };
export { asyncHandler };
