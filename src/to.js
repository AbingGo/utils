// 方便解决异常
const to = promise => promise
    .then(data => [null, data])
    .catch(err => [err]);

export default to;
