// 서버에 로그를 남김니다.
// winston을 이용하면 한번의 설정으로 좀 더 보기 좋고 효율적인 로그를 사용할 수 있으며
// 화면 출력만이 아니라 파일로 로그를 보관 관리도 할 수 있게 됩니다.
import { createLogger, format, transports } from 'winston';
const { colorize, combine, timestamp, printf } = format;
// 로그파일을 관리해주는 모듈 기본적으로 하루 단위로 새 로그 파일을 생성해주고,
// 로그 파일의 최대 크기와 최대 저장 파일 개수 등을 설정할 수 있습니다.
const winstonDaily = require('winston-daily-rotate-file');

const logDir = 'logs'; // logs 디렉토리에 로그 파일 저장.
// 로그 포멧 지정.
const logFormat = printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`);

const logger = createLogger({
  transports: [
    // info 레벨 로그를 저장할 파일 설정
    // { emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7 }
    new winstonDaily({
      level: 'error',
      name: 'error-file',
      dirname: logDir,
      filename: 'error.log',
      datePattern: 'yyyy-MM-dd.log',
      json: false, // 로그형태를 json으로도 뽑을 수 있다.
      prepend: true,
      format: combine(timestamp(), logFormat),
    }),

    new winstonDaily({
      name: 'combined-file',
      dirname: logDir,
      filename: 'combined.log',
      datePattern: 'yyyy-MM-dd.log',
      json: false,
      prepend: true,
      format: combine(timestamp(), logFormat),
    }),
  ],
});

// 개발 시 console로도 출력
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      level: 'debug',
      handleExceptions: true, // Exception 발생 시 로그에 기록
      format: combine(colorize(), timestamp(), logFormat), // 색깔 넣어서 출력
    })
  );
}

// express에서 logger.stream 호출 시 표시하는 형태
class LoggerStream {
  write(message: string): void {
    logger.info(message.replace(/\n$/, '')); // 모건이 \n 으로 끝내는 나쁜 습관을 가지고 있으므로 윈스턴에
  }
}

export { LoggerStream };
export default logger;
