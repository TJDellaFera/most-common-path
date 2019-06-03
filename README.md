# Most Common Path Finder

A simple module for determining the most frequented path of a given length in linear time.

## Explanation
Given a log file which contains a list of user `ids` and the `path` of a web application they have visited and an optional path length, the algorithm returns the most common sequence of paths.

The log file must be in this format:
```
1 /home
1 /cart
1 /dragon
2 /dashboard
2 /home
2 /cart
3 /home
3 /cart
3 /dragon
```

The return value for this example would be: `['/home', '/cart', '/dragon']`.

Users `1` and `3` both went to the path `home cart dragon`.

## Usage
```
var MostCommonPathFinder = require('./MostCommonPathFinder');

MostCommonPathFinder.findPath('logFilePath').then((pathSequence) => {
    console.log(pathSequence)
}
```
