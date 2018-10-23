var assert = require('assert');
var SPNameValidator = require('../SPNameValidator').default;
var Platform = require('../SPNameValidator').Platform;
var ValidationType = require('../SPNameValidator').ValidationType;

// Platform
// '0': 'SharePoint 2013 - 2016',
// '1': 'SharePoint Online'

// ValidationType
// '0': 'File - Folder',
// '1': 'ListName',
// '2': 'Custom'


describe('SharePoint 2013-2016 tests', function () {
  var validator = new SPNameValidator(Platform['SharePoint 2013 - 2016']);
  describe('File and Folder tests', function () {
    it('"_test" should return true', function () {
      assert.equal(validator.checkName('_test', ValidationType['File - Folder']), true);
    });
    it('"namingconventions" should return true', function () {
      assert.equal(validator.checkName('namingconventions', ValidationType['File - Folder']), true);
    });
    it('"~$aaaand" should return false', function () {
      assert.equal(validator.checkName('~$aaaand', ValidationType['File - Folder']), false);
    });
    it('"lol#zies" should return false', function () {
      assert.equal(validator.checkName('lol#zies', ValidationType['File - Folder']), false);
    });
    it('"NUL" should return false', function () {
      assert.equal(validator.checkName('NUL', ValidationType['File - Folder']), false);
    });
    it('"nul" should return false', function () {
      assert.equal(validator.checkName('nul', ValidationType['File - Folder']), false);
    });
    it('"starting with space" should return false', function () {
      assert.equal(validator.checkName(' spacestart', ValidationType['File - Folder']), false);
    });
    it('"M&M" should return false', function () {
      assert.equal(validator.checkName('M&M', ValidationType['File - Folder']), false);
    });
    it('"MandM" should return true', function () {
      assert.equal(validator.checkName('MandM', ValidationType['File - Folder']), true);
    });
    it('"json{}" should return false', function () {
      assert.equal(validator.checkName('json{}', ValidationType['File - Folder']), false);
    });
  });
  describe('ListName tests', function () {
    it('"_test" should return true', function () {
      assert.equal(validator.checkName('_test', ValidationType['ListName']), true);
    });
    it('"namingconventions" should return true', function () {
      assert.equal(validator.checkName('namingconventions', ValidationType['ListName']), true);
    });
    it('"~$aaaand" should return false', function () {
      assert.equal(validator.checkName('~$aaaand', ValidationType['ListName']), false);
    });
    it('"lol#zies" should return false', function () {
      assert.equal(validator.checkName('lol#zies', ValidationType['ListName']), false);
    });
    it('"NUL" should return false', function () {
      assert.equal(validator.checkName('NUL', ValidationType['ListName']), false);
    });
    it('"nul" should return false', function () {
      assert.equal(validator.checkName('nul', ValidationType['ListName']), false);
    });
    it('"starting with space" should return false', function () {
      assert.equal(validator.checkName(' spacestart', ValidationType['ListName']), false);
    });
    it('"M&M" should return false', function () {
      assert.equal(validator.checkName('M&M', ValidationType['ListName']), false);
    });
    it('"MandM" should return true', function () {
      assert.equal(validator.checkName('MandM', ValidationType['ListName']), true);
    });
    it('"json{}" should return false', function () {
      assert.equal(validator.checkName('json{}', ValidationType['ListName']), false);
    });
  });
});

