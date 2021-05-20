# Closing A Directory Again

The simplest way to handle this is to remove the children of the node that
you're collapsing. That takes two steps: remove the HTML _and_ remove the data
from the data model. Then, when someone clicks it to expand, you just make the
same `fetch` call that you had before.

Give that a shot. Don't forget to change the folder and disclosure triangles
back to the "closed" versions.

## Bonus

Can you think of another way to do this that _doesn't_ delete the nodes and
keeps you from having to make another `fetch` call?

![Expanding and collapsing nodes]

[Expanding and collapsing nodes]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-Responsive-Design/response-design-projects/file-browser/step-03-complete.gif
