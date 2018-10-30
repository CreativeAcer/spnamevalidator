"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Platform;
(function (Platform) {
    Platform[Platform["SharePoint 2013 - 2016"] = 0] = "SharePoint 2013 - 2016";
    Platform[Platform["SharePoint Online"] = 1] = "SharePoint Online";
})(Platform = exports.Platform || (exports.Platform = {}));
var ValidationType;
(function (ValidationType) {
    ValidationType[ValidationType["File - Folder"] = 0] = "File - Folder";
    ValidationType[ValidationType["ListName"] = 1] = "ListName";
    ValidationType[ValidationType["Site"] = 2] = "Site";
})(ValidationType = exports.ValidationType || (exports.ValidationType = {}));
var SPNameValidator = (function () {
    function SPNameValidator(platform) {
        this.charsetMerge = {
            'File - Folder': [],
            'ListName': [],
            'Site': []
        };
        this.wordMerge = {
            'File - Folder': [],
            'ListName': [],
            'Site': []
        };
        this.platform = platform;
        this.illegalCustomChars = [];
        this.illegalCustomWords = [];
    }
    SPNameValidator.prototype.checkName = function (name, type) {
        return this.ContainsIllegalCharOrWord(name, type, false, true);
    };
    SPNameValidator.prototype.checkCustomValue = function (name, type, includeSPIllegal) {
        if (includeSPIllegal === void 0) { includeSPIllegal = false; }
        return this.ContainsIllegalCharOrWord(name, type, true, includeSPIllegal);
    };
    SPNameValidator.prototype.setIllegalCharset = function (chars) {
        if (chars === void 0) { chars = []; }
        this.illegalCustomChars = chars;
        this.charsetMerge['File - Folder'] = this.merge(this.illegalCharList(ValidationType['File - Folder']), this.illegalCustomChars);
        this.charsetMerge.ListName = this.merge(this.illegalCharList(ValidationType['ListName']), this.illegalCustomChars);
        this.charsetMerge.Site = this.merge(this.illegalCharList(ValidationType['Site']), this.illegalCustomChars);
    };
    ;
    SPNameValidator.prototype.setIllegalWordset = function (words) {
        if (words === void 0) { words = []; }
        this.illegalCustomWords = words.map(function (x) { return x.toUpperCase(); });
        this.wordMerge['File - Folder'] = this.merge(this.illegalWordList(ValidationType['File - Folder']), this.illegalCustomWords);
        this.wordMerge.ListName = this.merge(this.illegalWordList(ValidationType['ListName']), this.illegalCustomWords);
        this.wordMerge.Site = this.merge(this.illegalWordList(ValidationType['Site']), this.illegalCustomWords);
    };
    ;
    SPNameValidator.prototype.ContainsIllegalCharOrWord = function (value, type, custom, includeDefault) {
        var charset = [];
        var wordset = [];
        if (custom && !includeDefault) {
            charset = this.illegalCustomChars;
            wordset = this.illegalCustomWords;
        }
        else if (custom && includeDefault) {
            if (type === ValidationType['File - Folder']) {
                charset = this.charsetMerge['File - Folder'];
                wordset = this.wordMerge['File - Folder'];
            }
            else if (type === ValidationType.ListName) {
                charset = this.charsetMerge['ListName'];
                wordset = this.wordMerge['ListName'];
            }
            else {
                charset = this.charsetMerge['Site'];
                wordset = this.wordMerge['Site'];
            }
        }
        else {
            charset = this.illegalCharList(type);
            wordset = this.illegalWordList(type);
        }
        var len = value ? value.length : 0;
        var valid = len >= 1 && len <= 128;
        if (valid)
            valid = (this.forbiddenStart(value, includeDefault) && this.forbiddenContain(value, charset) && this.forbiddenEnd(value, includeDefault) && this.forbiddenWord(value, wordset));
        return valid;
    };
    SPNameValidator.prototype.merge = function (a1, a2) {
        var hash = {};
        var arr = [];
        for (var i = 0; i < a1.length; i++) {
            if (hash[a1[i]] !== true) {
                hash[a1[i]] = true;
                arr[arr.length] = a1[i];
            }
        }
        for (var i = 0; i < a2.length; i++) {
            if (hash[a2[i]] !== true) {
                hash[a2[i]] = true;
                arr[arr.length] = a2[i];
            }
        }
        return arr;
    };
    SPNameValidator.prototype.forbiddenStart = function (value, includeDefault) {
        if (includeDefault) {
            var illegalEndings = [
                ' ',
                '_',
                '.'
            ];
            return !illegalEndings.find(function (el) {
                return value.startsWith(el);
            });
        }
        else {
            return true;
        }
    };
    SPNameValidator.prototype.forbiddenContain = function (value, charset) {
        return !charset.find(function (el) {
            return value.includes(el);
        });
    };
    SPNameValidator.prototype.forbiddenEnd = function (value, includeDefault) {
        if (includeDefault) {
            var illegalEndings = [
                '.files',
                '_files',
                '-Dateien',
                '_fichiers',
                '_bestanden',
                '_file',
                '_archivos',
                '-filer',
                '_tiedostot',
                '_pliki',
                '_soubory',
                '_elemei',
                '_ficheiros',
                '_arquivos',
                '_dosyalar',
                '_datoteke',
                '_fitxers',
                '_failid',
                '_fails',
                '_bylos',
                '_fajlovi',
                '_fitxategiak',
                '.'
            ];
            return !illegalEndings.find(function (el) {
                return value.endsWith(el);
            });
        }
        else {
            return true;
        }
    };
    SPNameValidator.prototype.forbiddenWord = function (value, wordset) {
        var returnValue;
        var findWord = wordset.indexOf(value.toUpperCase());
        switch (findWord) {
            case -1:
                returnValue = true;
                break;
            default:
                returnValue = wordset[findWord].length !== value.length ? true : false;
                break;
        }
        return returnValue;
    };
    SPNameValidator.prototype.illegalCharList = function (type) {
        var illegalCharacters = [];
        var illegal1316Char = ['~', '"', '#', '%', '&', '*', ':', '<', '>', '?', '/', '\\', '{', '|', '}', '.'];
        var illegalOnlineChar = ['~', '"', '*', ':', '<', '>', '?', '/', '\\', '|', '..'];
        switch (type) {
            case ValidationType['File - Folder']:
                illegalCharacters =
                    this.platform === Platform['SharePoint 2013 - 2016'] ? illegal1316Char : illegalOnlineChar;
                break;
            case ValidationType.ListName:
                illegalCharacters =
                    this.platform === Platform['SharePoint 2013 - 2016'] ? illegal1316Char : illegalOnlineChar;
                break;
            case ValidationType.Site:
                illegalCharacters =
                    this.platform === Platform['SharePoint 2013 - 2016'] ? illegal1316Char : illegalOnlineChar;
                break;
        }
        return illegalCharacters;
    };
    SPNameValidator.prototype.illegalWordList = function (type) {
        var illegalWords = [];
        var defaultIllegalWords = ['AUX', 'PRN', 'NUL', 'CON', 'COM0', 'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9', 'LPT0', 'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9', '_VTI_'];
        switch (type) {
            case ValidationType['File - Folder']:
                illegalWords = defaultIllegalWords;
                break;
            case ValidationType.ListName:
                illegalWords = defaultIllegalWords;
            case ValidationType.Site:
                illegalWords = defaultIllegalWords;
                break;
        }
        return illegalWords;
    };
    return SPNameValidator;
}());
exports.default = SPNameValidator;
//# sourceMappingURL=SPNameValidator.js.map