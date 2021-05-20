# Whack-A-Mole

This project ties together the CSS stuff that you've learned, so far this week:
positioning, hover effects, transitions, and overflow. When you're done, you
should have a nice Whack-a-Mole game that you can play and share with your
friends!

![Mole game screenshot]

## Getting started

To get started with this project, clone the starter repository from
https://github.com/appacademy-starters/responsive-design-whack-a-mole.

That starter repository contains the following files:

* **mole-head.png** which contains the image of the mole's head.
* **mole-hill.png** which contains the image of the dirt pile.
* **mole.css** which is the file in which you will write your CSS.
* **mole.html** which is the file in which you will write your HTML.
* **mole.js** which is the file in which you will write your JavaScript.

## Making a mountain out of a mole hill

That's not true. There are no mountains in this game.

The first challenge is to get the layout of an individual mole and its hill
correctly. You can see from the screenshot above that the dirt pile seems to be
_in front of_ the mole image. That means that there needs to be some kind of
_layering_ that needs to occur.

You may remember from the positioning reading, that when you absolutely position
an element, it removes it from the normal flow and puts it in a stack above the
other elements. Here is the screen shot that you previously saw where the pink
and blue boxes are absolutely positioned, taken out of the normal layout flow,
and stacked on top of one another.

![Absolutely positioned pink and blue boxes]

That's what you'd like to do with the mole head and the dirt pile. Here's an
orthogonal view of how the layers would look if you could look at the screen
from the side with the sizes of each of the elements shown.

![Mole head and hill layers]

Similarly to what you experienced in the positioning of the blue and pink boxes,
you want to create some kind of HTML element that contains the head and hill.
The parent element needs to have relative positioning. The elements that have
the head and hill need to be absolutely positioned.

