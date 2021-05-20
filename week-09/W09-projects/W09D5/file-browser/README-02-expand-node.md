# Expand A Directory

Now that you have some data appearing in the tree, it's time to literally take
it to the next level. You will now implement the functionality that will allow
you to expand directory nodes to look at the files and directories at the next
level down.

![Show expanding nodes]

## How this can work

There are some questions for which you need answers to complete this step.

1. How do I handle the click on a disclosure triangle?
1. When I do handle the click, how do I know what path to load?
2. Once I load more data, what do I do with it?
3. Once I have handled the data, how do I update the HTML?

The remainder of this article addresses each of those issues in order.

## Handling the click

If you're on this step, then you've successfully loaded data by using `fetch`
and the path "/". That should load the top-level data from the
**directory-browsed** directory resulting in something like this.

![After initial page load]

There's that disclosure triangle. But, it didn't exist when the HTML first
loaded. Instead, it showed up after you made that `fetch` for data. How do you
make an event listener that can handle a click on it?

One way to do it is that after each `fetch`, you find all the disclosure
triangles and add event listeners. However, you have to make sure that you
subscribe _only once_ to the click event on each triangle. If you subscribe
twice, it will handle the click twice, which would result in opening and
immediately closing the UI.

A more elegant solution is to have a single event listener attached to the HTML
element that contains the entire tree. Then, you can rely on event bubbling to
handle it. The only complexity with that solution is that you want to handle
clicks on the triangle and nothing else. But, that's much easier to do than
trying to keep track of all the elements that you've attached click handlers to
(as suggested in the previous paragraph).

Consider the following HTML from the proposed solution of the previous step.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>App Academy File Browser</title>
  <link rel="stylesheet" href="style/main.css">
  <script src="js/main.js"></script>
</head>
<body>
  <header></header>
  <main>
    <section id="tree-section" class="tree-section">
    </section>
    <section class="file-section"></section>
  </main>
  <footer></footer>
  <div id="loading-overlay" class="overlay">Loading...</div>
  <section id="#tree-section" class="tree-section"></section>
  <section id="#file-section" class="file-section"></section>
</body>
</html>
```

The element `#tree-section` is the element that contains the unordered list that
is the visual representation of the tree. You could attach an event listener to
that element. Then, when someone clicks, you can check to see if the target of
the event has the class name "tree-entry__disclosure--closed". That would mean
someone wants to open that node. If it has "tree-entry__disclosure--opened",
then that means someone wants to close that node. If it doesn't have either of
those, then the event handler could just ignore it. The skeleton for that code
could look something like this.

```js
document.querySelector('#tree-section').addEventListener('click', event => {
  const { target } = event;
  if (target.classList.contains('tree-entry__disclosure--closed')) {
    console.log('time to open the node');
  } else if (target.classList.contains('tree_entry__disclosure--opened')) {
    console.log('time to close the node');
  }
});
```

Depending on how you solved the previous step, the strategy is likely the same.
Only the ids and class names would change.

> As a reminder, a `classList` is not an actual array. This means that using the
> `includes()` method wouldn't work in place of using the `contains()` method.

## Knowing that path

Now that you know which triangle was clicked, you have to find out the path to
that node so that you can make the correct call to the server using `fetch`.
What would be really nice is if there were a way that you could attach arbitrary
data to each HTML element that represents the disclosure triangle. Luckily,
there is a way to do that. You haven't learned about it, yet, so here's a small
lesson on _data attributes_.

### Creating data attributes

There is a long history of Web developers that created dynamic, data-driven UIs.
One thing that continued to frustrate them was how to keep together data that
they _needed_ to have in the HTML without doing a whole bunch of hacks and
workarounds.

Right now, for example, your tree likely has two nodes in it. At the time that
you are creating the nodes, the code is looping over the data that it received
from the server. At that time you have all the information you need. But, when
your code has finished running and a person clicks on a triangle, your code had
stopped running. You only know that a _click_ occurred.

You could try to reconstruct the path by doing a bunch of JavaScript to figure
out the directory name associated with the element that the person clicked. Your
JavaScript created HTML elements and added them to the DOM. The proposed
solution from the last step would create these elements to represent the row of
data for the "javascript-allonge-six" directory in the tree.

