## SPNameValidator  ![](https://img.shields.io/badge/Build-passing-brightgreen.svg)  ![](https://img.shields.io/badge/coverage-98%25-brightgreen.svg) [![CodeFactor](https://www.codefactor.io/repository/github/creativeacer/spnamevalidator/badge/master)](https://www.codefactor.io/repository/github/creativeacer/spnamevalidator/overview/master)

This validator will help you validate names for SharePoint 2013/2016 or SharePoint Online.  
The validation can be used for Lib/list names and file names.  

The purpose of this library is to check field inputs by users.  
For example if a form is used to create a new list / listItem / ... this code will check if the input is valid for the selected sharepoint version.

DEFAULT - The validator uses the characters and words defined by microsoft as being illegal for both File - Folder - Library - List   
[![Donate](https://img.shields.io/badge/Microsoft-Link-blue.svg)](https://support.office.com/en-us/article/Invalid-file-names-and-file-types-in-OneDrive-OneDrive-for-Business-and-SharePoint-64883a5d-228e-48f5-b3d2-eb39e07630fa)

CUSTOM - Next to those you also have the option to set custom characters and words.  

BOTH - You als ohave the option to validate the input on both custom and default characters and words.  

I will refer to DEFAULT - CUSTOM - BOTH in the instructions  

#### Donations
If you would like to donate anything, you can always use the following link. Much appreciated! ;)

[![Donate](https://img.shields.io/badge/Donate-paypal-green.svg)](https://paypal.me/creativeacer)


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
DEFAULT 
```bash
    this.spNameValidator.checkName(string, ValidationType["File - Folder"]);
    or
    this.spNameValidator.checkName(string, ValidationType["ListName"]);
```
This check will use the Default microsoft characters and words
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
CUSTOM
without the default microsoft defined char and words
```bash
    this.spNameValidator.checkCustomValue(string, ValidationType["File - Folder"]);
    or
    this.spNameValidator.checkCustomValue(string, ValidationType["ListName"]);
```
BOTH
or with the default microsoft defined char and words -
add true as third parameter
```bash
    this.spNameValidator.checkCustomValue(string, ValidationType["File - Folder"], true);
    or
    this.spNameValidator.checkCustomValue(string, ValidationType["ListName"], true);
```


When the string is valid true will be returned.


Happy coding!

