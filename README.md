![Logo](assets/logo.png)

# Inflint

> Inflint is a tool which scans and verifies files and folders name conventions.

Inflint allows you to easily set file names convention in your repository.

[![npm version](https://img.shields.io/npm/v/inflint.svg?style=flat-square)](https://www.npmjs.org/package/inflint)

[![npm downloads](https://img.shields.io/npm/dm/inflint.svg?style=flat-square)](http://npm-stat.com/charts.html?package=inflint)

## Demo

![Inflint](assets/basic-demo.gif)

## Installation

**Globally**

```bash
npm install --global inflint
```

**Locally**

```bash
npm install --save-dev inflint
```

## Usage

```sh
$ inflint [options] [files]
```

## Configuration

You can specify the configuration of Inflint through various options.
Configuration can be set in the following files:

-   a `package.json` property: `"inflint": {...}`
-   a `.inflintrc` file in JSON or YAML format
-   a `.inflintrc.json`, `.inflintrc.yaml`, `.inflintrc.yml`, `.inflintrc.js`, or `.inflintrc.cjs` file
-   a `inflint.config.js` or `inflint.config.cjs` CommonJS module exporting an object

You can set a configuration file using our wizard:
```bash
npx inflint --init
```

### Rules format
When applying rules either via the CLI or other conifguration, you must follow the rules format.
`1` and `warn` are warnings rules, `2` and `error` are errors rules.
Each rule has key and value. The key represents the glob pattern. When a file matches the pattern, it will be enfocred by the rule.
They rule value represents the rule enforcement.
Rules enforcement format:
- Set rules of files-existence: `1 | 2 | 'warn' | 'error' | [1] | [2] | ['warn'] | ['error']`<br />
  **Example**: `{ 'src/**/*': 2 }` &rarr; Inflint will emit error if there are any files/folders inside `src` folder
- Set rules to match file names conventions: `[1, <convention>] | [2, <convention>] | ['warn', <convention>]| ['error', <convention>]`<br />
  **Example**: `{ 'src/**/*': [1, 'kebab-case'] }` &rarr; Inflint will emit error if there are any files/folder with "kebab-case" convention name inside `src` folder
- Set rules options: `[1, <convention>(optional), <options>] | [2, <convention>(optional), <options>] | ['warn', <convention>(optional), <options>] | ['error', <convention>(optional), <options>]`<br />
  **Example1**: `{ 'src/**/*': [1, { onlyFiles: true }] }` &rarr; Inflint will emit error if there are any files inside `src` folder (and ignores folders if there are)<br />
  **Example2**: `{ 'src/**/*': [1, 'point.case', { onlyFiles: true }] }` &rarr; Inflint will emit error if there are any files with "point-case" convention name inside `src` folder (and ignores folders if there are)


> If you provide unknown convention which isn't a readymade one or a configured alias, Inflint will consider the "convention" as regex.

### Rule option
You can set options for any rule, in order to get some customization.
- `onlyDirectories`: Boolean (default: `false`)
  
  Inflint will check the rule with directories only. Will skip files.

- `onlyFiles`: Boolean (default: `false`)

  Inflint will check the rule with files only. Will skip directories.

- `dot`: Boolean (default: `true`)

  Allow Inflint to match files and directories that begin with a period (.)

- `caseSensitiveMatch`: Boolean (default: `true`)

  Enables a case-sensitive mode for matching files.

### File names conventions
You can set file names conventions rules using known ones. Inflint allows you to set the following:
| Convention                 | Alias                        | Description                                                                                       | 
| :------------------------- | :--------------------------- | :------------------------------------------------------------------------------------------------ |
| lowercase                  | `lowercase`                  | Every letter must be lowercase. Ignores non-letters                                               |
| camelcase                  | `camelCase`                  | Must be in "camelCase" format. Only letters and digits are allowed                                |
| camelcase-point            | `camelCase.point`            | Must be in "camelCase" format. Only letters, digits and `.` are allowed                           |
| pascalcase                 | `PascalCase`                 | Must be in "PascalCase" format. Only letters and digits are allowed                               |
| pascalcase-point           | `PascalCase.Point`           | Must be in "PascalCase" format. Only letters, digits and `.` are allowed                          |
| snakecase                  | `snake_case`                 | Must be in "snake_case" format. Only lowercase letters, digits and `_` are allowed                |
| snakecase-point            | `snake_case.point`           | Must be in "snake_case" format. Only lowercase letters, digits, `_` and `.` are allowed           |
| screamingsnakecase         | `SCREAMING_SNAKE_CASE`       | Must be in "SCREAMING_SNAKE_CASE" format. Only uppercase letters, digits and `_` are allowed      |
| screamingsnakecase-point   | `SCREAMING_SNAKE_CASE.POINT` | Must be in "SCREAMING_SNAKE_CASE" format. Only uppercase letters, digits, `_` and `.` are allowed |
| kebabcase                  | `kebab-case`                 | Must be in "kebab-case" format. Only lowercase letters, digits and `-` are allowed                |
| kebabcase-point            | `kebab-case.point`           | Must be in "kebab-case" format. Only lowercase letters, digits, `-` and `.` are allowed           |
| pointcase                  | `point.case`                 | Must be in "point.case" format. Only lowercase letters, digits and `.` are allowed                |

### CLI Rules
When adding rules via the CLI, you need to provide a valid JSON for the `--rule` argument. You can provide multiple rules.
The JSON should follow the rules format described above.<br />
**Example**: `inflint --rule "{ \"src/**/*\": [1] }"`

### Aliases
You can use the readymade conventions, or you can add your own by applying aliases, via the CLI or other configuration.
To use the aliases, simply use the alias name as you would use readymade convention.
Aliases should be applied with the following format:
- `<alias_name>: <regex>` Inflint will apply the alias name to match the provided regex.<br />
  **Example**: Applying the alias `{ myAlias: '^.*$' }` and the rule `{ 'src/**/*': [2, 'myAlias'] }` &rarr; Inflint will match any file/folder in `src` directory and validates the provided regex matches it.
- `<alias_name>: [<regex>, <regex_flags>]` Inflint will apply the alias name to match the provided regex with given flags.<br />
  **Example**: `{ myAlias: ['^.*$', 'i'] }` &rarr; Any rule applied with `myAlias` alias will try to match file names by the provided regex and the `i` regex flag.

### CLI Aliases
When adding aliases via the CLI, you need to provide a valid JSON for the `--alias` argument. You can provide multiple aliases.
The JSON should follow the aliases format described above.<br />
**Example**: `inflint --alias "{ \"myAlias\": \"^\\.\" }"`

> You can escape aliases regex with in the CLI if you prefix character with `\\`.
> `"^\\."` will match any string begins with dot (`.`)



| CLI                     | Configuration key     | Type              | default          | Description                                                                                            |
| :---------------------- | :-------------------- | :---------------- | :--------------- | :----------------------------------------------------------------------------------------------------- |
| -                       | `extends`             | String            | -                | A path to configuration file to extend configurations from                                             |
| `--no-inflintrc`        | -                     | Boolean           | `false`          | Whether Inflint ignores any configuration file                                                         |
| `-c`, `--config`        | -                     | String            | -                | The path to a configuration file which will be used by Inflint                                         |
| `--rule`                | `rules`               | Above             | -                | Inflint rules to use against files                                                                     |
| `--alias`               | `aliases`             | Above             | -                | Inflint aliases to use together with rules                                                             |
| `--ignore-path`         | `ignorePath`          | String            | `.inflintignore` | Ignore file path Inflint will use to ignore patterns                                                   |
| `--no-ignore`           | `ignore`              | Boolean           | `false`          | Disable use of ignore files and patterns                                                               |
| `--ignore-pattern`      | `ignorePatterns`      | String[]          | `[]`             | Patterns of files to ignore (in addition to those in .inflintignore)                                   |
| `--quiet`               | `quiet`               | Boolean           | `false`          | Whether to report errors only                                                                          |
| `--max-warnings`        | `maxWarnings`         | Number            | `0`              | Number of warnings to trigger non-zero exit code                                                       |
| `--bail`                | `bail`                | Boolean or Number | `0`              | Number of failures (errors) to make Inflint to exit. Setting "bail" to true is the same as setting "1" |
| `-o`, `--output-file`   | `outputFile`          | String            | -                | Specify file to write report to                                                                        |
| `--color`, `--no-color` | -                     | Boolean           | `true`           | Force enabling/disabling of color                                                                      |
| `--init`                | -                     | Boolean           | `false`          | Run configuration initialization wizard                                                                |
| `-h`, `--help`          | -                     | Boolean           | `false`          | Show help                                                                                              |
| `-v`, `--version`       | -                     | Boolean           | `false`          | Output the version number                                                                              |
| `--env-info`            | -                     | Boolean           | `false`          | Output the environment version                                                                         |

## Examples

-   [landing-page](https://github.com/Vinyl-Depository/landing-page)
-   [landing-page](https://github.com/Vinyl-Depository/inflint)
-   [cz-vinyl](https://github.com/Vinyl-Depository/cz-vinyl)

## Support

For support, email dev@vinyldepository.com or open an issue at [inflint issues](https://github.com/Vinyl-Depository/inflint/issues).

## Contributing

Contributions are always welcome!

See `CONTRIBUTING.md` for ways to get started.

Please adhere to this project's `CODE_OF_CONDUCT.md`.

## Authors

-   [@tal-rofe](https://github.com/tal-rofe)

## License

[MIT](https://choosealicense.com/licenses/mit/)
