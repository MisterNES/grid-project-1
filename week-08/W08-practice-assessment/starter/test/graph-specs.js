const chai = require('chai');
chai.use(require('chai-spies'));
const { expect, spy } = chai;

const { mutualFriends } = require('../problems/03-mutualFriends')
const problemFile = require('../problems/03-mutualFriends');

describe('mutualFriends()', () => {
    it('should return false if the adjacency list has no friends :(', () => {
        expect(mutualFriends({}, 'lonely', 'list')).to.eql(false);
    });

    it('should return false if startName is the only name in the adjacency list', () => {
        expect(mutualFriends({ 'joe': [] }, 'joe', 'jesse')).to.eql(false);
    });

    it('should return true if endName is a direct friend of startName', () => {
        const friends1 = {
            'joe': ['jesse'],
            'jesse': ['joe']
        };
        expect(mutualFriends(friends1, 'joe', 'jesse')).to.eql(true);
        const friends2 = {
            'joe': ['anna', 'bill', 'jesse'],
            'anna': ['joe', 'bill'],
            'bill': ['joe', 'anna'],
            'carl': [],
            'jesse': ['joe']
        };
        expect(mutualFriends(friends2, 'joe', 'jesse')).to.eql(true);
    });

    it('should return true if endName is a mutual friend of startName', () => {
        const friends1 = {
            'joe': ['anna'],
            'anna': ['jesse'],
            'jesse': ['anna']
        };
        expect(mutualFriends(friends1, 'joe', 'jesse')).to.eql(true);

        const friends2 = {
            'derek': ['selam', 'dean'],
            'joe': ['selam'],
            'selam': ['derek', 'joe', 'dean', 'evan'],
            'dean': ['derek', 'evan', 'selam'],
            'sam': ['jen'],
            'evan': ['selam', 'jesse', 'dean'],
            'jen': ['sam', 'javier'],
            'javier': ['jen'],
            'chris': [],
            'jesse': ['evan'],
        };
        expect(mutualFriends(friends2, 'joe', 'jesse')).to.eql(true);
    });

    it('should return false if endName is not a friend or mutual friend of startName', () => {
        const friends1 = {
            'joe': ['anna'],
            'anna': ['joe'],
            'jesse': []
        };
        expect(mutualFriends(friends1, 'joe', 'jesse')).to.eql(false);

        const friends2 = {
            'derek': ['selam', 'dean'],
            'joe': ['selam'],
            'selam': ['derek', 'joe', 'dean', 'evan'],
            'dean': ['derek', 'evan', 'selam'],
            'sam': ['jen'],
            'evan': ['selam', 'jesse', 'dean'],
            'jen': ['sam', 'javier'],
            'javier': ['jen'],
            'chris': [],
            'jesse': ['evan'],
        };
        expect(mutualFriends(friends2, 'joe', 'jesse')).to.eql(true);
    });

    it('should be iterative', () => {
        spy.on(problemFile, 'mutualFriends')
        const friends1 = {
            'joe': ['anna'],
            'anna': ['joe'],
            'jesse': []
        };
        problemFile.mutualFriends(friends1, 'joe', 'jesse');
        expect(problemFile.mutualFriends).to.have.been.called.once;
    });
})