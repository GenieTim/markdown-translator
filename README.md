# Markdown Translator

其他语言：[中文](./README.zh.md)

> Directly translate markdown file using Azure Text Translate API

## Prerequisites
Get Text Translate API Key from [Azure Cognitive Services](https://docs.microsoft.com/en-us/azure/cognitive-services/translator/translator-text-how-to-signup)

## Quick Start
### Use as cli
```bash
# install cli
npm install markdown-translator -g

# set key from Azure Text Translate API
md-translator set --key <your key>

# do translate
md-translator translate --src README.md --dest README.zh.md --to zh

# get more infomation
md-translator --help

```

### Use as binaries
> Run markdown-translator without Node environment

- Update config.json with your Azure Text Translate API.
- Run `npm run dist:mac` to build for macos and `npm run dist:win` for windows.
- Run the dist binary files like cli, e.g, `./markdown-translator translate --src README.md --dest README.zh.md --to zh`

> Modify dist scripts according to your platform. Find more at [here](https://github.com/zeit/pkg)

### Use as a module
```bash
# install module
npm install markdown-translator
```

```javascript
const markdownTranslate = require('markdown-translator')
markdownTranslate({
  src,
  from,
  to,
  subscriptionKey
}).then(res => {
  // deal with result
})
```



