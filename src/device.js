export default {
    ua() {
        return window.navigator.userAgent.toLowerCase();
    },
    isIphone() {
        return /iphone/.test(this.ua());
    },
    isHuawei() {
        return /huawei/.test(this.ua());
    },
    isHonor() {
        return /honor/.test(this.ua());
    },
    isOppo() {
        return /oppo/.test(this.ua());
    },
    isOppoR15() {
        return /pacm00/.test(this.ua());
    },
    isVivo() {
        return /vivo/.test(this.ua());
    },
    isXiaomi() {
        return /mi\s/.test(this.ua());
    },
    isXiaomi2s() {
        return /mix\s/.test(this.ua());
    },
    isRedmi() {
        return /redmi/.test(this.ua());
    },
    isSamsung() {
        return /sm-/.test(this.ua());
    }
};
