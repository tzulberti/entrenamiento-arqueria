/**
 * Algunas cosas que le agrego al lenguaje de javascript para que
 * me sea mas facil trabajar con el mismo.
 */

String.prototype.toTitleCase = function(){
    var title = this.replace(/_/g, ' ');
    var words = title.split(' ');
    var tmp = [];

    var smallWords = 'a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs'.split('|');

    for (var i = 0; i < words.length; i++) {
        var currentWord = words[i];
        var isSmallWord = false;
        for (var j = 0; j < smallWords.length; j++) {
            if (currentWord === smallWords[j]) {
                isSmallWord = true;
                break;
            }
        }
        if (isSmallWord) {
            tmp.push(currentWord);
        } else {
            tmp.push(currentWord.charAt(0).toUpperCase() + currentWord.substr(1));
        }
    }
    return tmp.join(' ');
};
