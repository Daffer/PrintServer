//==================================//
//            SCAN SETTINGS         //
//==================================//

class ScanSettingsHP {
    constructor() {
        this._mode = 'Color';
        this._resolution = 300;
        this._contrast = 0;
        this._brightness = 0;
        this._quality = 80;
        this._l = 0;
        this._t = 0;
        this._x = 215.9;
        this._y = 296.926;
    }

    //  Mode setter/getter
    set mode(smode) {
        if (scanSettingsHP.mode.includes(smode)) {
            this._mode = smode;
        }

        return this._mode;
    }

    get mode() {
        return this._mode;
    }

    //  Resolution setter/getter
    set resolution(dpi) {
        if (scanSettingsHP.resolution.includes(dpi)) {
            this._resolution = dpi;
        }

        return this._resolution;
    }

    get resolution() {
        return this._resolution;
    }

    //  contrast setter/getter
    set contrast(value) {
        return _checkRange.call(this, '_contrast', scanSettingsHP.contrast.min, scanSettingsHP.contrast.max, value);
    }

    get contrast() {
        return this._contrast;
    }

    //  brightness setter/getter
    set brightness(value) {
        return _checkRange.call(this, '_brightness', scanSettingsHP.brightness.min, scanSettingsHP.brightness.max, value);
    }

    get brightness() {
        return this._brightness;
    }

    //  quality setter/getter
    set quality(value) {
        return _checkRange.call(this, '_quality', scanSettingsHP.quality.min, scanSettingsHP.quality.max, value);
    }

    get quality() {
        return this._quality;
    }

    //  top-left x setter/getter
    set l(value) {
        return _checkRange.call(this, '_l', scanSettingsHP.l.min, scanSettingsHP.l.max, value);
    }

    get l() {
        return this._l;
    }

    //  top-left y setter/getter
    set t(value) {
        return _checkRange.call(this, '_t', scanSettingsHP.t.min, scanSettingsHP.t.max, value);
    }

    get t() {
        return this._t;
    }

    //  width
    set x(value) {
        return _checkRange.call(this, '_x', scanSettingsHP.x.min, scanSettingsHP.x.max, value);
    }

    get x() {
        return this._x;
    }

    //  height
    set y(value) {
        return _checkRange.call(this, '_y', scanSettingsHP.y.min, scanSettingsHP.y.max, value);
    }

    get y() {
        return this._y;
    }


    getCommand() {
        const scanApp = 'scanimage';
        let appOptions = [];
        //  fileformat
        appOptions.push('--format=jpeg');
        //  settings
        //  mode
        appOptions.push('--mode ' + this._mode);
        //  resolution
        appOptions.push('--resolution=' + this._resolution);
        //  contrast
        appOptions.push('--contrast ' + this._contrast);
        //  jpeg-quality
        appOptions.push('--jpeg-quality ' + this.quality);
        //  brightness
        appOptions.push('--brightness ' + this._brightness);
        //  left-top x
        appOptions.push('-l ' + this._l);
        //  left-top y
        appOptions.push('-t ' + this._t);
        //  width
        appOptions.push('-x ' + this._x);
        //  height
        appOptions.push('-y ' + this._y);
        return [scanApp, appOptions];
    }

    static async getAllOptions() {
        let options = {
            mode: {
                values: scanSettingsHP.mode,
                default: 'Color'
            },
            resolution: {
                values: scanSettingsHP.resolution,
                default: 300
            },
            contrast: {
                default: 0
            },
            brightness: {
                default: 0
            },
            quality: {
                default: 80
            },
            l: {
                default:0
            },
            t: {
                default: 0
            },
            x: {
                default: scanSettingsHP.x.max
            },
            y: {
                default: scanSettingsHP.y.max
            }
        };

        Object.assign(options.contrast, scanSettingsHP.contrast);
        Object.assign(options.brightness, scanSettingsHP.brightness);
        Object.assign(options.quality, scanSettingsHP.quality);
        Object.assign(options.l, scanSettingsHP.l);
        Object.assign(options.t, scanSettingsHP.t);
        Object.assign(options.x, scanSettingsHP.x);
        Object.assign(options.y, scanSettingsHP.y);

        return options;
    }
}

const scanSettingsHP = {
    mode: ['Color', 'Lineart', 'Gray'],
    resolution: [75, 100, 150, 200, 300, 600, 1200, 2400],
    contrast: {
        min: -127,
        max: 127
    },
    brightness: {
        min: -127,
        max: 127
    },
    quality: {
        min: 0,
        max: 100
    },
    //  Top-left x
    l: {
        min: 0,
        max: 215.9
    },
    //  Top-left y
    t: {
        min: 0,
        max: 296.926
    },
    //  width
    x: {
        min: 0,
        max: 215.9
    },
    //  height
    y: {
        min: 0,
        max: 296.926
    }
};

function _checkRange(name, min, max, value) {
    if (value >= min && value <= max) {
        this[name] = value;
    }

    return this[name];
}

module.exports = ScanSettingsHP;