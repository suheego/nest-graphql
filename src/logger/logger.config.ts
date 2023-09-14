import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

const elkTransport = new winston.transports.Http({
  host: 'logstash',
  port: 5044,
});

export const winstonConfig = {
  transports: [
    new winston.transports.Console({
      level: 'silly',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.printf((msg) => {
          return `${msg.timestamp} - ${msg.level}: ${msg.message}`;
        }),
        winston.format.errors({ stack: true }),
        nestWinstonModuleUtilities.format.nestLike('NestApp', {
          prettyPrint: true,
        }),
      ),
    }),
    elkTransport,
  ],
};
