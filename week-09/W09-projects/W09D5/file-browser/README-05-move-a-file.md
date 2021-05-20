# Moving A File

![Moving files around]

Now for some fun! Here's an interesting opportunity to do some neat state
management.

Add a "Move a file" button above the tree. When someone clicks on it, disable
the button and track their next two clicks. The first name they click on,
remember the full path. The second name they click on, _if_ it's on a directory,
call the API endpoint listed below. If it is not on a directory, don't do
anything. Either way, enable the button, again. Then, refresh the tree with the
new content. To refresh the tree, you can just use `window.reload();` and reload
the entire page.

```
URL: http://localhost:3001/api/entry/«file-or-directorypath»
HTTP Verb: PATCH
Body: { "destination": "«new path» }
```

That means that you'll have to construct an object with a property named
"destination" and set that property to the value of the new path.

During this procedure, if they click on a file name for either of the two
clicks, it should not show the file in the file pane.

>Hint: Take advantage of your data attributes to determine the paths and wether
>or not they have clicked on a file or a directory!

[Moving files around]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/file-browser/step-05-complete.gif
