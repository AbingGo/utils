import EventHub from './event-hub';

export default class CountDown {
    constructor(opts) {
        this.opts = opts;

        this.eventHub = EventHub.createEvents(this);
        this.init();
        this.run();
    }

    init() {
        const { date } = this.opts;
        const timestamp = this.getTimestamp(date);

        this.timestamp = timestamp;
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

    update(opts = {}) {
        this.opts = { ...this.opts, ...opts }

        this.cancel();
        this.init();
        this.run();
    }

    async run() {
        const now = await this.getCurrentTime();
        const dur = this.timestamp - now;
        const self = this;
        const start = Date.now();

        if (dur <= 0) {
            this.emitEnd();

            return;
        }

        this.emitStart();

        let count = 0;
        this.reqAniFrame = requestAnimationFrame(function step() {
            const difference = Date.now() - start;
            const p = difference / dur;

            if (p < 1) {
                const isRun = Math.ceil(difference / 1000) > count;
                if (isRun) {
                    count += 1;
                    const data = self.getDateObj(dur - difference);
                    self.emitRun(data);
                }
                self.reqAniFrame = requestAnimationFrame(step);
            } else {
                self.emitEnd();
            }
        });
    }

    /**
     * 获取当前时间戳
     * @returns 
     */
    async getCurrentTime() {
        const { currentTime } = this.opts;

        // 没传当前日期，默认使用Date.now()
        if (!currentTime) {
            return Date.now();
        }

        // 传了字符串类型，尝试转成时间戳
        if (typeof currentTime === 'string') {
            return this.getTimestamp(currentTime);
        }

        // 如果为函数，则使用其返回值
        if (typeof currentTime === 'function') {
            const time = await currentTime();

            return time;
        }

        return currentTime;
    }

    getTimestamp(timeStr) {
        if (typeof strtimeStr === 'number') {
            return timeStr;
        }

        const android = timeStr.replace(/-/g, '/');
        const ios = timeStr.replace(/\//g, '-');

        return new Date(android).getTime() || new Date(ios).getTime();
    }

    formatStr(str) {
        return str.toString().padStart(2, '0');
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
            hour: this.formatStr(hour),
            minute: this.formatStr(minute),
            second: this.formatStr(second)
        };
    }
};
