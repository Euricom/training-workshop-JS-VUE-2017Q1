# Exercise

> Use a button to toggle (hide/show) a paragraph of text

- Look for 3 solutions

----

## Exercise - Solution 1

v-if

```html
<span v-if="showText">
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aenean commodo ligula eget dolor. Aenean massa.
</span>
<button @click="onToggle()">Toggle text</button>
```

and onToggle method

```js
{
    data () {
        return {
            showText: true,
        }
    },
    methods: {
        onToggle () {
            this.showText = !this.showText
        },
    },
}
```

----

## Exercise - Solution 2/3

v-show

```html
<span v-show="showText">
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aenean commodo ligula eget dolor. Aenean massa.
</span>
<button @click="showText = !showText">Toggle text</button>
```

:class

```html
<head>
    <style>
        .hidden {
            display: none;
        }
    </style>
</head>

<body>
    <div id="root">
        <span :class="{ hidden: !showText }">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
            Aenean commodo ligula eget dolor. Aenean massa.
        </span>
        <button @click="showText = !showText">Toggle text</button>
    </div>
    ...
</body>
```
