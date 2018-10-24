export enum Platform {
  'SharePoint 2013 - 2016',
  'SharePoint Online',
}

export enum ValidationType {
  'File - Folder',
  'ListName'
}

interface ISPNameValidator {
  checkName(name: string, type: ValidationType): boolean;
  checkCustomValue(name: string, type: ValidationType, includeSPIllegal: boolean): boolean;
}

interface MergedData {
  'File - Folder': string[];
  'ListName': string [];
}

export default class SPNameValidator implements ISPNameValidator {
  private platform: Platform;
  private illegalCustomChars: string[];
  private illegalCustomWords: string[];

  private charsetMerge: MergedData = {
    'File - Folder': [],
    'ListName': []
  }
  
  private wordMerge: MergedData = {
    'File - Folder': [],
    'ListName': []
  }

  constructor(platform: Platform) {
    this.platform = platform;
    this.illegalCustomChars = [];
    this.illegalCustomWords = [];
  }

  public checkName(name: string, type: ValidationType): boolean {
    return this.ContainsIllegalCharOrWord(name, type, false, true);
  }

  public checkCustomValue(name: string, type: ValidationType, includeSPIllegal: boolean = false): boolean {
    return this.ContainsIllegalCharOrWord(name, type, true, includeSPIllegal);
  }

  // pre merge default with custom for performance
  public setIllegalCharset(chars: string[] = []): void {
    this.illegalCustomChars = chars;
    this.charsetMerge['File - Folder'] = this.merge(this.illegalCharList(ValidationType['File - Folder']), this.illegalCustomChars);
    this.charsetMerge.ListName = this.merge(this.illegalCharList(ValidationType['ListName']), this.illegalCustomChars);
  };
  public setIllegalWordset(words: string[] = []): void {
    this.illegalCustomWords = words.map((x) => x.toUpperCase());
    this.wordMerge['File - Folder'] = this.merge(this.illegalWordList(ValidationType['File - Folder']), this.illegalCustomWords);
    this.wordMerge.ListName = this.merge(this.illegalWordList(ValidationType['ListName']), this.illegalCustomWords);
  };

  private ContainsIllegalCharOrWord(
    value: string,
    type: ValidationType,
    custom: boolean,
    includeDefault: boolean,
  ): boolean {
    let charset: string[] = [];
    let wordset: string[] = [];

    if(custom && !includeDefault){
      charset = this.illegalCustomChars;
      wordset = this.illegalCustomWords;
    }else if(custom && includeDefault){
      // using pre merged arrays for performance reasons
      // We dont want to merge them each time we check a value
      if(type === ValidationType["File - Folder"]){
        charset = this.charsetMerge['File - Folder'];
        wordset = this.wordMerge['File - Folder'];
      }else{
        charset = this.charsetMerge['ListName'];
        wordset = this.wordMerge['ListName'];
      }
    }else {
      //  not custom
      charset = this.illegalCharList(type);
      wordset = this.illegalWordList(type);
    }

    // Going from simple check to more demanding
    const len: number = value ? value.length : 0;
    // can not be more then 128 char
    let valid: boolean = len >= 1 && len <= 128;

    // value can not start or end or contain certain reserved characters
    if(valid){
      valid = this.forbiddenStart(value, includeDefault);
      if(valid){
        valid = this.forbiddenContain(value, charset);
        if(valid){
          valid = this.forbiddenEnd(value, includeDefault);
          if(valid){
            let findWord = wordset.indexOf(value.toUpperCase());
            switch (findWord) {
              case -1:
                valid = true;
                break;
              default:
                valid = wordset[findWord].length !== value.length ? true : false;
                break;
            }
          }
        }
      }
    }
    return valid;
  }

  private merge(a1: string[], a2: string[]) {
    let hash: any = {};
    let arr: string[] = [];
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
 }

  private forbiddenStart(value: string, includeDefault: boolean): boolean {
    // when not using default illegal characters skip this check
    if(includeDefault){
      const illegalEndings: string[] = [
        ' ',
        '_',
        '.'
      ];
  
      return !!!illegalEndings.find(function(el){
        return value.startsWith(el);
      });
    }else {
      return true
    }
    
  }
  private forbiddenContain(value: string, charset: string[]): boolean {
    return !!!charset.find(function(el){
      return value.includes(el);
    });
  }
  private forbiddenEnd(value: string, includeDefault: boolean): boolean {
    // when not using default illegal characters skip this check
    if(includeDefault){
      const illegalEndings: string[] = [
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
  
      return !!!illegalEndings.find(function(el){
        return value.endsWith(el);
      });
    }else {
      return true
    }
    
  }

  private illegalCharList(type: ValidationType): string[] {
    let illegalCharacters: string[] = [];

    switch (type) {
      case ValidationType['File - Folder']:
        illegalCharacters =
          this.platform === Platform['SharePoint 2013 - 2016'] ?
          [
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
          ] :
          ['~', '"', '*', ':', '<', '>', '?', '/', '\\', '|', '..'];
        break;
      case ValidationType.ListName:
        illegalCharacters =
          this.platform === Platform['SharePoint 2013 - 2016'] ?
          [
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
          ] :
          ['~', '"', '*', ':', '<', '>', '?', '/', '\\', '|', '..'];
        break;
    }
    return illegalCharacters;
  }

  private illegalWordList(type: ValidationType): string[] {
    let illegalWords: string[] = [];

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
          '_VTI_'
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
          '_VTI_'
        ];
        break;
    }
    return illegalWords;
  }
}