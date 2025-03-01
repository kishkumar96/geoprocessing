---
slug: "/cli"
---

# Command Line Interface

Each geoprocessing project provides a number of commands to get work done. They are accessible via your projects package.json `scripts` and run using `npm run <command>`

## Adding Building Blocks

- `create:report` - stubs out new report component and geoprocessing function
- `create:client` - stubs out a new report client
- `create:function` - stubs out a new geoprocessing function

## Datasource management

- `import:data` - import a new vector or raster datasource to the `data/dist` directory, for publish and use in preprocessing and geoprocessing functions, making any necessary transformations and precalculations.
- `reimport:data` - reimport an existing datasource. Use when a new version of data becomes available.
- `publish:data` - publishes imported datasources from `data/dist` to the projects `datasets` S3 bucket, for use by preprocessing and geoprocessing functions.

## Testing

Testing uses [Storybook](https://storybook.js.org/), [Jest](https://jestjs.io/) and the [React testing library](https://testing-library.com/docs/react-testing-library/intro/).

- `storybook` - loads stories for your reports and other UI components in your default web browser using a local storybook dev server.
  - Story files must be named `*.stories.tsx` to be picked up.
  - Storybook updates automatically as you make and save changes to your components.
- `start:data` - runs a local file server, serving up the cloud-optimized datasources in `data/dist`.
- `test` - executes all unit and smoke tests for the project

- `test:matching` - executes unit tests matching the given substring.
  - You will need to run `start:data` command manually before running this command if your functions accesses datasources published by this project (not global datasources).
  - See Vitest [-t](https://vitest.dev/guide/cli#options)
  - e.g. `npm run test:matching boundaryAreaOverlapSmoke` where smoke test is coded as follows

```typescript
test("boundaryAreaOverlapSmoke - tests run against all examples", async () => {
  ...
})
```

- `test:matching` - executes tests with name matching the given substring.
  - You will need to run `start:data` command manually before running this command if your functions accesses datasources published by this project (not global datasources).
  - See Jest [--testNamePattern](https://jestjs.io/docs/cli#--testnamepatternregex)
  - e.g. `npm run test:matching boundaryAreaOverlapSmoke` where smoke test is coded as follows

```typescript
test("boundaryAreaOverlapSmoke - tests run against all examples", async () => {
  ...
})
```

## Build and deploy

- `build` - bundles geoprocessing functions into a `.build` directory and report clients into a `.build-web` directory. Ready to be deployed.
  - `build:client` - sub-command for building just your report clients
  - `build:lambda` - sub-command for building just your geoprocessing functions
- `deploy` - deploys your built functions and clients to an AWS CloudFormation stack. Name of stack to deploy to is based on the name of your project in package.json. After initial deploy, use this same command to re-deploy.
  - `synth` - translates your project resources into an AWS CloudFormation template. This is automatically done as par of the deploy and you should not need to run this.
- `destroy` - destroy your current projects CloudFormation stack in AWS. Useful if a rollback fails and your stack is left in an inconsistent state. You should be able to re-deploy
- `bootstrap` - command to run `cdk bootstrap`. Usually only needed if deploying for first time with CDK to a region with your account. Run if your deploy fails and suggests you need to bootstrap.
- `url` - returns the root URL of the REST API for your deployment, which returns the project manifest.

## Upgrade scripts

- `upgrade` - installs the latest base configurations files and scripts from the geoprocessing library into your project. Migrates your code with breaking changes. If you've modified any base scripts locally you will need to view the changes in git and potentialy re-incorporate them.

## Language Translation

- `extract:translation`
  - Extracts all translations from your projects source code using babel and [babel-plugin-i18next-extract](https://github.com/gilbsgilbs/babel-plugin-i18next-extract). It also runs an additional script (`src/i18n/bin/extractExtraTerms.ts`) to extract strings from your project config (metrics.json, objectives.json) commonly displayed in reports for translation as `extraTerms`.
- `publish:translation`
  - Posts translations for all langauges to POEditor. Behavior is pre-configured via `src/i18n/config.ts`. Do not edit this file unless you need to.
  - Translations with namespace specified by `localNamespace` are written to POEditor with context value specified by `remoteContext`.
  - All english translations are published, overwriting any in POEditor, since the code is their source of truth.
  - For non-english languages, POEditor is the source of truth, so if a translation is not defined in POEditor, then a local project translation is published if available, otherwise a base translation will be published as fallback. Running `import:translation` after that will then import those base translations back and seed the local project translations.
- `import:translation`
  - Fetches translations from POEditor for all non-english languages having context value specified by `remotextContex` property in `src/i18n/config.son`. Any existing translation values will be overwritten. Translations are saved to the namespace specified by the `localNamespace` property in `project/i18n.json`.
- `sync:translation`
  - A convenience command to keep the code, local translations, and remote translations in sync. Simply runs in succession `extract`, `publish`, then `import`.
- `install:translation`
  - Use to manually upgrade your projects base translations from the installed geoprocessing library to the projects `src/i18n/baseLang` directory, overwriting any previous version. You should not normally need to run this, because it is already run after every time you run `npm install` such that if you upgrade your geoprocessing library version, it will be done automatically.
