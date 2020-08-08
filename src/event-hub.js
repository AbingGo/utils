const EventHub = {
    mix(d, src, m) {
        const des = d;
        let map = m;

        if (typeof des !== 'object') {
            return des;
        }

        map = map || function (d, s, i) {
            // 这里要加一个des[i]，是因为要照顾一些不可枚举的属性
            if (!(des[i] || (i in des))) {
                return s;
            }

            return d;
        };

        if (map === true) {
            map = function (d, s) {
                return s;
            };
        }

        const keys = Object.keys(src);

        keys.forEach((i) => {
            des[i] = map(des[i], src[i], i);

            // 如果返回undefined，尝试删掉这个属性
            if (des[i] === undefined) {
                delete des[i];
            }
        });

        return des;
    },
    createEvents(obj) {
        const events = {};
        EventHub.mix(obj, {
            on(evtType, handler) {
                events[evtType] = events[evtType] || [];
                events[evtType].push(handler);

                return obj;
            },
            fire(evtType, opts = {}) {
                const args = opts;

                EventHub.mix(args, {
                    type: evtType,
                    target: obj,
                    preventDefault() {
                        args.returnValue = false;
                    }
                });
                const handlers = events[evtType] || [];

                handlers.forEach((handler) => {
                    handler(args);
                });

                return args.returnValue !== false;
            }
        });

        return obj;
    }
};

// 注册自定义事件到EventHub.events
EventHub.events = EventHub.events || {};

export default EventHub;
