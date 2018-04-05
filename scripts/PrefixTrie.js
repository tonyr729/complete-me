const Node = require('../scripts/Node.js');

class PrefixTrie {
  constructor() {
    this.root = new Node();
    this.wordCount = 0;
    this.suggestionArray = [];
  }

  insert(word, currentNode = this.root) {
    word = word.toLowerCase();
    if (!word.length) {
      if (!currentNode.isWord) {
        this.wordCount++;
        currentNode.isWord = true;
        return;
      }
      return;
    } 
  
    if (!currentNode.childrenNode[word[0]]) {
      currentNode.childrenNode[word[0]] = new Node();
      currentNode.childrenNode[word[0]].value = word[0];
    }

    currentNode = currentNode.childrenNode[word[0]];


    this.insert(word.substr(1), currentNode)
  }

  count(){
    return this.wordCount
  }

  suggest(word, currentNode = this.root) {
    word = word.toLowerCase();
    this.suggestionArray = [];

    for (let i = 0; i < word.length; i++) {
      if (currentNode.childrenNode[word[i]]) {
        currentNode = currentNode.childrenNode[word[i]];
      } else {
        return null;
      }
    }

    this.getSuggestions(word, currentNode)
    return this.suggestionArray;
  }


  getSuggestions(prefix, currentNode) {
    
    if (currentNode.isWord) {
      this.suggestionArray.push(prefix)
    }

    let letters = Object.keys(currentNode.childrenNode)
    letters.forEach(letter => {
      return this.getSuggestions(prefix + letter, currentNode.childrenNode[letter])
    })
  }

  populate(array) {
    array.forEach(word => this.insert(word))
  }
}


module.exports = PrefixTrie;