// Copyright (C) 2019, Zpalmtree
// Copyright (c) 2020, The PengolinCoin Developers
//
// Please see the included LICENSE file for more information.

import * as Sentry from '@sentry/react-native';

import * as _ from 'lodash';

import Config from './Config';

/* Manually comparing to TurtleCoin to try and prevent getting errors reported
   for forks... */
/* DO NOT CHANGE THIS LINE WITHOUT ALSO ALTERING THE Sentry.config() LINE - See readme and sentry docs. */
const sentryIsEnabled = !__DEV__ && Config.coinName === 'FTSCoin';

export function reportCaughtException(err) {
    /* Sentry doesn't properly report arbitrary objects. Convert to string if
       it ain't a string or an error. */
    if (!_.isString(err) && !(err instanceof Error)) {
        err = JSON.stringify(err, null, 4);
    }

    if (sentryIsEnabled) {
        try {
            Sentry.captureException(err);
        } catch (e) {
        }
    }
}

export function initSentry() {
    if (sentryIsEnabled) {
        /* CHANGE THIS IF YOU ARE FORKING! */
        Sentry.init({
          dsn: 'https://17825ccf8de945fa9e38b496336d1044@o377460.ingest.sentry.io/5293613',
        });

        Sentry.setRelease('com.ftswallet-' + Config.appVersion);
    }
}
