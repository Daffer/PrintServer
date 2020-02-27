//  Tools
const { spawn } = require('child_process');
const _ = require('lodash');
const fs = require('fs');
const config = require('./../../config/config');
const logger = require('log4js').getLogger('Scan');
const uuid = require('uuid/v4');

class Scanner {

    //==========================//
    //          PUBLIC          //
    //==========================//
    constructor(scannerName, settings) {
        this._name = scannerName;
        this._settings = _.cloneDeep(settings);
        logger.info(`[Scanner] => Create new Scanner: ${scannerName}`);
    }

    get settings() {
        return this._settings;
    }

    get name() {
        return this._name;
    }

    scan(userSettings) {
        userSettings = _checkSettings(userSettings);
        args = this._createCurrentSettings(userSettings);
        _scan(args);
        return;
    }


    //==========================//
    //          PRIVATE         //
    //==========================//

    _checkSettings(settings) {

    }

    _createCurrentSettings(settings) {
        let generalSettings = [];
        let value;
        for (let key in this._settings) {
            settings[key] !== undefined ? value = settings[key] : value = this._settings[key].default

            generalSettings.push(this._settings[key].arg + value);
        }

        return generalSettings;
    }

    _scan(scanParams) {
        let
    }
}

const list = [
    new Scanner('HP-380f', {
        format: {
            variables: ['jpeg'],
            default: 'jpeg',
            arg: '--format='
        },
        mode: {
            variables: ['Color', 'Lineart', 'Gray'],
            default: 'Color',
            arg: '--mode='
        },
        resolution: {
            variables: [75, 100, 150, 200, 300, 600, 1200, 2400],
            default: 300,
            arg: '--resolution='
        },
        contrast: {
            min: -127,
            max: 127,
            default: 0,
            arg: '--contrast '
        },
        brightness: {
            min: -127,
            max: 127,
            default: 0,
            arg: '--brightness '
        },
        quality: {
            min: 0,
            max: 100,
            default: 85,
            arg: '--jpeg-quality '
        },
        //  Top-left x
        l: {
            min: 0,
            max: 215.9,
            default: 0,
            arg: '-l '
        },
        //  Top-left y
        t: {
            min: 0,
            max: 296.926,
            default: 0,
            arg: '-t '
        },
        //  width
        x: {
            min: 0,
            max: 215.9,
            default: 215.9,
            arg: '-x '
        },
        //  height
        y: {
            min: 0,
            max: 296.926,
            default: 296.926,
            arg: '-y '
        }
    })
];

module.exports = {
    Scanner,
    scanners: list
};