```html
<li class="tree-entry">
  <div class="tree-entry__disclosure--closed"></div>
  <img class="tree-entry__icon" src="/icons/folder_type_javascript-allonge-six.svg">
  <div class="tree-entry__name">javascript-allonge-six</div>
  <div class="tree-entry__time">2020-03-26</div>
</li>
```

The click occurs on `.tree-entry__disclosure--closed`. That element is stored in the
`target` property of the click event. You could, say, do something like this,
as ugly as it is. You can paste that into the earlier event handler in your
JavaScript file and see it work, if your HTML follows the _exact same_ layout as
the code snippet above.

```js
/* THIS IS BAD CODE. DON'T DO THIS. */
const directoryName = event.target.nextElementSibling.nextElementSibling.innerHTML;
console.log(directoryName);
```

Not only is that ugly, but it ties the code directly to the structure of the
HTML. What happens when you are asked to change the order of the elements in the
tree? That code (and all code like it) will immediately break. Instead, Web
developers desired a way to attach information directly to the HTML element of
interest rather than doing bad code like above.

Enter _data attributes_ with the introduction of HTML5.

With data attributes, you _add_ a custom attribute that starts with the letters
"data-" directly on the HTML element like this which you can easily do at the
time that you're generating it in your JavaScript.

So which element should we attach it to? Remember that our target is the disclosure
triangle. But this data doesn't really belong to the triangle, it really belongs
to the `tree-entry` element. But how we get a reference to it? Since our triangle
always lives inside of `tree-entry` we can simply use `target.parentElement`

The HTML for the data attribute would end up looking like this once we attach it
to the `li` element.

```html
<li data-path-name="javascript-allonge-six" class="tree-entry">...</li>
```

We can set this attribute from javascript right after we create the `li`
using the "dataset" property like so:

```js
  const li = document.createElement('li');
  li.dataset.pathName = 'javascript-allonge-six';
```

Then, when someone clicks on the disclosure triangle, your code can use the
"dataset" property of the `li` element to retrieve that value using the following:

```js
const treeEntryElement = event.target.parentElement; // Tip: We should make a
                                                     // variable for this
                                                     // because we may use it
                                                     // a lot.
const directoryName = treeEntryElement.dataset.pathName;
console.log(directoryName);
```

One thing you'll notice, is that the HTML attribute has dashes in it while
 the JavaScript property uses _camelCase_.

Here are the rules for converting data attributes to the JavaScript dataset property:

1. Take the data attribute name: `data-path-name`
2. Strip off the "data-" from it: `path-name`
3. Every place there's a "-", replace the dash and the following lowercase
   letter with the uppercase version of the letter
   * `path-name` has a `-n`
   * `-n` becomes `N`
   * `path-name` becomes `pathName`

### What to set the data attribute to

At the top level, it is sufficient to just set the data attribute to the name of
the entry. In the following screenshot, the directory **javascript-allonge-six**
has the name "javascript-allonge-six" and its path would be
"javascript-allonge-six".

![After initial page load]

If you look in the **directory-browsed** directory, you'll see that
**javascript-allonge-six** has a subdirectory named **manuscript**. When you
create an HTML element for that **manuscript** directory after loading the data,
and you set it to only "manuscript", then when the person clicks on it, you'll
send a request for `/api/path/manuscript` which doesn't exist. Instead, you need
to set the data attribute to the _full path_ of the node in the tree. For
example, here's a table that summarizes the proper settings for the data
attribute for some directories in **directory-browsed**.

| Directory              | Parent                 | Proper data attribute setting              |
|------------------------|------------------------|--------------------------------------------|
| javascript-allonge-six | _n/a_                  | javascript-allonge-six                     |
| manuscript             | javascript-allonge-six | javascript-allonge-six/manuscript          |
| code                   | manuscript             | javascript-allonge-six/manuscript/code     |
| markdown               | manuscript             | javascript-allonge-six/manuscript/markdown |

Luckily, you have a data structure in place that can make this a snap.

### Calculating the full path

The proposed solution from step one has this code snippet in it where it
has fetched the data and was adding it to the tree.

