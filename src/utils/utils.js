const seperator = "|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|#|";

const logColors = {
    reset: "\x1b[0m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    red: "\x1b[31m",
    magenta: "\x1b[35m",
};

export const logWarn = (data) => {
    console.log(`${logColors.yellow}${seperator} START ${seperator}${logColors.reset}`);
    console.trace();
    console.info(`${logColors.yellow}[WARN] : ${JSON.stringify(data, null, 2)}${logColors.reset}`);
    console.log(`${logColors.yellow}${seperator} END ${seperator}${logColors.reset}\n\n`);
};

export const logInfo = (data) => {
    console.log(`${logColors.blue}${seperator} START ${seperator}${logColors.reset}`);
    console.trace();
    console.info(`${logColors.blue}[INFO] : ${JSON.stringify(data, null, 2)}${logColors.reset}`);
    console.log(`${logColors.blue}${seperator} END ${seperator}${logColors.reset}\n\n`);
};

export const logErr = (data) => {
    console.log(`${logColors.red}${seperator} START ${seperator}${logColors.reset}`);
    console.trace();
    console.log(`${logColors.red}[ERROR] : ${JSON.stringify(data, null, 2)}${logColors.reset}`);
    console.log(`${logColors.red}${seperator} END ${seperator}${logColors.reset}\n\n`);
};
