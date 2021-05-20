# Viewing A File

![Looking at text and images]

You've spent a lot of time doing the directories. Now, it's time to view a file.

When someone clicks on a file rather than a directory, you should now make a
different `fetch` call depending on the type of file it is.

>Hint: You might want to add a new data attribute to the `.tree-entry` elements
>describing if it is a `file` or a `directory` to make your life easier in the
>click handler.

You'll need the full path of the file to pass to fetch (Luckily we already 
stored these in a data attribute!)

```
HTTP Verb: GET
URL: http://localhost:3001/api/file/«full node path»
```

This API call works a little differently from the previous API calls we've made.
They have all returned a JSON string. This API however returns data in plain/text
format when we ask for the content of a text file. So we can't use our old friend
`response.json()` on this one. Instead we can use `response.text()` to grab the
plain/text data.

Once you get the content back, you can show it to the right of the tree in some
`pre` elements. `pre` elements make everything preformatted like a typewriter,
like a code editor.

## What files to handle

If it's a file that ends in any of the following, fetch the text data with the
API and show it in a `pre` block.

* css
* html
* js
* md
* rb
* text
* txt

If it's a file that ends in any supported image extension, create an image tag
with the path as the "src" attribute's value and show that to the right of the
tree. You won't need to call the API for handling images since you have the path
already.

**Bonus:** If you wanted to call the API for images, the API would return raw image
data and you would need to handle that appropriately. _(Consider this a hard bonus
challenge if you want to attempt it, but move on to the other parts of the project
before you do so)_

> Hints for Bonus: These links to MDN should give you some hints as to how to
> accomplish the bonus:
> Response: https://developer.mozilla.org/en-US/docs/Web/API/Response
> Blob: https://developer.mozilla.org/en-US/docs/Web/API/Blob
> URL.createObjectURL: https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL

Image extensions that browsers understand are:

* gif
* jpg
* png
* svg

## What to do with unhandled files

Nothing. Don't do anything.

[Looking at text and images]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/file-browser/step-04-complete.gif
