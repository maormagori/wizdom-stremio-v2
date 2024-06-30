const { distance } = require('fastest-levenshtein');

function sortSubs(subsArr, filename) {
  subsArr.sort((firstSub, secondSub) => {
    return (
      distance(filename, firstSub.version) -
      distance(filename, secondSub.version)
    );
  });
}

module.exports = sortSubs;
