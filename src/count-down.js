import { EventHub } from './event-hub';

export default class CountDown {
    constructor(opts) {
        this.opts = opts;
        this.dur = 0;

        this.eventHub = EventHub.createEvents(this);
        this.initdur();
    }

    async initdur() {
        const { date } = this.opts;
        const timestamp = this.getTimeStamp(date);
        const now = await this.getServerTime();

        this.dur = timestamp - now;
        this.timestamp = timestamp;
        this.run(this.dur);
    }

    getDateObj(dur) {
        const ss = 1000;
        const mi = ss * 60;
        const hh = mi * 60;
        const dd = hh * 24;

        const day = Math.max(parseInt(dur / dd, 10), 0);
        const hour = Math.max(parseInt((dur - (day * dd)) / hh, 10), 0);
        const minute = Math.max(parseInt((dur - (day * dd) - (hour * hh)) / mi, 10), 0);
        const second = Math.max(parseInt((dur - (day * dd) - (hour * hh) - (minute * mi)) / ss, 10), 0);

        return {
            day,
            hour: hour.toString().padStart(2, '0'),
            minute: minute.toString().padStart(2, '0'),
            second: second.toString().padStart(2, '0'),
        };
    }

    run(dur) {
        const self = this;
        const start = Date.now();
        let count = 0;

        if (dur <= 0) {
            this.emitEnd();

            return;
        }

        this.emitStart();

        this.reqAniFrame = requestAnimationFrame(function step() {
            const time = Date.now() - start;
            const p = time / dur;

            if (p < 1) {
                const isRun = Math.ceil(time / 1000) > count;
                if (isRun) {
                    count += 1;
                    const data = self.getDateObj(dur - (Date.now() - start));
                    self.emitRun(data);
                }
                self.reqAniFrame = requestAnimationFrame(step);
            } else {
                self.emitEnd();
            }
        });
    }

    emitRun(data) {
        this.eventHub.fire('run', data);
    }

    emitStart() {
        this.eventHub.fire('start', this.opts);
    }

    emitEnd() {
        this.eventHub.fire('end', this.opts);
    }

    cancel() {
        cancelAnimationFrame(this.reqAniFrame);
    }

    async getServerTime() {
        return 12233333333; //服务端接口
    }

    getTimeStamp(str) {
        const android = str.replace(/-/g, '/');
        const ios = str.replace(/\//g, '-');

        return Date.parse(android) || Date.parse(ios);
    }
};
