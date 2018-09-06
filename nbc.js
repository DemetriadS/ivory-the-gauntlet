// What does it do?
// Honestly, what we have here is a little over 100 lines of fairly incomprehensible stuff.
// HINT:
//    1. What you see is a Naive Bayes Classifier.
//    2. The algorithm will use chords in songs along with their difficulty as training data.

// songs
const imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7']
const somewhere_over_the_rainbow = ['c', 'em', 'f', 'g', 'am']
const tooManyCooks = ['c', 'g', 'f']
const iWillFollowYouIntoTheDark = ['f', 'dm', 'bb', 'c', 'a', 'bbm']
const babyOneMoreTime = ['cm', 'g', 'bb', 'eb', 'fm', 'ab']
const creep = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6']
const army = ['ab', 'ebm7', 'dbadd9', 'fm7', 'bbm', 'abmaj7', 'ebm']
const paperBag = [
  'bm7',
  'e',
  'c',
  'g',
  'b7',
  'f',
  'em',
  'a',
  'cmaj7',
  'em7',
  'a7',
  'f7',
  'b'
]
const toxic = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7', 'g7']
const bulletproof = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#']

let songs = []
let allChords = []
let labelCounts = {}
let labelProbabilities = {}
let chordCountsInLabels = {}
let probabilityOfChordsInLabels = {}

function train(chords, label) {
  chords.forEach(function(chord) {
    if (allChords[chord] === undefined) {
      allChords.push(chord)
    }
  })
  if (labelCounts[label] !== undefined) {
    labelCounts[label]++
  } else {
    labelCounts[label] = 1
  }
  songs.push({
    label: label,
    chords: chords
  })
}

function getNumberOfSongs() {
  return songs.length
}

function setLabelProbabilities() {
  for (label in labelCounts) {
    labelProbabilities[label] = labelCounts[label] / songs.length
  }
  return labelProbabilities
}

function setChordCountsInLabels() {
  songs.forEach(function(song) {
    if (chordCountsInLabels[song.label] === undefined) {
      chordCountsInLabels[song.label] = {}
    }
    song.chords.forEach(function(chord) {
      if (chordCountsInLabels[song.label][chord] !== undefined) {
        chordCountsInLabels[song.label][chord]++
      } else {
        chordCountsInLabels[song.label][chord] = 1
      }
    })
  })
  return chordCountsInLabels
}

function setProbabilityOfChordsInLabels() {
  for (label in chordCountsInLabels) {
    for (chord in chordCountsInLabels[label]) {
      chordCountsInLabels[label][chord] /= songs.length
    }
  }
}

const difficulties = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard'
}

train(imagine, difficulties.easy)
train(somewhere_over_the_rainbow, difficulties.easy)
train(tooManyCooks, difficulties.easy)
train(iWillFollowYouIntoTheDark, difficulties.medium)
train(babyOneMoreTime, difficulties.medium)
train(creep, difficulties.medium)
train(paperBag, difficulties.hard)
train(toxic, difficulties.hard)
train(bulletproof, difficulties.hard)

console.log('Number of songs:', getNumberOfSongs())
console.log('label probabilities set: ' + '\n', setLabelProbabilities())
console.log('Chrod counts in labels is: ' + '\n',setChordCountsInLabels())
console.log('Probability of chords in labels is: ' + '\n',setProbabilityOfChordsInLabels())

function classify(chords) {
  let ttal = labelProbabilities
  console.log(ttal)
  let classified = {}
  Object.keys(ttal).forEach(function(obj) {
    let first = labelProbabilities[obj] + 1.01
    chords.forEach(function(chord) {
      let probabilityOfChordInLabel = chordCountsInLabels[obj][chord]
      if (probabilityOfChordInLabel === undefined) {
        first + 1.01
      } else {
        first = first * (probabilityOfChordInLabel + 1.01)
      }
    })
    classified[obj] = first
  })
  console.log(classified)
}

classify(['d', 'g', 'e', 'dm'])
classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m'])
