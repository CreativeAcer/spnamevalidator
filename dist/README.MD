## SPNameValidator

This validator will help you validate names for SharePoint 2013/2016 or SharePoint Online.
The validation can be used for Lib/list names and file names.

The purpose of this library is to check field inputs by users.
For example if a form is used to create a new list / listItem / ... this code will check if the input is valid for the selected sharepoint version.

### Instalation
```bash
    npm i @creativeacer/spnamevalidator
```


### Usage

include the libary
```bash
    import SPNameValidator, { Platform, ValidationType } from '@creativeacer/spnamevalidator/SPNameValidator';
```

#### Standard SharePoint illegal char and word list

choose your SharePoint version
```bash
    let spNameValidator = new SPNameValidator(Platform["SharePoint 2013 - 2016"]);
    or
    let spNameValidator = new SPNameValidator(Platform["SharePoint Online"]);
```
#### Using checkName function!
perform a check on a name / entry 
```bash
    this.spNameValidator.checkName(string, ValidationType["File - Folder"]);
    or
    this.spNameValidator.checkName(string, ValidationType["ListName"]);
```

When the string is valid true will be returned.

#### Custom illegal char and word list

If you would like to use a custom character or wordset you can do this by setting the desired illegal characters or words:
```bash

    let customSPNameValidator = new SPNameValidator(Platform["SharePoint 2013 - 2016"]);
    or
    let customSPNameValidator = new SPNameValidator(Platform["SharePoint Online"]);

    // Set the characters and words
    this.customSPNameValidator.setIllegalCharset(['a', '#', '7']);
    this.customSPNameValidator.setIllegalWordset(['One', 'Work', 'Just']);
```
Characters are Case sensitive!
during validation: w !== W
words will be transformerd to uppercase
during validation: Word === WORD

#### Using checkCustomValue function!
```bash
    this.spNameValidator.checkCustomValue(string);
```


When the string is valid true will be returned.


Happy coding!

