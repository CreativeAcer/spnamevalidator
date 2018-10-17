# # SPNameValidator

This validator will help you validate names for SharePoint 2013/2016 or SharePoint Online.
The validation can be used for Lib/list names and file names.

TLDR: This will check if SharePoint likes your naming.

# # # Instalation
```bash
    npm i @creativeacer/spnamevalidator
```


# # # Usage

include the libary
```bash
    import SPNameValidator, { Platform, ValidationType } from '@creativeacer/spnamevalidator/SPNameValidator';
```

choose your SharePoint version
```bash
    let spNameValidator = new SPNameValidator(Platform["SharePoint 2013 - 2016"]);
    or
    let spNameValidator = new SPNameValidator(Platform["SharePoint Online"]);
```

perform a check on a name / entry 
```bash
    this.spNameValidator.checkName(string, ValidationType["File - Folder"]);
    or
    this.spNameValidator.checkName(string, ValidationType["ListName"]);
```

When the string is valid true will be returned.

Happy coding!

