#!/usr/bin/env node
const cb = require('clipboardy')
const fuzzy = require('fuzzy')
const inquirer = require('inquirer')
const autocomplete = require('inquirer-autocomplete-prompt')
const {createStore} = require('../lib/repo-store')

inquirer.registerPrompt('autocomplete', autocomplete)

const volatile = process.argv.length > 2 && process.argv[2] === '-v'
if (volatile) {
  console.log('starting in-memory mode (volatile).')
}

const mapId = ({docUrl, doc}) =>
  doc.title ? `${docUrl} (${doc.title})` : docUrl
const parseMapId = mapId => {
  const res = mapId.match(/^(hypermerge:\/[\w]+).*$/)
  return res ? res[1] : null
}

async function getDocs(repo, docUrls) {
  const docs = []
  for (const docUrl of docUrls) {
    docs.push({
      docUrl,
      doc: await repo.doc(docUrl),
    })
  }
  return docs
}

async function findDocUrl(repo, docUrls) {
  const items = await getDocs(repo, docUrls)
  const {id} = await inquirer.prompt([
    {
      type: 'autocomplete',
      name: 'id',
      message: 'Notebook URL:',
      pageSize: 5,
      source: (answersSoFar, input) =>
        Promise.resolve(
          !input
            ? items.map(mapId)
            : fuzzy
                .filter(input, items, {
                  extract: mapId,
                })
                .map(({string}) => string)
        ),
    },
  ])
  return parseMapId(id)
}

async function listNotebooks({repo, docUrls}) {
  if (docUrls.length === 0) {
    console.log('There are no notebooks available.')
  }
  const items = await getDocs(repo, docUrls)

  for (const {docUrl, doc} of items) {
    console.log(docUrl, doc.title)
  }
}

async function showNotebook({repo, docUrls}) {
  if (docUrls.length === 0) {
    console.log('There are no notebooks available.')
  }

  const docUrl = await findDocUrl(repo, docUrls)
  if (!docUrl) {
    console.log("Something unexpected happened; couldn't find that document.")
    return
  }

  console.log(JSON.stringify(await repo.doc(docUrl), null, 2))
}

async function removeNotebook(repoStore, {repo, id, docUrls}) {
  if (docUrls.length === 0) {
    console.log('There are no notebooks available.')
  }

  const docUrl = await findDocUrl(repo, docUrls)
  if (!docUrl) {
    console.log("Something unexpected happened; couldn't find that document.")
    return
  }

  await repoStore.removeDoc(id, docUrl)
  console.log(`Removed notebook \`${docUrl}\`.`)
}

async function addNotebook(repoStore, {id}) {
  const title = (
    await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Notebook title (optional):',
      },
    ])
  ).title

  const docUrl = await repoStore.addDoc(id, title)
  cb.writeSync(docUrl)
  console.log(`The new notebook's URL (copied to clipboard):
${docUrl}`)
}

async function main() {
  const repoStore = await createStore({volatile})
  const entry =
    repoStore.size === 0
      ? await repoStore.addRepo()
      : Array.from(repoStore.repos.values())[0]

  const shutdown = async (code = 0) => {
    await repoStore.destroy()
    process.exit(code)
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)

  let action
  do {
    action = (
      await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What do you want to do?',
          choices: [
            'List notebooks',
            'Show notebook',
            new inquirer.Separator(),
            'Add notebook',
            'Remove notebook',
            new inquirer.Separator(),
            'Exit',
          ],
        },
      ])
    ).action

    switch (action) {
      case 'List notebooks':
        await listNotebooks(entry)
        break

      case 'Show notebook':
        await showNotebook(entry)
        break

      case 'Add notebook':
        await addNotebook(repoStore, entry)
        break

      case 'Remove notebook':
        await removeNotebook(repoStore, entry)
        break

      case 'Exit':
        break

      default:
        console.log('Unexpected action; continuing.')
    }

    console.log('')
  } while (action !== 'Exit')

  console.log('Shutting down...')
  await shutdown()
}

main()
