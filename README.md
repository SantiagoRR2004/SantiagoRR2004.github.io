# GitHub Profile

These are the instructions to copy my GitHub profile repositories to your own GitHub account. There are two repositories to copy: the normal profile `https://github.com/User/User` and the GitHub Pages profile `https://github.com/User/User.github.io`.

## Installing

There are two possibilities, you already have these repositories created in your GitHub account or you don't.

### Fork

If you don't have a repository created yet, you can simply fork them and give them the correct names.

- [User](https://github.com/SantiagoRR2004/SantiagoRR2004/fork)
- [User.github.io](https://github.com/SantiagoRR2004/SantiagoRR2004.github.io/fork)

### Manual Copy

You need to have a downloaded copy of the repositories in your local machine. You change them with the following commands:

```bash
git remote add temp <https://github.com/SantiagoRR2004/SantiagoRR2004.git> && \
git fetch temp && \
git checkout -b imported-branch temp/main && \
git remote remove temp && \
git branch -M main && \
git push origin main --force && \
```

```bash
git remote add temp <https://github.com/SantiagoRR2004/SantiagoRR2004.github.io.git> && \
git fetch temp && \
git checkout -b imported-branch temp/main && \
git remote remove temp && \
git branch -M main && \
git push origin main --force && \
```

## Workflows

Both repositories have GitHub Actions workflows that automate some tasks. After installing the repositories, you should got to the Actions tab in each repository to make sure that all the wokflows are able to run automatically.

### User Repository

There are three workflows in this repository that need to be activated for the most recent GitHub data to be shown on your profile.

#### `main.yml`

This workflow runs every day at midnight and updates the GitHub statistics shown on your profile.

#### `reset.yml`

This workflow cleans the git history of the automatically generated files to reduce the repository size.

#### `update.yml`

This workflow updates the repository to have the most recent utilities. It is automated to run at the end of the year. Is something doesn't work as expected or you want to have the most recent changes, you can manually trigger it from the "Actions" tab. It basically runs the same commands as in the [Manual Copy](#manual-copy) section.

### User.github.io Repository

This repository only has one workflow that is also updates automatically just like the [`update.yml`](#updateyml) workflow in the normal profile repository.

This repository must also be set up to be published as a GitHub Pages site. You can do this by going to the "Settings" tab, then to the "Pages" section, and selecting the `main` branch as the source.
