<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Single-page invitation: `src/routes/index.tsx` renders the wedding site underneath and the cover on top; the cover only unmounts after its opening animation, so never navigate between them.
- The cover artwork is text-free; all names, dates and buttons are real HTML layered on top (cover text sized in `cqw` so it scales with the artwork).
- Countdown math lives in `src/lib/countdown.ts` (clamped at zero) and is covered by `src/test/countdown.test.ts`.
