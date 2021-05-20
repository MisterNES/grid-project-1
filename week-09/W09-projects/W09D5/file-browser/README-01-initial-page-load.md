# Initial Page Load

A good place to start with the HTML, CSS, and JavaScript for your application is
to handle what happens when the page loads. This can occur when a person first
comes to the page or they refresh it.

![Initial load animated]

These are not step-by-step instructions. Rather, this is a bunch of advice for
you to put together this first step. Please read all of it before writing code.
Then, refer to it as you write the code with your pair.

Your page should take the following steps when it loads:

1. Show a partially-transparent overlay with a loading message
2. Make a `fetch` call to get the initial data to show
3. When the `fetch` succeeds:
   1. Populate the data with the values that came back from the server
   2. Update the tree view with the new data
   3. Hide the overlay so the person can interact with the application
4. When the `fetch` fails, show an error message asking them to try refreshing

## Important note

Make sure you have started the server by running `npm start`.

Make sure you view your code by opening http://localhost:3001 in your browser.
If you don't do that, your AJAX calls will fail, most likely.

## Overlays

Think about how you can create "an overlay". An overlay is an HTML element that
has a partially-transparent background. It is "on top" of all other HTML
elements in the page; it "lays over" all the other elements, hence the name.
You already know how to cause an element to leave the normal flow of the layout and be
on top of other elements using positioning.

One thing you may not know how to do is to get your HTML element that acts as
your overlay to fit the size of the entire window. In earlier lessons and
projects, you were advised that for non-static positioned elements, you didn't
have to set the `top`, `left`, `right`, and `bottom` properties to get it
properly position. For an overlay, you set all four of those properties in the
CSS rule for your HTML element. That _stretches_ the element to the four sides
of the screen. Try something like the following as a starting point.

```html
<div class="overlay">Overlay</div>
```

```css
.overlay {
  background-color: rgba(0, 0, 0, 0.6);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
```

The reason that developers use overlays is to prevent users from clicking on the
elements beneath it. That allows the developer to load all the HTML, CSS, and
JavaScript but not have to worry about a person clicking on something they
shouldn't because there's no data, yet.

Overlays are a type of "modal" window, which is a window that blocks you from
using stuff under it. This is an example from the Windows operating system. When
a software application attempts to make some changes to the computer, Windows
will pop up the following modal window which prevents you from doing anything
else until you click "Yes" or "No".

![modal window](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/file-browser/modal-window.jpg)

## Fetching the initial data

You want to get the contents of the "root" directory from the API when your
page loads. That way, it will show the files and directories that they can
click on. The specifications for that API call are:

```
HTTP Verb: GET
URL: http://localhost:3001/api/path/
```

As you likely recall, a GET request has no body to it, so there's nothing else
you need to send. You'll want to take the data that comes back from that and
put it in memory. This will be a proper "tree" of data in that a node represents
a file or directory. If it is a directory, then it can have children.

This is _not_ a binary tree since directories can have multiple files and other
directories in them. You'll want to consider using a general tree node
structure. Start by writing the constructor to initialize a `DirectoryTreeNode`:

```js
class DirectoryTreeNode {
  constructor(name, type, lastModifiedTime) {
    this.name = name;
    this.type = type;
    this.lastModifiedTime = lastModifiedTime;
    this.children = [];
  }
```

Now you'll add a getter for your `DirectoryTreeNode` class to return icon type
names. `getIconTypeName` will return a 'name' based on the type of file so you
can look into the images directory and load the correct image file to display
next to our files. If it's a file, parse out the `extension` and use that as the
file type. Extensions are the bit after the file name such as `.jpg`, `.png`,
`.txt`, `.js`, and `.css`.

```js
  getIconTypeName() {
    if (this.type === 'directory') {
      return this.name;
    }

    if (this.type === 'file') {
      const dotIndex = this.name.lastIndexOf('.');
      if (dotIndex >= 0) {
        return this.name.substring(dotIndex + 1).toLowerCase();
      }
      return this.name;
    }

    return '';
  }
```

> Note: This can be smarter. Look at the icons available and perhaps make this
> better. For example, this will return "png" for PNG files. There is no icon
> for PNG. However, there is an icon for "image". Those kinds of mappings will
> improve your UI.

