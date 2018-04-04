import Node from './Node';

export default class PrefixTrie {
  constructor() {
    this.root = new Node();
    this.wordCount = 0;
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
    this.suggestionArray = [];

    for (let i = 0; i < word.length; i++) {
      if (currentNode.childrenObj[word[i]]) {
        currentNode = currentNode.childrenObj[word[i]];
      }
    }

    this.getSuggestions(word, currentNode)
    return this.suggestionArray;
  }


  getSuggestions(prefix, currentNode = this.root) {
    
    if (currentNode.isAWord) {
      this.suggestionArray.push(prefix)
    }

    let letters = Object.keys(currentNode.childrenObj)
    letters.forEach(letter => {
      return this.getSuggestions(prefix + letter, currentNode.childrenObj[letter])
    })
  }
}