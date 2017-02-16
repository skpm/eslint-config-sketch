# eslint-config-sketch

eslint config with the global variables that [Sketch.app](https://www.sketchapp.com/)'s JavaScript environment contains (Sketch + macOS headers).

### Installation

```
npm install --save-dev eslint-config-sketch
```

### Configuration

Add in your `.eslintrc`:

```diff
{
+ "extends": ["sketch"]
}
```

### License

MIT