Now you'll add an `addChild` method to your `DirectoryTreeNode` class to attach
more children nodes to the `DirectoryTreeNode`.

```js
  addChild(child) {
    this.children.push(child);
  }
```

When your page loads your JavaScript for the first time, you can
create a root tree node into which you can add the children you get back from
the `fetch`.

You may end up adding your own methods and data that don't currently exist in
this node, but it's a good start.

## Populating the UI tree

![After initial page load]

Because this is the first load, you can ignore the different levels of the tree.
Start simple, just populating the first level of content. You can see that the
layout for the content has the following features.

* If it is a directory, it shows a disclosure triangle so users can expand it
* It shows an icon for the kind of file/directory that it is
* It shows the name of the entry
* If it is a file, it shows the last modified time

You can find lots of different triangle shapes to use for your disclosure
triangles in [unicode geometric shapes].

To insert a unicode character in CSS you can just put the code for the character
behind a `\` (backslash) character.  For instance this will produce a right
triangle unicode character (▶);

```css
content: '\25B6';
```

There is no such thing as an HTML tree element. So, it's up to you to make that
work in the way that you think is best. You'll need a container to hold the
tree.

```html
<section id="tree-section" class="tree-section"></section>
```

One way you can actually make the tree is to return to that old standby the
unordered list, the `ul` element. When you get data from your `fetch` and put it
into `DirectoryTreeNode` objects, you can loop over those children and add `li`
elements to the `ul` element using JavaScript. Something like the following
functions would likely work. You just need to call it with the property HTML
element as the first parameter and the root data tree node as the second
parameter. The use of those images and their specific URLs is discussed in the
next section. Note the use of our `getIconTypeName()` function we introduced
earlier.

```js
function updateVisualTree(element, directoryTreeNode) {

  // Create an unordered list to make a UI for the directoryTreeNode
  const ul = document.createElement('ul');
  ul.classList.add('tree');

  // Create a list element for every child of the directoryTreeNode
  for (let child of directoryTreeNode.children) {
    updateVisualTreeEntry(ul, child);
  }

  // Update the tree with the newly created unordered list.
  element.appendChild(ul);
}

function updateVisualTreeEntry(treeElement, child) {
  const li = document.createElement('li');
    li.classList.add('tree-entry');

    // Create a list element with a file icon
    if (child.type === 'file') {
      li.innerHTML = `
        <div class="tree-entry__disclosure tree-entry__disclosure--disabled></div>
        <img class="tree-entry__icon" src="/icons/file_type_${child.getIconTypeName()}.svg">
        <div class="tree-entry__name">${child.name}</div>
        <div class="tree-entry__time">${child.lastModifiedTime}</div>
      `;

    // Or create a list element with a folder icon
    } else if (child.type === 'directory') {
      li.innerHTML = `
        <div class="tree-entry__disclosure tree-entry__disclosure--closed"></div>
        <img class="tree-entry__icon" src="/icons/folder_type_${child.getIconTypeName()}.svg">
        <div class="tree-entry__name">${child.name}</div>
        <div class="tree-entry__time">${child.lastModifiedTime}</div>
      `;
    }

    // Add the newly created list element into the unordered list
    treeElement.appendChild(li);
}
```

These two functions generate the HTML for two different BEM Blocks. The `tree`
block is a `ul` that contains multiple `tree-entry` blocks which are `li` tags.
A `tree-entry` block contains all the elements for a particular file or
directory, like it's icon, name and time.

#### updateVisualTree

| BEM class | Element                             |
|-----------|-------------------------------------|
| `tree`    | The `ul` that contains tree entries |

#### updateVisualTreeEntry

| BEM class                          | Element                                                        |
|------------------------------------|----------------------------------------------------------------|
| `tree-entry`                       | The `li` that is the tree entry                                |
| `tree-entry__disclosure`           | The disclosure triangle                                        |
| `tree-entry__disclosure--closed`   | The closed state of the disclosure triangle                    |
| `tree-entry__disclosure--opened`   | The opened state of the disclosure triangle                    |
| `tree-entry__disclosure--disabled` | The disabled state of the disclosure triangle (Used for files) |
| `tree-entry__icon`                 | The icon                                                       |
| `tree-entry__name`                 | The filename                                                   |
| `tree-entry__time`                 | The modification time                                          |

## Icons

There are about 90 icons for you to use in the **icons** directory inside
**your-code**. The URLs for those images are
`http://localhost:3001/icons/file_type_«type».svg`. For example, if you have a
JavaScript file, you can use the URL
"http://localhost:3001/icons/file_type_js.svg" for your image and it will be
sent back from the project's server.