```js
const node = new DirectoryTreeNode(name, type, lastModifiedTime);
dataTreeRoot.addChild(node);
```

When it adds the new node to a parent node, inside the `addChild` method, the
parent node could set a "parent" property on the child node to itself.

```js
/* In DirectoryTreeNode */
addChild(child) {
  child.parent = this;
  this.children.push(child);
}
```

With that information added to the node, you can ask any node to calculate its
full path. That node will ask its parent for its full path and add that to their
name. Here's an example method that could be added to the `DirectoryTreeNode`
class found in the step one proposed solution.

```js
getFullPath() {
  // Special case for the root node with no name
  if (this.name === undefined) {
    return '';
  }

  let parentPath = '';
  if (this.parent !== undefined) {
    parentPath = this.parent.getFullPath();
  }
  return `${parentPath}/${this.name}`;
}
```

This is a form of recursion but with objects of the same class rather than a
function calling itself.

You can use a function like that to set a [data attribute] on the disclosure
triangle element when you're creating it in your own JavaScript. Think of how
you would populate a dataset when creating the visual tree. How might you
refactor `updateVisualTreeEntry`?

## Making the call

In the previous step, you just called `http://localhost:3001/api/path`. Now, you
have a path that you want to call. What do you give `fetch`?

```
HTTP Verb: GET
URL: http://localhost:3001/api/path/«full node path»
```

That's right. Just use what you got from `getFullPath` (or whatever you call it)
and append it to the URL that you're already using. If you want the contents of
the "manuscript" directory, you would call:
`http://localhost:3001/api/path/javascript-allonge-six/manuscript`.

## Handling the return data

Now that you have data from a call to `fetch`, what do you do once you get it
back? All you have at your disposal is the element that was clicked on and the
path associated with that element.

When you loaded the data for the first time, you took that data and likely
added it to the root node of a tree. Well, now, you don't need to add the data
to the root node, you need to add it to the node in the tree that corresponds
to the path in the data attribute. If this sounds like a search of the tree,
you are on the right track.

If you have a path like "/javascript-allonge-six/manuscript/code", you want to
give that to the root node and tell it to find the correct child. The root node
will take the first part of the path, "javascript-allonge-six", find the node
with that name in its list of children, and then ask _that_ node to find the
correct child of just "/manuscript/code".

Then _that_ node will take the first part of the path, "manuscript", find the
node in its list of children with that name, and ask that node to find the
correct node with the path "/code". The node will search its list of children
for the node with the name "code'.

When the node has found the node named "code", it will ask _that_ node (the node
named "code") to find the node with the path "". That last node will determine
that there is nothing left to find because the path it was given is "", and will
just return itself. Recursion, again, because tree data structures rely on them.

That will give you the correct node that you can then add the new data to that
you got back from the fetch.

## Updating the HTML

Now that you have added the data from the call to `fetch` to the correct node in
the data tree, what should you do with it? The answer is quite simple, really:
do what you did in the previous step when you did the initial page load.

Using the proposed solution as an example, the `#tree-section` of the DOM looks
like this before the initial fetch:

```html
<div id="tree-section" class="tree-section"></div>
```

and like this after the data comes back from the server:

```html
<section id="tree-section" class="tree-section">
  <ul class="tree">
    <li data-path-name="/javascript-allonge-six" class="tree-entry">
      <div class="tree-entry__disclosure tree-entry__disclosure--closed"></div>
      <img class="tree-entry__icon" src="/icons/folder_type_javascript-allonge-six.svg">
      <div class="tree-entry__name">javascript-allonge-six</div>
      <div class="tree-entry__time">2020-03-26</div>
    </li>
    <li class="tree-entry">
      <div class="tree-entry__disclosure tree-entry__disclosure--disabled"></div>
      <img class="tree-entry__icon" src="/icons/file_type_text.svg">
      <div class="tree-entry__name">example.text</div>
      <div class="tree-entry__time">2020-03-26</div>
    </li>
  </ul>
</section>
```

What happened was that some data came back, the JavaScript created a `ul`
element, filled it with `li` elements, and put it in `#tree-section`. You could
do the same thing with _create nested lists_! It is perfectly valid HTML to have
a `ul` element inside an `li` element!