Open up **mole.html** in VS Code. In the body, add a `div` element. Inside the
`div` element, create two image elements, one that uses **mole-head.png** as its
source and the other that uses **mole-hill.png** as its source. The image that
needs to be "on top" has to be the second one, so order matters here: first the
head image, then the hill image. (In case you forgot how to create an image
element, here's the [img documentation].)

Open up the **mole.html** file in your browser. If you did things right, your
page should look like this, right now. Just two images hanging out next to each
other.

![Mole images unstyled]

Now, it's time to get them properly "layered". After that, you will get them
positioned correctly so everything's properly lined up. To do this, you need
some CSS classes.

Following good maintainability standards, you need to come up with a name for
this Block that you're creating. It is meant to represent a whackable game
space. It contains a mole head and a dirt pile. The mole head and the dirt pile
have no standalone meaning, they exist inside this game space for a reason. If
they were outside the game space, then there existence would have another
meaning altogether. That means the mole head and dirt pile are Elements of the
Block. So, using BEM, you could create the following class names to represent
these HTML elements.

| Class name                             | BEM type | Reason for existing                                                   |
|----------------------------------------|----------|-----------------------------------------------------------------------|
| wgs (short for "whackable game space") | Block    | Used to encapsulate all of the things that are needed to whack a mole |
| wgs__mole-head                         | Element  | Used to target the mole head                                          |
| wgs__dirt-pile                         | Element  | Used to target the dirt pile                                          |

Using those (or whatever you dreamed up), add those classes to the appropriate
targets, the `div` and the two `img` elements.

Open up the **mole.css** file. Create three CSS rules, one for each of the
classes that you added to the elements. (Remember that a CSS rule is the
selector , the curly braces, and the properties to set.) Add "height",
"position", and "width" properties to each of the three rules setting them to
the indicated values in that layer diagram from above.

If you got that set up, it should look like this, now.

![Mole images layered]

That's great! There's some real layering going on, here! Now you need to do
some positioning. The following diagram shows you how things should be moved
around to fit properly into the space.

![Mole image dimensions]

It's important to note that when you move absolutely-positioned elements
horizontally within their parent elements, you don't have to specify _both_ the
right and left unless you want to do some weird stretching. The same goes for
vertically. You don't have to specify _both_ the top and the bottom. For the
dirt pile, for example, you can specify `bottom: 0;` which means you want the
image zero pixels away from the bottom _or_ you can specify `top: 262px;`
because you want the top to be 262 pixels from the top of the `wgs` div. Either
works. Once you have the top, left, bottom, _OR_ right values set for the mole
head and the dirt pile, you should end up with it looking like the image above.

![Mole images positioned]

If for some reason your images don't align like that with the numbers provided,
try adjusting the value that you used for the mole head to make it look correct
in your browser.

## Hiding the mole

Now that you have the mole aligned properly, you need to get it so the mole can
go down into its hole to hide from your whacker. In the **mole.html**, copy and
paste the `div` and its images so you have two moles and dirt piles on your Web
page. Because those `div` elements are "block" elements by default, they end up
on top of each other. Just to make it easier _for now_, set the `display`
property of the Block CSS class to "inline-block";

![Game spaces inline block]

You are going to make it so the mole head of the right image is hidden. You want
to hide it by moving it down so that it is visually vertically beneath the pile
of dirt. That is a perfect example of a BEM Modifier. Recall that a Modifier is
used to _change appearance, behavior, or state_. In this case, it changes the
state of the mole head by moving it "down into the ground".

You will want to animate this, eventually, so you can't just set the `top`
property, if you recall. The `top` and other placement specifiers cannot be
animated using CSS. Instead, you'll want to use the `margin-top` property to
"move" the image down by increasing the margin above the element.

Create a new CSS class named `wgs__mole-head--hidden` which indicates that this
is the "hidden state" Modifier for the "mole-head" Element of the "wgs" Block.
Add that class to the second mole head in your HTML. Then, create a CSS rule for
that CSS class. You want to move the top of the mole head all the way to the
bottom of the `div`, visually beneath the dirt pile. To do that, set the
`margin-top` property of the rule for `wgs__mole-head--hidden` to the height of
the Block. Once you do that and refresh your HTML page in the browser, it should
look like this.

![Unclipped mole head]

That looks good. It's now beneath the pile of dirt. But, because the overflow of
HTML elements is visible by default, you need to clip that overflow so that you
will _only_ see the content when its inside the rectangle described by the `div`
and not outside of it. This is where the `overflow` property comes into play.
Add the `overflow` property to your Block CSS class and hide the overflow
content. Once you do that, it should now look like this.

![Clipped mole head]

The mole head is still there. It's just that you've hidden anything outside of
the boundaries of the Block element. Because of that, it is now hidden.

## Animating the disappearing mole head

Now that you have that set up, it's time to add some animation to get that mole
head out of the way with some panache. All you have to do is set the
`transition` property of the Element CSS class for the mole head. Set it to
"margin-top" and give it a transition duration of 0.25 seconds. If you refresh
your screen, nothing will have seemed to change. That's because transitions only
affect when CSS property values _change_.

In previous examples, the values of CSS properties changed because you hovered
over an element or something cool like that. Changes to CSS property values can
also be triggered when JavaScript adds or removes a CSS class from an element.
That's what you'll do to see if everything is working.

To test it, remove the Modifier CSS class from the mole head image in the HTML.
Refresh the browser and make sure you can see both of the mole heads, now. Then
add the following JavaScript block to the **mole.js** file. If you used
different CSS class names in your code, adjust the code below to target the CSS
class names that you used.

```js
window.addEventListener('DOMContentLoaded', () => {

  setInterval(() => {
    const moleHeads = document.querySelectorAll('.wgs__mole-head');
    for (let moleHead of moleHeads) {
      moleHead.classList.toggle('wgs__mole-head--hidden');
    }
  }, 1000);

});
```

If everything worked correctly, you should now see this!

![Moles popping up and down]

When you get tired of looking at that, delete the JavaScript and continue.

## Making the playing field

The original screen shot had eight mole heads in two rows of four. Two rows.
Four columns. That sounds like a job for a specific kind of layout.

The playing field is another Block. Go ahead and put a `div` element _around_
the two `div` elements that you already have. Add a Block CSS class name to that
outer `div` element. (For the sake of this article, the BEM class used for it
will be "pf", short for "playing field".) Then, copy and paste six more of the
`wgs` Blocks in that outer `div`. When you refresh the page, you should now see
eight mole heads and dirt piles. You may have to scroll around to see them
because those images are kind of large.

You can fix that by going into your **mole.css** file and dividing all of the
widths, heights, lefts, bottoms, tops, rights, and margin tops by 2. For
example, the `width` property of the `wgs__dirt-pile` is set to 640 pixels. Just
divide that value by two (640 / 2 = 320), and set the `width` to that value. If
you have an odd number, when you divide it by two, just round it either way and
use that. When you refresh the screen, all of the visuals should just be half as big.

![Eight moles not in a grid]

Even though on your screen it may look like they're in two rows of four columns
each they're not. If you adjust the size of the window, the images will reflow
and end up in different places. Now, use CSS Grid Layout to make it so the eight
game spaces are appropriately laid out.

Set the `display` property of that outer `div` element's Block CSS Class to
"grid". (In this article, the name of that class is `pf`, short for "playing
field".) Because you're not doing any tricky spans in this layout, just define
the Grid Layout to have two rows and four columns.

![Eight moles in a grid]

**Note**: If you're working on a smaller screen and can't see all of the moles,
then cheat a little bit and add this to your CSS file. It'll zoom out the page
and make the moles smaller for you.

```css
/* Only add this if you have a hard time seeing
   all of the moles or you just want to try it
   out. */
body {
  zoom: 0.75;
}
```

## The game

Now that everything seems to be properly positioned and have the ability to
animate, it's time to get the game a working.

## Step 1: all moles are hidden at first

Go through the HTML and add to the mole head `img` elements the Modifier CSS
class that you created earlier.

![Empty playing field]

## Step 2: popping up moles

In the **mole.js** file, create a function named `popUpRandomMole`. It should

* select all of the mole head elements on the page (there should be eight) by
  maybe using `document.querySelectorAll()` or
  `document.getElementsByClassName()` (those return lists of elements)
* calculate a random number between zero and seven, inclusive
* use that random number as the index of the list that you got for the mole head
  elements
* remove the `--hidden` Modifier CSS class from the mole head element
* set a timeout for one second to call another function named `hideMole` with
  the mole head element that you already selected

Now, create a function named `hideMole` that takes one parameter. It should

* add the `--hidden` Modifier CSS class from the element passed in as an
  argument
* set a timeout for one second to call `popUpRandomMole`

Finally, add an event listener for the "DOMContentLoaded" event. In the event
handler, set a timeout zero seconds to call `popUpRandomMole`

Assuming you got that coded correctly, here's what you should now see.

![Moles randomly popping up]:

## Step 3: whack the mole

In the event handler that you have for the "DOMContentLoaded" event, select all
of the mole head elements on the page. For each one, add an event listener for
the "click" event. In that event handler, have it add back the `--hidden`
Modifier CSS class to the event object's target.

In `popUpRandomMole`, change the timeout value to call `hideMole` from one
second to three seconds. this should give you some time to actually "whack" a
mole.

When you refresh the page, the moles should wait around for three seconds before
automatically hiding. You should also be able to click a mole to make it hide
immediately.

## Step 4: marking a mole whacked

CSS classes aren't just for styling. They can also add meaning to an element
that you can then use later in your program. That's what you'll do in this
section.

In the click event handler that you have where you whack a mole, add _another_
class to the event's target. This is another Modifier CSS class to indicate the
state of the mole head as "whacked". Earlier, you created a Modifier class to
indicate that the mole head is hidden. In this article, it is named,
`wgs__mole-head--hidden`. A class to mean "whacked" could then be
`wgs__mole-head--whacked`. If you use that name, great! If you come up with your
own Modifier name, that's great, too! Either way, that's the name of the class
that you want to add to the event target in the "click" event handler.

Now that the whacked moles are marked, the `popUpRandomMole` function should
choose only moles that are _not_ marked with that `--whacked` Modifier class.
You may recall from your readings that there is a `not()` pseudo-selector
available to you. You want `popUpRandomMole` to select elements _with_
`wgs__mole-head` and _without_ `wgs__mole-head--whacked`. That's a compound
selector that looks like this.

```css
.wgs__mole-head:not(.wgs__mole-head--whacked)
```

Change out the simple selector in `popUpRandomMole` with that one.

Because that selector could now return anywhere between zero and eight mole
heads, you have to change the way that you generate your random number that
you'll use for your index. Instead of it being between zero and seven, you need
it to be between zero and the number of unwhacked moles returned in the list
returned by that selector. Once you update that, refresh your page. Whacked
moles stay whacked!

## Winning the game

If you play this, now, you will find that after you whack all eight moles, you
may get a JavaScript error. That's likely because the selector in
`popUpRandomMole` is returning an empty list because all of the moles are
whacked. Put a test after your code selects that list. If the list length is
zero, you won! Have it indicate that in some way and just exit the function.

## Bonus: fast and furious

Instead of "winning" the game by whacking all of the moles, make it score based.

Have the game only popup moles 30 times. You should keep track of the total
number of whacks from the player and display it as the score. With each
successful whack, make the amount of time the mole stays popped up shorter. Have
the moles stop popping up after 30 moles are shown and indicate that the game is
now over. (To do this, you'll have to stop marking the moles as whacked or
change the selector back to selecting all moles.)

Show a countdown of how many moles are left in the game. Show the player's
score. Style it so it doesn't look bad with your CSS super powers.

Align the game spaces in the grid so that they're centered within their own
column.

Here's an example of what that would look like.

![Final game movie]


[Mole game screenshot]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/whack-a-mole-2.png
[Mole head and hill]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-hill-top-down.png
[Mole head and hill layers]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-hill-layers.png
[Absolutely positioned pink and blue boxes]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/layout/assets/absolute-blue-box.png
[img documentation]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img
[Mole images unstyled]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-images-unstyled.png
[Mole images layered]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-images-layered.png
[Mole image dimensions]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-hill-top-down.png
[Mole images positioned]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-images-positioned.png
[Game spaces inline block]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/games-spaces-inline-block.png
[Unclipped mole head]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-head-beneath-dirt-pile-unclipped.png
[Clipped mole head]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-head-beneath-dirt-pile-clipped.png
[Moles popping up and down]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/moles-popping-up-and-down.gif
[Eight moles not in a grid]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-playing-field-of-eight.png
[Eight moles in a grid]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-playing-field-in-grid.png
[Empty playing field]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/mole-game-1.png
[Moles randomly popping up]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/moles-randomly-popping-up.gif
[Final game movie]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/interactivity/assets/moles-bonus-final.gif
