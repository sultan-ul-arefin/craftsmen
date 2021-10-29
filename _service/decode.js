module.exports = decode_base64;

function decode_base64(s) {
    var b = l = 0, r = '',
        m = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    s.split('').forEach(function (v) {
        b = (b << 6) + m.indexOf(v); l += 6;
        if (l >= 8) r += String.fromCharCode((b >>> (l -= 8)) & 0xff);
    });
    return r;
}