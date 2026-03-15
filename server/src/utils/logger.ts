import winston from "winston"

const { timestamp, printf, combine, colorize, errors } = winston.format;

const consoleFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
    const metaString = Object.keys(meta).length ? JSON.stringify(meta) : "";

    return stack
        ? `[${timestamp}] ${level}: ${stack} ${metaString}`
        : `[${timestamp}] ${level}: ${message} ${metaString}`;
});

export const logger = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.Console({
            format: combine(
                colorize(),
                timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                errors({ stack: true }),
                consoleFormat
            ),
        }),

        new winston.transports.File({
            filename: "logs/app.log",
            format: combine(
                timestamp(),
                errors({ stack: true }),
                winston.format.json()
            ),
        }),
    ]
});