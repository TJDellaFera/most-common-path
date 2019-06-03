"use strict";

/*
  Within this file, write your complete solution. As you can see, we read in the log file for you.
*/

const fsp = require('fs-promise');

/**
 * We have written the basics here for you.
 * This is a JS module called MostCommonPathFinder.
 * It contains a single method `findPath` which is
 * where most of your code will go.
 *
 */
const MostCommonPathFinder = (() => {
  /**
   * Any vars you might want here?
   */

  return {
    findPath: async (logFilePath, pathLength = 3) => {
      const logfileString = await fsp.readFile(logFilePath, 'utf8');
      /**
       * Your Code goes here. The logfileString param contains the whole logfile as a string.
       */

      const PATH_LENGTH = pathLength;
      var mostCommonPathCount = 0,
        mostCommonPath = [],
        userPaths = {},
        pathCounts = {};

      for (let line of logfileString.split('\n')) { //split logfile into lines
        var [user, path] = line.split(' ');
        if (!(user in userPaths)) {
          userPaths[user] = [path];
        }
        else {
          userPaths[user].push(path);
          while (userPaths[user].length > PATH_LENGTH) {
            userPaths[user].shift();
          }
          if (userPaths[user].length == PATH_LENGTH) { //update path count
            var userPathString = userPaths[user].join('');
            if (userPathString in pathCounts) {
              pathCounts[userPathString] += 1;
            }
            else {
              pathCounts[userPathString] = 1;
            }
            if (pathCounts[userPathString] > mostCommonPathCount) {
              mostCommonPath = userPaths[user];
              mostCommonPathCount = pathCounts[userPathString];
            }
          }
        }
      }
      return mostCommonPath; // <-- replace this with the answer
    }
  };
})();

module.exports = MostCommonPathFinder;
