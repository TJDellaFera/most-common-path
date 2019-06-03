/*globals expect spyOn fail fit*/
var MostCommonPathFinder = require('../../src/MostCommonPathFinder');
var fsp = require('fs-promise');
var fakeLogData = `
1 /1
1 /2
1 /3
1 /4
2 /2
2 /3
2 /4
`;

describe('Most Common 3 page Sequence', function(){
  var test_dir = './test_logs/';

  describe('MostCommonPathFinder', function(){
    var validLogFilePath  = test_dir + 'dragon.log'

    describe('#findPath', function(){
      it('returns a promise', function(){
        expect(MostCommonPathFinder.findPath(validLogFilePath) instanceof Promise).toBe(true);
      })

      it('searches onDisk for filepath param', function(done){
        var mySpy = new spyOn(fsp, 'readFile').and.returnValue(Promise.resolve('whocares'));
        MostCommonPathFinder.findPath('logFilePathStub').then(() => {
          expect(mySpy).toHaveBeenCalledWith('logFilePathStub', 'utf8');
          done();
        }).catch(fail)
      })

      it('returns expected value', function(done){
        var expectedResponse = ['/2', '/3', '/4'];
        var mySpy = new spyOn(fsp, 'readFile').and.returnValue(Promise.resolve(fakeLogData));
        MostCommonPathFinder.findPath('banana').then((response) => {
          expect(response).toEqual(expectedResponse);
          done();
        }).catch(fail)
      })

      // additional tests
      it('Returns an empty list when the logfile is empty', function(done){
        var emptyLog = test_dir + 'empty.log',
          expectedResponse = []
        MostCommonPathFinder.findPath(emptyLog).then((response) => {
          expect(response).toEqual(expectedResponse);
          done();
        }).catch(fail)
      })

      it('Returns empty list when no paths are long enough', function(done){
        var  shortPaths = test_dir + 'shortPath.log';
          expectedResponse = []
        MostCommonPathFinder.findPath(shortPaths).then((response) => {
          expect(response).toEqual(expectedResponse);
          done();
        }).catch(fail)
      })
      
      it('Accuratly finds the most common path of length 3', function(done){
        var dragonLog = test_dir + 'dragon.log';
          fakeLog = test_dir + 'fakeLog.log',
          expectedResponse1 = ['/dragonDashboard', '/smaug', '/puff'],
          expectedResponse2 = ['/2', '/3', '/4'];
        MostCommonPathFinder.findPath(dragonLog).then((response) => {
          expect(response).toEqual(expectedResponse1)
        }).catch(fail)
        MostCommonPathFinder.findPath(fakeLog).then((response) => {
          expect(response).toEqual(expectedResponse2);
          done();
        }).catch(fail)
      })

      it('can optionally take a parameter for the desired path length (defaults to 3)', function(done){
        var dragonLog = test_dir + 'dragon.log';
          expectedResponse2  = ['/smaug', '/puff'],
          expectedResponse4  = ['/smaug', '/puff', '/pete', '/logout'];
          MostCommonPathFinder.findPath(dragonLog, 2).then((response) => {
            expect(response).toEqual(expectedResponse2)
          }).catch(fail)
          MostCommonPathFinder.findPath(dragonLog, 4).then((response) => {
            expect(response).toEqual(expectedResponse4);
            done();
          }).catch(fail)
      })
    });
  });
})