describe('SharePoint Online tests', function () {
  var validator = new SPNameValidator(Platform['SharePoint Online']);
  describe('File and Folder tests', function () {
    it('"_test" should return true', function () {
      assert.equal(validator.checkName('_test', ValidationType['File - Folder']), true);
    });
    it('"namingconventions" should return true', function () {
      assert.equal(validator.checkName('namingconventions', ValidationType['File - Folder']), true);
    });
    it('"~$aaaand" should return false', function () {
      assert.equal(validator.checkName('~$aaaand', ValidationType['File - Folder']), false);
    });
    it('"lol#zies" should return true', function () {
      assert.equal(validator.checkName('lol#zies', ValidationType['File - Folder']), true);
    });
    it('"NUL" should return false', function () {
      assert.equal(validator.checkName('NUL', ValidationType['File - Folder']), false);
    });
    it('"nul" should return false', function () {
      assert.equal(validator.checkName('nul', ValidationType['File - Folder']), false);
    });
    it('"starting with space" should return false', function () {
      assert.equal(validator.checkName(' spacestart', ValidationType['File - Folder']), false);
    });
    it('"M&M" should return true', function () {
      assert.equal(validator.checkName('M&M', ValidationType['File - Folder']), true);
    });
    it('"MandM" should return true', function () {
      assert.equal(validator.checkName('MandM', ValidationType['File - Folder']), true);
    });
    it('"json{}" should return true', function () {
      assert.equal(validator.checkName('json{}', ValidationType['File - Folder']), true);
    });
  });
  describe('ListName tests', function () {
    it('"_test" should return true', function () {
      assert.equal(validator.checkName('_test', ValidationType['ListName']), true);
    });
    it('"namingconventions" should return true', function () {
      assert.equal(validator.checkName('namingconventions', ValidationType['ListName']), true);
    });
    it('"~$aaaand" should return false', function () {
      assert.equal(validator.checkName('~$aaaand', ValidationType['ListName']), false);
    });
    it('"lol#zies" should return true', function () {
      assert.equal(validator.checkName('lol#zies', ValidationType['ListName']), true);
    });
    it('"NUL" should return false', function () {
      assert.equal(validator.checkName('NUL', ValidationType['ListName']), false);
    });
    it('"nul" should return false', function () {
      assert.equal(validator.checkName('nul', ValidationType['ListName']), false);
    });
    it('"starting with space" should return false', function () {
      assert.equal(validator.checkName(' spacestart', ValidationType['ListName']), false);
    });
    it('"M&M" should return true', function () {
      assert.equal(validator.checkName('M&M', ValidationType['ListName']), true);
    });
    it('"MandM" should return true', function () {
      assert.equal(validator.checkName('MandM', ValidationType['ListName']), true);
    });
    it('"json{}" should return true', function () {
      assert.equal(validator.checkName('json{}', ValidationType['ListName']), true);
    });
  });

});

describe('Custom tests', function () {
  var validator = new SPNameValidator(Platform['SharePoint Online']);
  validator.setIllegalCharset(['a', '#', '7', '!', 'q', '_']);
  validator.setIllegalWordset(['This', 'List', 'is', 'now', 'Illegal']);

  it('"_test" should return false', function () {
    assert.equal(validator.checkCustomValue('_test'), false);
  });
  it('"test7" should return false', function () {
    assert.equal(validator.checkCustomValue('test7'), false);
  });
  it('"testb" should return true', function () {
    assert.equal(validator.checkCustomValue('testb'), true);
  });
  it('"testing" should return true', function () {
    assert.equal(validator.checkCustomValue('testing'), true);
  });
  it('"~$" should return false', function () {
    assert.equal(validator.checkCustomValue('~$'), false);
  });
  it('"lol#zies" should return false', function () {
    assert.equal(validator.checkCustomValue('lol#zies'), false);
  });
  it('"NUL" should return true', function () {
    assert.equal(validator.checkCustomValue('NUL'), true);
  });
  it('"nul" should return true', function () {
    assert.equal(validator.checkCustomValue('nul'), true);
  });
  it('"starting with space" should return false', function () {
    assert.equal(validator.checkCustomValue(' spacestart'), false);
  });
  it('"M&M" should return true', function () {
    assert.equal(validator.checkCustomValue('M&M'), true);
  });
  it('"Illegal" should return false', function () {
    assert.equal(validator.checkCustomValue('Illegal'), false);
  });
  it('"json{}" should return true', function () {
    assert.equal(validator.checkCustomValue('json{}', ValidationType['ListName']), true);
  });
});