If your server is running, you can copy and paste those links into your browser
to see them.

There are three types of icons in the directory.

| Name                          | Type               | What it shows                                                             |
|-------------------------------|--------------------|---------------------------------------------------------------------------|
| file_type_«type».svg          | File icon          | It shows a pretty icon for that file type.                                |
| folder_type_«type».svg        | Closed folder icon | It shows a pretty icon for that kind of directory.                        |
| folder_type_«type»_opened.svg | Opened folder icon | It shows a pretty icon for that kind of directory with the folder opened. |

If you ask for a icon that doesn't exist, it will send back the default icon
image for that type of icon. So, if you create an image element with the
URL "http://localhost:3001/icons/folder_type_DOES_NOT_EXIST.svg", then the
default folder icon is sent back to the browser.

If you use the URL
"http://localhost:3001/icons/folder_type_DOES_NOT_EXIST_opened.svg", then the
default _opened_ folder icon is sent to the browser.

If your server is running, you can copy and paste those links into your browser
to see them.

## Fetch your files

At this point, you should see your `Loading...` overlay div in
http://localhost:3001/. After all the DOM elements have loaded, make a `fetch`
call to `/api/path`. Use an asynchronous event listener to wrap your `fetch`
call and console log your `fetch` response.

```javascript
window.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('/api/path');
  console.log(response);
});
```

Now use `response.ok` to check whether the `fetch` response was successful or is
still loading. Use a [try...catch] statement to determine whether to hide the
`Loading...` overlay or display errors.

```javascript
window.addEventListener('DOMContentLoaded', async () => {
  const overlay = document.getElementById('loading-overlay');

  try {
    const response = await fetch('/api/path');
    if (response.ok) {
      overlay.classList.add('overlay--hidden');
    }
  } catch (e) {
    console.error(e);
    overlay.classList.add('overlay--error');
  }
});
```

The `fetch` response returns a promise. You need to format the response in 
JSON with `response.json()`. This results in an array of files in JSON format. 
Use the `name`, `type`, and `lastModifiedTime` properties of each file to create 
a `DirectoryTreeNode` for each file. Don't forget to append each new node to 
the tree. Hint: Add each node to the children of `dataTreeRoot` once it is 
initialized.

```javascript
window.addEventListener('DOMContentLoaded', async () => {
  const overlay = document.getElementById('loading-overlay');

  try {
    const response = await fetch('/api/path');

    // If the fetch was successful, format the response in JSON and
    // create a DirectoryTreeNode for each file
    if (response.ok) {
      const files = await response.json();
      for (let file of files) {
        const { name, type, lastModifiedTime } = file;
        const node = new DirectoryTreeNode(name, type, lastModifiedTime);

        // Append each new node to the tree's root
        dataTreeRoot.addChild(node);
      }

      // Hide the `Loading...` overlay upon successful fetch
      overlay.classList.add('overlay--hidden');
    }

    // Update the DOM tree with information from dataTreeRoot
    const uiTreeRoot = document.querySelector('#tree-section');
    updateVisualTree(uiTreeRoot, dataTreeRoot);

  // Console log errors and add a red overlay to alert the user of errors
  } catch (e) {
    console.error(e);
    overlay.classList.add('overlay--error');
  }
});
```

## More help

If you get stuck at some point, you can [download this ZIP] that contains an
implementation of the first step. Then, you can review it and figure out how to
get past what's blocking you.

The code in that file is only representative. It is _not_ the only way to achieve
this project. There are many ways to do this. That is one of the joys and
terrors of software development: there are 14 correct ways to do things,
usually.

[Initial load animated]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/file-browser/initial-load-animated.gif
[After initial page load]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/file-browser/step-01-complete.png
[unicode geometric shapes]: http://www.unicode-symbol.com/block/Geometric_Shapes.html
[download this ZIP]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/file-browser/step-01-implementation.zip
[try...catch]: (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)