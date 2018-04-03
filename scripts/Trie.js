import Node from './Node';

export default class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(word, currentNode = this.root) {
    console.log(word.substr(1));
    if (!word.length) {
      this.isWord = true;
      return;
    } 
  
    if (!currentNode.childrenNode[word[0]]) {
      currentNode.childrenNode[word[0]] = new Node();
      currentNode.childrenNode[word[0]].value = word[0];
    }

    currentNode = currentNode.childrenNode[word[0]];

    this.insert(word.substr(1), currentNode)
  }
}


