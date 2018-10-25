var assert = require('assert');
var SPNameValidator = require('../SPNameValidator').default;
var Platform = require('../SPNameValidator').Platform;
var ValidationType = require('../SPNameValidator').ValidationType;

// Platform
// '0': 'SharePoint 2013 - 2016',
// '1': 'SharePoint Online'

// ValidationType
// '0': 'File - Folder',
// '1': 'ListName'


describe('SharePoint 2013-2016 tests', function () {
  var validator = new SPNameValidator(Platform['SharePoint 2013 - 2016']);
  describe('File and Folder tests', function () {
    it('"_test" should return false', function () {
      assert.equal(validator.checkName('_test', ValidationType['File - Folder']), false);
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
    it('"js..on{}" should return false', function () {
      assert.equal(validator.checkName('js..on{}', ValidationType['File - Folder']), false);
    });
    it('"starting with ." should return false', function () {
      assert.equal(validator.checkName('.dotstart', ValidationType['File - Folder']), false);
    });
    it('"ending with ." should return false', function () {
      assert.equal(validator.checkName('dotend.', ValidationType['File - Folder']), false);
    });
    it('"ending with _arquivos" should return false', function () {
      assert.equal(validator.checkName('dotend_arquivos', ValidationType['File - Folder']), false);
    });
  });
  describe('ListName tests', function () {
    it('"_test" should return false', function () {
      assert.equal(validator.checkName('_test', ValidationType['ListName']), false);
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
    it('"dot." should return false', function () {
      assert.equal(validator.checkName('dot.', ValidationType['ListName']), false);
    });
    it('"ending with _arquivos" should return false', function () {
      assert.equal(validator.checkName('dotend_arquivos', ValidationType['ListName']), false);
    });
  });
});

describe('SharePoint Online tests', function () {
  var validator = new SPNameValidator(Platform['SharePoint Online']);
  describe('File and Folder tests', function () {
    it('"_test" should return false', function () {
      assert.equal(validator.checkName('_test', ValidationType['File - Folder']), false);
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
    it('"starting with ." should return false', function () {
      assert.equal(validator.checkName('.dotstart', ValidationType['File - Folder']), false);
    });
    it('"ending with ." should return false', function () {
      assert.equal(validator.checkName('dotend.', ValidationType['File - Folder']), false);
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
    it('"cen..ter" should return false', function () {
      assert.equal(validator.checkName('cen..ter', ValidationType['File - Folder']), false);
    });
    it('"ending with _arquivos" should return false', function () {
      assert.equal(validator.checkName('dotend_arquivos', ValidationType['File - Folder']), false);
    });
  });
  describe('ListName tests', function () {
    it('"_test" should return false', function () {
      assert.equal(validator.checkName('_test', ValidationType['ListName']), false);
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
    it('"ending with _arquivos" should return false', function () {
      assert.equal(validator.checkName('dotend_arquivos', ValidationType['ListName']), false);
    });
  });

});

describe('Custom tests', function () {
  var validator = new SPNameValidator(Platform['SharePoint Online']);
  validator.setIllegalCharset(['a', '#', '7', '!', 'q', '_']);
  validator.setIllegalWordset(['This', 'List', 'is', 'now', 'Illegal']);
  describe('Custom tests without default illegal characters', function () {
    it('"_test" should return false', function () {
      assert.equal(validator.checkCustomValue('_test', ValidationType['File - Folder']), false);
    });
    it('"test7" should return false', function () {
      assert.equal(validator.checkCustomValue('test7', ValidationType['File - Folder']), false);
    });
    it('"testb" should return true', function () {
      assert.equal(validator.checkCustomValue('testb', ValidationType['File - Folder']), true);
    });
    it('"testing" should return true', function () {
      assert.equal(validator.checkCustomValue('testing', ValidationType['File - Folder']), true);
    });
    it('"~$" should return true', function () {
      assert.equal(validator.checkCustomValue('~$', ValidationType['File - Folder']), true);
    });
    it('"ending with .files custom no default" should return true', function () {
      assert.equal(validator.checkCustomValue('dotend.files', ValidationType['ListName']), true);
    });
    it('"lol#zies" should return false', function () {
      assert.equal(validator.checkCustomValue('lol#zies', ValidationType['ListName']), false);
    });
    it('"NUL" should return true', function () {
      assert.equal(validator.checkCustomValue('NUL', ValidationType['ListName']), true);
    });
    it('"nul" should return true', function () {
      assert.equal(validator.checkCustomValue('nul', ValidationType['ListName']), true);
    });
    it('"starting with space" should return false', function () {
      assert.equal(validator.checkCustomValue(' spacestart', ValidationType['ListName']), false);
    });
    it('"M&M" should return true', function () {
      assert.equal(validator.checkCustomValue('M&M', ValidationType['ListName']), true);
    });
    it('"Illegal" should return false', function () {
      assert.equal(validator.checkCustomValue('Illegal', ValidationType['ListName']), false);
    });
    it('"json{}" should return true', function () {
      assert.equal(validator.checkCustomValue('json{}', ValidationType['ListName']), true);
    });
  });
  describe('Custom tests with default illegal characters', function () {
    it('"_test" should return false', function () {
      assert.equal(validator.checkCustomValue('_test', ValidationType['File - Folder'], true), false);
    });
    it('"test7" should return false', function () {
      assert.equal(validator.checkCustomValue('test7', ValidationType['File - Folder'], true), false);
    });
    it('"testb" should return true', function () {
      assert.equal(validator.checkCustomValue('testb', ValidationType['File - Folder'], true), true);
    });
    it('"testing" should return true', function () {
      assert.equal(validator.checkCustomValue('testing', ValidationType['File - Folder'], true), true);
    });
    it('"~$" should return false', function () {
      assert.equal(validator.checkCustomValue('~$', ValidationType['File - Folder'], true), false);
    });
    it('"lol#zies" should return false', function () {
      assert.equal(validator.checkCustomValue('lol#zies', ValidationType['File - Folder'], true), false);
    });
    it('"NUL" should return false', function () {
      assert.equal(validator.checkCustomValue('NUL', ValidationType['ListName'], true), false);
    });
    it('"nul" should return false', function () {
      assert.equal(validator.checkCustomValue('nul', ValidationType['ListName'], true), false);
    });
    it('"starting with space" should return false', function () {
      assert.equal(validator.checkCustomValue(' spacestart', ValidationType['ListName'], true), false);
    });
    it('"ending with .files custom no default" should return false', function () {
      assert.equal(validator.checkCustomValue('dotend.files', ValidationType['ListName'], true), false);
    });
    it('"ending with _arquivos custom with default" should return false', function () {
      assert.equal(validator.checkCustomValue('dotend_arquivos', ValidationType['ListName'], true), false);
    });
    it('"M&M" should return true', function () {
      assert.equal(validator.checkCustomValue('M&M', ValidationType['ListName'], true), true);
    });
    it('"Illegal" should return false', function () {
      assert.equal(validator.checkCustomValue('Illegal', ValidationType['ListName']), false);
    });
    it('"json{}" should return true', function () {
      assert.equal(validator.checkCustomValue('json{}', ValidationType['ListName']), true);
    });
  });  
});