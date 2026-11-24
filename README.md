Lab 3

1. What is the difference between props and state?

Props are the values a parent component passes down to a child, like the title and price I passed into ProductCard, and they are basically read-only for the child, while state is data a component keeps and manages by itself, like the cart count in App, which can change over time and makes the component re-render when it does. So I think the easiest way to remember it is that props come from outside and state lives inside.

2. Why can a child component not modify the props it receives?

React is built around one-way data flow, meaning data goes from the parent down to the child, so the props a child gets are treated as read-only, and if the child could change them, it would be hard to tell where a value was changed, which would probably make bugs a lot harder to find. If a child needs something to change, it should ask the parent to do it, usually through a callback, and then the parent updates the value and passes the new one down.

3. How does the onAddToCart callback allow data to flow from child to parent even though props only flow downward?

The parent (App) defines the function handleAddToCart and passes it down to each ProductCard as a prop, so technically the prop is still going downward, but when the button is clicked, the child calls that function and gives it the product title as an argument, which means the function runs inside the parent with data that came from the child. So the data goes up through the function's arguments, not through the prop itself, which is how the cart message in App knows which item was last added.

4. Why is the key prop required when rendering a list with .map()? What could happen if it is missing or duplicated?

React uses the key to tell which item in a list is which, so when the list changes it can update only the items that actually changed instead of re-rendering everything, and the key should be unique and stable, like the product id. If the key is missing, React shows a warning and falls back to the index, and if keys are duplicated, React can get confused about which element is which, so I think things like wrong items updating, items not showing correctly, or leftover state attached to the wrong item could happen.

5. What does the children prop allow you to do that a normal prop does not?

The children prop lets me put content between the opening and closing tags of a component, like <ProductCard><span>New</span></ProductCard>, so the parent can decide what goes inside the card, such as a badge, without ProductCard needing a special prop for it. A normal prop is usually a single value like a string, number, or function, while children can be whole pieces of JSX, which makes the component more flexible and reusable, and in my case it let two cards show "New" and "Sale" while the others show nothing.

LAB4

1. Why do we use two separate states, searchText and debouncedSearch, instead of only one?

searchText updates on every keystroke so the text box shows what I'm typing, while debouncedSearch only updates after a 300 ms pause and is the one used for filtering. With only one state, the list would re-filter on every letter.

2. What would happen if the debounce effect did not return a cleanup function?

The old timers would never be cancelled, so every keystroke would still fire its own update later, and the list could flicker through older values. The cleanup calls clearTimeout so only the last pause in typing updates debouncedSearch.

3. What is the purpose of the dependency array? What happens if it is empty ([])? What happens if it is left out completely?

It tells React when to run the effect again. If it is empty, the effect runs only once after the first render, and if it is left out, the effect runs after every render.

4. Why should we avoid sorting the original products array directly?

sort() changes the array it is called on, so the original order would be lost, and changing data in place can cause bugs in React. I sorted a copy made with the spread operator instead.

5. Is the filtered product list better stored in its own state, or calculated from existing state during rendering? Explain your choice.

I think it is better to calculate it during rendering, because it can already be worked out from products, debouncedSearch, category, and sortOrder. Storing it in its own state would keep the same data in two places, and it could get out of sync with the filters.
