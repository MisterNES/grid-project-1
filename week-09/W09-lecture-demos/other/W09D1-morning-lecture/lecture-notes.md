# W09D1 Lecture Notes

## General

### Week Overview

1. M, T, W: Paired, CSS Material
2. Thursday: Paired, AJAX Material
3. Friday: Solo, optional projects, study hall, study guide and practice assessment will be released.

### Tips for this Week

1. Learn by Doing
2. Use Chrome Dev Tools (pesticide)
3. Try it for yourself! Avoid asking "What if" questions and discover on your own. THEN ask the 'why did' question
4. There is a wide range of experience with CSS. If you have a lot of experience, GREAT! Please use that productively.
5. Declarative vs Imperative programming:
  Imperative: Explicit control flow (if, else, loops, etc); considered 'detailed,' can be close to 'bare metal.' Must have access to Objects before it works (ie DOMContentLoaded)
  Declarative: implicit control flow; Top to Bottom, interpreter (browser) does the control flow FOR you. Considered more 'functional.' Often Domain-Specific. Not 'bare metal'. Is applied as soon as possible, render engine renders before all content loads.

  what does this mean for you?: not many error messages.
6. [CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)

## Lecture Material

### HTML Setup

1. in VSCode, type `html:5` in the page and hit enter to setup boiler plate
2. inside the head, add a ```<link>``` tag with attributes rel, type, and href

### CSS Syntax Basics

1. Selector, Declaration Blocks, Property, Value
2. Semi-Colons b/w rules, NOT b/w Blocks
3. White space does not matter
4. Look out for conflicting rules
5. lots of short-hand (e.g. 'border' === 'border-left', 'border-right', etc...)

### Selectors

1. Type Selectors (aka Tag Selectors)
    NOTE: Highlight the Cascade!
2. Class Selectors (.className)
3. ID Selectors (#idName)
4. Universal Selectors (*)
5. Attribute Slectors (a[...])

### Compound Classes

1. space-separated in HTML
2. dot-separated in CSS

### Type

1. font-family
2. font-size: absolute (px, cm); relative (em, rem)
3. font-weight
4. text-align  (left, center, right, etc)
5. text-decoration (underline, none, etc)
6. text-transform (uppercase, lowecase, capitalize, etc)

### Background

1. background-color
2. background-image

### Box-Shadows

offset-x | offset-y | blur | spread | color
anything ommitted is 0.
