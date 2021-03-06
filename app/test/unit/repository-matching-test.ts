import { expect } from 'chai'

import { matchGitHubRepository } from '../../src/lib/repository-matching'
import { Account } from '../../src/models/account'

describe('Repository matching', () => {
  it('matches HTTPS URLs', () => {
    const accounts = [
      new Account(
        'alovelace',
        'https://api.github.com',
        '',
        [],
        '',
        1,
        '',
        false,
        false
      ),
    ]
    const repo = matchGitHubRepository(
      accounts,
      'https://github.com/someuser/somerepo.git'
    )!
    expect(repo.name).to.equal('somerepo')
    expect(repo.owner).to.equal('someuser')
  })

  it('matches HTTPS URLs without the git extension', () => {
    const accounts = [
      new Account(
        'alovelace',
        'https://api.github.com',
        '',
        [],
        '',
        1,
        '',
        false,
        false
      ),
    ]
    const repo = matchGitHubRepository(
      accounts,
      'https://github.com/someuser/somerepo'
    )!
    expect(repo.name).to.equal('somerepo')
    expect(repo.owner).to.equal('someuser')
  })

  it('matches git URLs', () => {
    const accounts = [
      new Account(
        'alovelace',
        'https://api.github.com',
        '',
        [],
        '',
        1,
        '',
        false,
        false
      ),
    ]
    const repo = matchGitHubRepository(
      accounts,
      'git:github.com/someuser/somerepo.git'
    )!
    expect(repo.name).to.equal('somerepo')
    expect(repo.owner).to.equal('someuser')
  })

  it('matches SSH URLs', () => {
    const accounts = [
      new Account(
        'alovelace',
        'https://api.github.com',
        '',
        [],
        '',
        1,
        '',
        false,
        false
      ),
    ]
    const repo = matchGitHubRepository(
      accounts,
      'git@github.com:someuser/somerepo.git'
    )!
    expect(repo.name).to.equal('somerepo')
    expect(repo.owner).to.equal('someuser')
  })

  it(`doesn't match if there aren't any users with that endpoint`, () => {
    const accounts = [
      new Account(
        'alovelace',
        'https://github.babbageinc.com',
        '',
        [],
        '',
        1,
        '',
        false,
        false
      ),
    ]
    const repo = matchGitHubRepository(
      accounts,
      'https://github.com/someuser/somerepo.git'
    )
    expect(repo).to.equal(null)
  })
})