That means, when someone clicks on the disclosure triangle for
"javascript-allonge-six" and the data comes back with some more entries, the
same function can make a `ul`, create some `li` elements and fill them with the
new data, and then put them as _the last child of the `li` that contains the
triangle that was clicked on_! (In your JavaScript, to get the parent element of
the target of the event, you would just use `event.target.parentElement`.) just
like we did before.

As it turns out, we already made a function that will update our tree, and
if you did it like the example code it accepts an element to append the new
tree to. So just call it and pass in our `event.target.parentElement`.

The only extra thing to do is to make sure we can style the nested tree entries
differently from the main entry. So this means we should just add a BEM modifier
class to the main tree element.

Something like `.tree--nested` should do the trick. Then we can give it
different styling to make it appear nested. _Hint: different grid columns?_

Here's what your final HTML should look like with the data attributes and
new css classes and the nested `.tree-entry` elements.

```html
<section id="tree-section" class="tree-section">
  <ul class="tree">

    <!-- We add the data-path-name attribute to all the li tags -->

    <li class="tree-entry" data-path-name="/javascript-allonge-six">
      <div class=" tree-entry__disclosure tree-entry__disclosure--closed"></div>
      <img class="tree-entry__icon"
        src="/icons/folder_type_javascript-allonge-six.svg">
      <div class="tree-entry__name">javascript-allonge-six</div>
      <div class="tree-entry__time">2020-03-26</div>

      <!-- We add the tree--nested modifier here -->

      <ul class="tree tree--nested">
        <li class="tree-entry" data-path-name="/javascript-allonge-six/manuscript">
          <div class="tree-entry__disclosure tree__entry__disclosure--closed"></div>
          <img class="tree-entry__icon" src="/icons/folder_type_manuscript.svg">
          <div class="tree-entry__name">manuscript</div>
          <div class="tree-entry__time">2020-03-26</div>
        </li>
        <li class="tree-entry" data-path-name="/javascript-allonge-six/LICENSE">
          <div class="tree-entry__disclosure tree__entry__disclosure--disabled"></div>
          <img class="tree-entry__icon" src="/icons/file_type_LICENSE.svg">
          <div class="tree-entry__name">LICENSE</div>
          <div class="tree-entry__time">2020-03-26</div>
        </li>
        <li class="tree-entry" data-path-name="/javascript-allonge-six/README.md">
          <div class="tree-entry__disclosure tree__entry__disclosure--disabled"></div>
          <img class="tree__entry-icon" src="/icons/file_type_md.svg">
          <div class="tree-entry__name">README.md</div>
          <div class="tree-entry__time">2020-03-26</div>
        </li>
        <li class="tree__entry" data-path-name="/javascript-allonge-six/need-to-be-fixed.text">
          <div class="tree-entry__disclosure tree__entry__disclosure--disabled"></div>
          <img class="tree-entry__icon" src="/icons/file_type_text.svg">
          <div class="tree-entry__name">need-to-be-fixed.text</div>
          <div class="tree-entry__time">2020-03-26</div>
        </li>
      </ul>
    </li>
    <li class="tree-entry" data-path-name="/javascript-allonge-six/example.text">
      <div class="tree-entry__disclosure tree__entry__disclosure--disabled"></div>
      <img class="tree-entry__icon" src="/icons/file_type_text.svg">
      <div class="tree-entry__name">example.text</div>
      <div class="tree-entry__time">2020-03-26</div>
    </li>
  </ul>
</section>
```

If you do it this way, you'll need to be smart about your layouts to make sure
they don't get all messed up. But, usually, layout is easier than HTML
management.

## Visual indicators

Don't forget to change the direction of the disclosure triangle when someone
clicks on it so they can have a visual indicator of what they've done.

Eventually, you should figure out how to update the folder icon from its
"closed" version to its "opened" version, too.

## Final advice

Please, don't give up trying on this. It's hard because it's the most complex
thing you've done, so far.

Should you get really stuck, here's a [link to a solution of this step].


[Show expanding nodes]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/file-browser/step-02-complete.gif
[After initial page load]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/file-browser/step-01-complete.png
[link to a solution of this step]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/file-browser/step-02-implementation.zip
[data attribute]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset#Examples
