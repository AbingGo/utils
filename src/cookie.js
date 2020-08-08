import { isArray } from './types';

const cookie = {
    set(name, val, opts = {}) {
        const options = opts;
        let value = val;

        if (value === null) {
            value = '';
            options.expires = -1;
        }

        let expires = '';

        if (options.expires && (typeof options.expires === 'number' || options.expires.toUTCString)) {
            let date;

            if (typeof options.expires === 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = `; expires=${date.toUTCString()}`;
        }

        options.path = options.path || '/';
        options.domain = options.domain || location.hostname;

        const path = `; path=${options.path}`;
        const domain = `; domain=${options.domain}`;
        const secure = options.secure ? '; secure' : '';

        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    },

    get(name) {
        const cookies = document.cookie ? document.cookie.split('; ') : [];
        const len = cookies.length;

        let ret = name ? '' : Object.create(null);

        for (let i = 0; i < len; i++) {
            const [key, value] = cookies[i].split('=');

            if (key === name) {
                ret = value;
                break;
            }

            if (!name) {
                ret[key] = value;
            }
        }

        return ret;
    },

    del(val, options) {
        if (isArray(val)) {
            val.forEach((item) => {
                this.set(item, null, options);
            });
        } else {
            this.set(val, null, options);
        }
    }
};


export default cookie;
