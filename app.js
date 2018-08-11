'use strict';

const   Homey                   = require('homey'),
        speedTest               = require('speedtest-net');

class MyApp extends Homey.App {

    onInit() {
        this._interval = undefined;
        this._lastResult = undefined;

        this._speedtestCompletedTrigger = new Homey.FlowCardTrigger('speedtest_completed');
        this._speedtestCompletedTrigger.register();

        this._speedtestFailedTrigger = new Homey.FlowCardTrigger('speedtest_failed');
        this._speedtestFailedTrigger.register();

        this._speedtestAction = new Homey.FlowCardAction('run_speedtest');
        this._speedtestAction
            .register()
            .registerRunListener(this.runSpeedtest.bind(this));

        Homey.ManagerSettings.on('set', (key) => {
            this.log(`Setting "${key}" updated`);
            if (key === 'interval')
                this.configureInterval();
        });

        this.configureInterval();
        this.log('Speedtest is initialized');
    }

    configureInterval() {
        if (this._interval)
            clearInterval(this._interval);

        let interval = Homey.ManagerSettings.get('interval');
        if (Number.isNaN(interval) || interval <= 0) {
            this.log('Interval invalid or disabled ' + interval);
            return;
        }

        this.log(`Speedtest set to run every ${interval} minutes`);
        this._interval = setInterval(this.runSpeedtest.bind(this), interval * 60 * 1000);
    }

    runSpeedtest() {
        return new Promise((resolve, reject) => {
            this.log('Running speedtest...');
            const test = speedTest({maxTime: 5000});

            test.on('data', data => {
                let result = {
                    download: data.speeds.download.toFixed(2),
                    upload: data.speeds.upload.toFixed(2),
                    downloadDiff: 0,
                    uploadDiff: 0,
                    ping: data.server.ping.toFixed(2)
                };
                if (this._lastResult) {
                    if (this._lastResult.upload <= 0)
                        result.uploadDiff = 100;
                    else
                        result.uploadDiff = (100 * result.upload / this._lastResult.upload - 100).toFixed(2);

                    if (this._lastResult.download <= 0)
                        result.downloadDiff = 100;
                    else
                        result.downloadDiff = (100 * result.download / this._lastResult.download - 100).toFixed(2);
                }
                this._lastResult = result;
                this._speedtestCompletedTrigger.trigger(result).catch(this.error);

                this.log('Speedtest completed', result);
                resolve();
            });

            test.on('error', err => {
                this._speedtestFailedTrigger.trigger().catch(this.error);
                this.error('Speedtest failed', err);
                reject(err);
            });
        });
    }
}

module.exports = MyApp;
