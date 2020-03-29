import {v4 as uuid} from 'uuid'

export const mockItems = [
  {
    name: 'My First Notebook',
    docUrl: 'foobar',
    lastChangeDate: new Date(2019, 3, 20),
  },
  {
    name: 'Hafiz Transliteration',
    docUrl: 'foobar',
    updates: true,
  },
  {
    name: 'Phyrenae Transcriptions',
    docUrl: 'foobar',
  },
  {
    name: 'Shakespeare Notes',
    docUrl: 'foobar',
  },
]

for (const item of mockItems) {
  item.docUrl = `hypermerge:/${uuid()}`
}
