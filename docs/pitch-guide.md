# Mesh pitch: how to run it, and what to double-check

The deck: https://mesh-case-competition-git-draft-andrewphankts-projects.vercel.app/pitch/ (the team's draft).
After someone presses Push in Mesh, the same deck is at https://mesh-case-competition.vercel.app/pitch/ (the public site).
The words we say are in [script.md](script.md), with a target time per slide. Split the slides there and rewrite them in your own voice.

## Presenting

- Right arrow or Space: next step. Left arrow: back. `[click]` in the script means one press.
- N: your lines under the slide. S: the whole script on one page. F: full screen.
- Most screens on the slides are rebuilt live in the page, so they move. Give each slide a second before you click.

## Presenting from Mesh

We present straight from the Mesh room, so when the pitch ends we are already in the product.

1. Before the pitch, press Push so the public site has the final deck (optional; the Preview shows the draft either way).
2. Open the Mesh room, Preview tab, on the pitch tab, and make the Preview full screen.
3. Click once on the left edge of the deck (that goes back a step, which does nothing on slide 1) so the arrow keys go to it, then present all 19 slides (about 4 minutes 49 seconds).
4. End on the team slide (names and photos), then leave full screen: the judges are looking at the real room. Take questions there.

## Accuracy check

Checked against [mesh-brief.md](mesh-brief.md), Mesh's own guide and the real app.

Fixed already: removed "Looks good?" and "Not Yet" (no longer in Mesh), removed chat reactions and the typing indicator
(not built), added Undo on each change, and the preview now just refreshes instead of blurring.

Still to decide or confirm:

| Slide | What's off | What to do |
| --- | --- | --- |
| Setup | The agent picker shows 3 agents; the real one also has Antigravity | Deliberate, to keep it simple |
| Setup | Codex asks its owner once to trust Mesh's hooks (`/hooks`); the slide skips that | Mention it if asked |
| Requests | The request card pops up beside the terminal; in Mesh you open it by clicking the teammate's agent | Fine as a simplification |
| The room, Preview tabs | The sidebar leaves out the People section | Minor |
| Changes | "IN PLAIN ENGLISH" is a label we added; the real tab shows a TODAY divider and who is working | Minor |
| Built in Mesh | 5 students, 5 agents, 32 saves, 530k tokens come from our room for Nov 16–18 (same numbers as Evelyn's v2) | Re-check before the pitch |
| The proof | 33 min, 20 messages, 2 keys come from Evelyn's deck | Evelyn to confirm |
| What we'd build next | The desktop plugin, Windows, plain-English collisions and the strict stop are not built | Say "planned, not built" out loud |
| How we'll know it's working | 500 students, 150 repos, 50 rooms with 2+ agents, 40% in week 4 are targets we picked, not data | Team to sanity-check |
| What's next | Hosted previews and a shared database (like Supabase) as the business model, and Mesh Canvas: planned, not built (Canvas isn't even mocked yet) | Say "planned" out loud |
| The room | Study Sprint and its "12,000 sprints this week" are a made-up demo site | Never present it as a real customer |

## Words to use

Say project, draft, save, preview, Push. Avoid branch, merge, pull request and deploy on slides.
Say Git (not "version control") when describing who the product is for.
