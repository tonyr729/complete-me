const assert = require('chai').assert;
const Trie = require('../scripts/PrefixTrie.js');
const Node = require('../scripts/Node.js');
const fs = require('fs');
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

describe('PrefixTrie', function() {
  
  it('should be a class', function() {
    assert.isFunction(Trie)
  })

  let trie;

  beforeEach(function() {
    trie = new Trie();
  });

  it('should have a root of a new node', function() {
    let node = new Node();

    assert.deepEqual(trie.root, node);
  });

  it('should have a root which value remains null', function() {
    let node = new Node();

    assert.deepEqual(trie.root.value, null);
  });

  describe('insert', function() {
    it('should be able to add a node to the Tree', function() {
      trie.insert("z")

      assert.equal(trie.root.childrenNode.z.value, "z");
    });

    it('should be able to insert a word to the Tree', function() {
      trie.insert("bat")

      assert.equal(trie.root.childrenNode.b.childrenNode.a.childrenNode.t.value, "t");
    });

    it('should be able to set the property "isWord" to true at the end of a word', function() {
      trie.insert("bat")

      assert.equal(trie.root.childrenNode.b.childrenNode.a.childrenNode.t.isWord, true);
    });

    it('should be able to insert a word to the Tree', function() {
      trie.insert("bat")

      assert.equal(trie.root.childrenNode.b.childrenNode.a.childrenNode.t.value, "t");
    });

    it('should increase the number of words the prefixTrie has when it adds a word', function() {
      assert.equal(trie.wordCount, 0);

      trie.insert('bat');

      assert.equal(trie.wordCount, 1);

      trie.insert('batman');
      trie.insert('bath');
      assert.equal(trie.wordCount, 3);
    });

    it('should not increment the number of words if the word already exists', function() {
      assert.equal(trie.wordCount, 0);

      trie.insert('batman');
      assert.equal(trie.wordCount, 1);

      trie.insert('batman');
      assert.equal(trie.wordCount, 1);
    });
  });

  describe('populate', function() {
    it('should increase the word count when adding multiple words from an array', function() {
      let wordArray = ['bat', 'batman', 'bathmat'];

      assert.equal(trie.wordCount, 0);

      trie.populate(wordArray);
      assert.equal(trie.wordCount, 3);
    });

    it('should insert multiple words from an array to the prefixTrie', function() {
      let wordArray = ['bat', 'batman', 'batmobile'];

      trie.populate(wordArray);
      assert.deepEqual(trie.root.childrenNode.b.value, "b");
      assert.deepEqual(trie.root.childrenNode.b.childrenNode.a.childrenNode.t.childrenNode.m.value, "m");
    });

    it('should insert a very large array to the prefixTrie', function() {
      assert.equal(trie.wordCount, 0);

      trie.populate(dictionary);
      assert.equal(trie.wordCount, 234371);
    });
  });

  describe('suggest', function() {

    it('should suggest words based on the prefix passed to it', function() {
      assert.equal(trie.suggestionArray.length, 0)

      let thisArray = ['pin', 'taco', 'pine', 'plant', 'pint', 'burrito', 'pie', 'pizza', 'pork']
      
      trie.populate(thisArray);
      
      assert.deepEqual(trie.suggest('pi'), ['pin', 'pine', 'pint', 'pie', 'pizza']);
    });

    it('should suggest words that are a direct match', function() {
      assert.equal(trie.suggestionArray.length, 0)

      let thisArray = ['pin', 'taco', 'pine', 'plant', 'pint', 'burrito', 'pie', 'pizza', 'pork']
      
      trie.populate(thisArray);
      
      assert.deepEqual(trie.suggest('pizza'), ['pizza']);
    });

    it('should not suggest words that do not match the users prefix', function() {
      assert.equal(trie.suggestionArray.length, 0)

      let thisArray = ['pin', 'taco', 'pine', 'plant', 'pint', 'burrito', 'pie', 'pizza', 'pork']
      
      trie.populate(thisArray);
      
      assert.deepEqual(trie.suggest('dog'), null);
    })
  });

  describe('select', function() {
    it('should increment the popularityLevel of a word', function(){
      let thisArray = ['pin', 'taco', 'pine', 'plant', 'pint', 'burrito', 'pie', 'pizza', 'pork']
      
      trie.populate(thisArray);

      trie.select('pie')

      assert.equal(trie.root.childrenNode.p.childrenNode.i.childrenNode.e.popularityLevel, "1");
    });


    it('should push the most popular word to the beggining of array', function(){
      let thisArray = ['pin', 'taco', 'pine', 'plant', 'pint', 'burrito', 'pie', 'pizza', 'pork']
      
      trie.populate(thisArray);

      trie.select('pie')
      
      assert.deepEqual(trie.suggest('pi'), ['pie', 'pin', 'pine', 'pint', 'pizza'])
    });
  });
});
