"use strict";

const CronJob = require('cron').CronJob;
const exec = require("child_process").exec;

const powerball = exec('curl -vk http://www.powerball.com/powerball/winnums-text.txt',
    (error, stdout, stderr) => {
        console.log(stdout);
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
    });

const job = new CronJob({
    cronTime: '00 30 11 * * 1-5',
    onTick: () => {
        /*
         * Runs every weekday (Monday through Friday)
         * at 11:30:00 AM. It does not run on Saturday
         * or Sunday.
         */

        exec('curl -vk http://www.powerball.com/powerball/winnums-text.txt',
            (error, stdout, stderr) => {
                console.log(stdout);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
            });
    },
    start: true,
    timeZone: 'America/Chicago'
});
job.start();
