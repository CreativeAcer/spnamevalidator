"use strict";
// import { Platform, ValidationType } from './enums/enums';
// import { ISPNameValidator } from './interfaces/ISPNameValidator';
exports.__esModule = true;
var Platform;
(function (Platform) {
    Platform[Platform["SharePoint 2013 - 2016"] = 0] = "SharePoint 2013 - 2016";
    Platform[Platform["SharePoint Online"] = 1] = "SharePoint Online";
})(Platform = exports.Platform || (exports.Platform = {}));
var ValidationType;
(function (ValidationType) {
    ValidationType[ValidationType["File - Folder"] = 0] = "File - Folder";
    ValidationType[ValidationType["ListName"] = 1] = "ListName";
    ValidationType[ValidationType["Custom"] = 2] = "Custom";
})(ValidationType = exports.ValidationType || (exports.ValidationType = {}));
var SPNameValidator = /** @class */ (function () {
    function SPNameValidator(platform) {
        this.illegalCustomChars = [];
        this.illegalCustomWords = [];
        this.platform = platform;
    }
    SPNameValidator.prototype.checkName = function (name, type) {
        return this.ContainsIllegalCharOrWord(name, type);
    };
    SPNameValidator.prototype.checkCustomValue = function (name) {
        return this.ContainsIllegalCharOrWord(name, ValidationType.Custom);
    };
    SPNameValidator.prototype.setIllegalCharset = function (chars) {
        if (chars === void 0) { chars = []; }
        this.illegalCustomChars = chars;
    };
    ;
    SPNameValidator.prototype.setIllegalWordset = function (words) {
        if (words === void 0) { words = []; }
        this.illegalCustomWords = words;
    };
    ;
    SPNameValidator.prototype.ContainsIllegalCharOrWord = function (value, type) {
        var len = value ? value.length : 0;
        var matches = len >= 1 && len <= 254 && !value.startsWith(' ');
        var charset = this.illegalCharList(type);
        var wordset = this.illegalWordList(type);
        if (matches) {
            for (var i = 0; i < len; i++) {
                matches = this.MatchASCII(charset, value[i]);
                if (!matches) {
                    return false;
                }
            }
            if (matches) {
                var findWord = wordset.indexOf(value.toUpperCase());
                switch (findWord) {
                    case -1:
                        matches = true;
                        break;
                    default:
                        matches = wordset[findWord].length !== value.length ? true : false;
                        break;
                }
            }
        }
        return matches;
    };
    SPNameValidator.prototype.MatchASCII = function (charset, char) {
        var match = true;
        if (match) {
            match = charset.indexOf(char) === -1;
            if (!match) {
                return false;
            }
        }
        return match;
    };
    SPNameValidator.prototype.illegalCharList = function (type) {
        var illegalCharacters = [];
        switch (type) {
            case ValidationType['File - Folder']:
                illegalCharacters =
                    this.platform === Platform['SharePoint 2013 - 2016']
                        ? [
                            '~',
                            '"',
                            '#',
                            '%',
                            '&',
                            '*',
                            ':',
                            '<',
                            '>',
                            '?',
                            '/',
                            '\\',
                            '{',
                            '|',
                            '}',
                            '.',
                        ]
                        : ['~', '"', '*', ':', '<', '>', '?', '/', '\\', '|'];
                break;
            case ValidationType.ListName:
                illegalCharacters =
                    this.platform === Platform['SharePoint 2013 - 2016']
                        ? [
                            '~',
                            '"',
                            '#',
                            '%',
                            '&',
                            '*',
                            ':',
                            '<',
                            '>',
                            '?',
                            '/',
                            '\\',
                            '{',
                            '|',
                            '}',
                            '.',
                        ]
                        : ['~', '"', '*', ':', '<', '>', '?', '/', '\\', '|'];
                break;
            case ValidationType.Custom:
                illegalCharacters = this.illegalCustomChars;
                break;
        }
        return illegalCharacters;
    };
    SPNameValidator.prototype.illegalWordList = function (type) {
        var illegalWords = [];
        switch (type) {
            case ValidationType['File - Folder']:
                illegalWords = [
                    'AUX',
                    'PRN',
                    'NUL',
                    'CON',
                    'COM0',
                    'COM1',
                    'COM2',
                    'COM3',
                    'COM4',
                    'COM5',
                    'COM6',
                    'COM7',
                    'COM8',
                    'COM9',
                    'LPT0',
                    'LPT1',
                    'LPT2',
                    'LPT3',
                    'LPT4',
                    'LPT5',
                    'LPT6',
                    'LPT7',
                    'LPT8',
                    'LPT9',
                ];
                break;
            case ValidationType.ListName:
                illegalWords = [
                    'AUX',
                    'PRN',
                    'NUL',
                    'CON',
                    'COM0',
                    'COM1',
                    'COM2',
                    'COM3',
                    'COM4',
                    'COM5',
                    'COM6',
                    'COM7',
                    'COM8',
                    'COM9',
                    'LPT0',
                    'LPT1',
                    'LPT2',
                    'LPT3',
                    'LPT4',
                    'LPT5',
                    'LPT6',
                    'LPT7',
                    'LPT8',
                    'LPT9',
                ];
                break;
            case ValidationType.Custom:
                illegalWords = this.illegalCustomWords;
                break;
        }
        return illegalWords;
    };
    return SPNameValidator;
}());
exports["default"] = SPNameValidator;
