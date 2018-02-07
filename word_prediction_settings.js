/*
    All settings for the js library on word prediction
*/


// The bank of words in which the library references when looking for possible predictions
var words = [
    'adipisicing',
    'ad',
    'wet',
    'aliqua',
    'aliquip',
    'amet',
    'anim',
    'aute',
    'cillum',
    'commodo',
    'consectetur',
    'consequat',
    'culpa',
    'cupidatat',
    'deserunt',
    'do',
    'dolor',
    'dolor',
    'dolore',
    'dolore',
    'Duis',
    'ea',
    'eiusmod',
    'elit',
    'enim',
    'esse',
    'est',
    'et',
    'eu',
    'ex',
    'Excepteur',
    'exercitation',
    'fugiat',
    'id',
    'in',
    'in',
    'in',
    'incididunt',
    'ipsum',
    'irure',
    'labore',
    'laboris',
    'laborum',
    'Lorem',
    'magna',
    'minim',
    'mollit',
    'nisi',
    'non',
    'nostrud',
    'nulla',
    'occaecat',
    'officia',
    'pariatur',
    'proident',
    'qui',
    'quis',
    'reprehenderit',
    'sed',
    'sint',
    'sit',
    'sunt',
    'tempor',
    'ullamco',
    'Ut',
    'ut',
    'ut',
    'velit',
    'veniam',
    'voluptate'
];

// Maximum number of predictions the library can suggest at once
var settings = {
    maxAmount : 1
};

// Initialize the library with the words and settings specified above
var tree = new jsT9(words, settings);
