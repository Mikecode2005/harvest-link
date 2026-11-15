# HarvestLink prototype

## What to build
- Replace the template home screen with a polished HarvestLink introduction for the Idanre, Ondo pilot, reflecting the proposal's focus on farmer decision support, post-harvest handling, and coordinated market access.
- Add a working farmer dashboard with illustrative/sample-data labels, sample crop guidance, a 50-tonne maize opportunity with proposed farm allocations and explicit confirmation controls, and post-harvest guidance.
- Make the English/Yoruba language switch visible and functional for key screens; include lightweight navigation between the landing page and dashboard.
- Use a distinct, mobile-friendly visual system and the generated maize-field photograph. Do not add live services or imply that sample figures are real pilot results.

## Technical details
- Implement with the existing TanStack Start routes, semantic design tokens in `src/styles.css`, and the current component/library stack.
- Add route-specific metadata for `/` and `/dashboard`; preserve the generated route tree.
- Keep all farmer/buyer content and interactions local to the prototype; no backend or persistence.
- Update the routing test as needed, run relevant tests, inspect the preview, and commit the changes.
