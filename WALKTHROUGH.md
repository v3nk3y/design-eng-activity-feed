# Walkthrough

The commits are meant to be read in order. Each one does a single thing, so most of the reasoning is in the diffs.

## What I changed and why

**The feed**

- Each row is a real button inside a list now, instead of a `<div>` with an `onClick` and an index key. It also carries `aria-haspopup`, since it opens a dialog.
  - I put back the focus outline the starter had removed. I did this before any styling, because there's no point styling a row you can't reach with a keyboard.
- The feed was a fixed 720px wide, with the merchant name set to never wrap, so on a phone it ran off the screen and long names were cut off. It's fluid now.
- The merchant is bold, the category and date share one small grey line under it, and the amount is right aligned in tabular numerals so the decimals line up.
  - Everything used to be 16px in the same colour, so nothing looked more important than anything else.
- Failed amounts are struck through and grey, credits are green, and pending and failed get a badge.
  - There's a failed transaction in the default data that was showing as a normal debit, because the starter only ever rendered `pending`.
  - Posted doesn't get a badge. It's the normal case, and a badge on every row tells you nothing.
- The model has a `failureReason` that nothing was displaying. It now shows at the top of the detail panel.
- I replaced `formatAmount` with `Intl.NumberFormat`.
  - The old one ran a 500 iteration loop for every row, which is 500,000 iterations per render on the large list.
- Dates are formatted now, and the year only shows when it isn't this year. They arrive in two different formats and were being printed as they are.
- The list sorts newest first on `initiatedAt`.
- An account with no transactions used to show the heading and nothing else, which reads as broken. It says there are none now.

**The detail panel**

- It's a 440px panel on the right at 768px and up, and a full width sheet from the bottom below that, with rounded top corners. The width is one line: `width: min(440px, 100%)`.
- I used Radix Dialog for the focus handling, Escape and the ARIA parts. The styling is all custom, not a pre-built component. The idea of putting it at the edge came from shadcn's Sheet.
  - It's still a modal, but putting it at the edge instead of the centre keeps the feed visible and ties the detail to the row you clicked.
- It keeps the selected **id** rather than the transaction itself, and looks the record up in the current list. That way the panel can't show old data if the list changes.
- It reads top to bottom: why it failed, the amount and status, the description, then the memo.
  - The memo gets its own box because it's the only field a person typed. Everything under the divider comes from the system.
- Account masking drops when the last four isn't four digits. The sample data has one set to `----`, and `••----` would make a placeholder look like a real account number.
- Timestamps show the time in the viewer's timezone, and say which zone that is. The data doesn't include an account timezone, so I'd check with product which one they want.
- The dispute button is always available.
  - At first I had it disabled for pending and failed, assuming you can only dispute a posted transaction. I took that out. The brief asks for a clearly placed CTA and says nothing about eligibility, and the rule made the button useless on most rows. That's a product call.
- One row in the sample data carries most of the edge cases. `Unknown Merchant` is the only failed transaction, the only one with no category, the only one with no `postedAt`, and the only one whose account last four is `----`. Every other row is fully populated, so I used that one to check all of it.

**Animation**

- The overlay fades in and the panel comes in from the edge it sits on, so the movement tells you where it came from. If someone has reduced motion turned on, it fades instead.
- I tried the `motion` package first and dropped it. It needed a lot more code and a dependency, and it wasn't any smoother on the 1,000 row list. This only moves and fades, so the CSS version does the same job with less.
- Radix marks the panel as open or closed and keeps it on the page until the animation finishes, so the CSS works without `forceMount` and Radix still handles focus.

**One fix outside the requirements**

- The toolbar's Add gave the new transaction a random day in May, so once the feed sorted newest first it landed in the middle of the list and looked like nothing had happened.
  - Sorting didn't cause that, it just made it visible.

## What I intentionally did not change, and how I spent the time

I worked in this order on purpose:

1. Semantics and correctness first: real buttons, the focus outline, the formatter loop, the index keys.
2. Then the first requirement in small pieces: format, sort, hierarchy, amount colour, badges, empty state.
3. Then the detail panel, which was the biggest piece of work.
4. Polish last, once both requirements were done.

What I left alone:

- `src/types/transaction.ts` is fine as it is.
  - The split between `TransactionSummary` and `TransactionDetails` looks deliberate, so instead of editing it I typed the row against the summary half.
- Loading and error are handled in `App.tsx`, and the brief says they aren't a focus.
- The dev toolbar is your tooling, so I only changed the data generator behind it.
- I also left out date grouping, search, filters, virtualization, URL state, skeletons and dark mode.
  - All of those would have been visible work, but none of them help the two requirements more than what I spent the time on.

## Tradeoffs

- I used plain CSS with thirteen custom properties instead of Tailwind. At this size they're enough on their own, and dark mode would just be different values.
- I used Radix instead of the built-in `<dialog>`. The built-in one gives you the focus trap for free and I'd use it in a project with no dependencies, but Radix worked better with the animation.
- Long merchant names wrap instead of being cut off. A taller row isn't broken, and on a phone I'd rather see the whole name than have every row the same height.
- All 1,000 rows render. There's no API or paging here to build against, and the slow part was the formatter loop and the index keys, not the row count. In a real app I'd profile a production build before adding paging or virtualization.

## What I'd do with more time

- Tests on the formatting and sorting helpers, which is where the edge cases are.
- Animate rows when the list changes. Adding or removing a transaction makes the feed jump at the moment. A bit of movement there would make it smoother and show what actually changed.
- Replace the loading text with skeleton rows. Right now loading is a small box and the feed that replaces it is much taller, so the page jumps when it arrives.
- Better error states. Right now it's one line of red text saying it couldn't load, with no way to retry, so there's nothing the user can actually do about it.
- Search, and filter pills for status. This only really works properly with the API though. Filtering rows the browser already has looks fine on 1,000 of them and stops being right as soon as the list is paged.
- Confirm with product whose timezone we should be showing.
- Make the detail view linkable as `?transaction=id`, which matches the `?state=` convention already in the repo.

Happy to walk through any of it in more detail. Looking forward to it :)
