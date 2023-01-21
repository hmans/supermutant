# Monorepo Template

This is my monorepo template. It comes preconfigured with the typical stuff I use in my monorepos, and is intended to be a starting point for new projects. Naturally, all of this is heavily opinionated (with opinions shifting over the course of time). Feel free to fork and modify it to your liking!

## Features

- Uses [pnpm](https://pnpm.io/) for package and workspace management
- [TypeScript](https://www.typescriptlang.org/) support
- Comes preconfigured for [Jest](https://jestjs.io/) testing
- Packages are built with [Preconstruct](https://preconstruct.tools/), which also provides its wonderful dev mode
- A `packages` directory for packages, and `apps` for apps (examples, demos, ...)
- Support for [Turborepo](https://turbo.build/repo) (configured to peacefully coexist with Preconstruct's `dev` mode)
- Changelog and release management via [Changesets](https://github.com/changesets/changesets)
- GitHub Actions for CI and release management

Stuff that's missing:

- [ ] eslint

## Usage

There are three ways to use this template:

- If you're viewing this on GitHub, you can click the **"Use this template"** button in the upper right to create a new repository from this template.
- You can simply fork this repository and clone it locally.
- You can use `degit`:
  ```
  npx degit hmans/monorepo-template my-new-project
  ```

## Configuration

After forking and cloning this template repository, you may want to make the following configuration changes:

- Configure a `NPM_TOKEN` for GitHub Actions
- Remove/change `.github/FUNDING.yml`
- Set up TurboRepo cache and remote cache
- Delete/modify `example-package`

(Apologies for this just being a list of short bullet points, I will try to add some explanations over time.)

## Sponsoring

If you like this template or any of my [other open-source projects](https://github.com/hmans), consider sponsoring me on [GitHub Sponsors](https://github.com/sponsors/hmans).
