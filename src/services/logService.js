import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

const init = () => {
    Sentry.init({
        dsn: "https://ef3f7aab52904fc8aaf619a7ef41dfc7@o1361282.ingest.sentry.io/6649872",
        integrations: [new BrowserTracing()],
        release: process.env.REACT_APP_NAME + "@" + process.env.REACT_APP_VERSION,

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
}

const log = (error) => {
    Sentry.captureException(error)
}

const exportObject = {
    init, log
}

export default exportObject;