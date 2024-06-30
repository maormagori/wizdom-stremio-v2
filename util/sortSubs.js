const { distance } = require('fastest-levenshtein');

function sortSubs(subsArr, filename) {
  subsArr.sort((firstSub, secondSub) => {
    return (
      distance(filename, firstSub.versioname) -
      distance(filename, secondSub.versioname)
    );
  });
}

module.exports = sortSubs;
