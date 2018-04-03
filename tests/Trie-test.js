import { expect } from 'chai';
import Trie from '../scripts/Trie'

describe('TDD with Trie', () => {
  let myTrie = new Trie();

  myTrie.insert("taco");

  console.log(JSON.stringify(myTrie, null, 2));

})
