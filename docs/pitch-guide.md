# Mesh pitch: how to run it, and what to double-check

The deck: https://mesh-case-competition-git-draft-andrewphankts-projects.vercel.app/pitch/ (the team's draft).
After someone presses Push in Mesh, the same deck is at https://mesh-case-competition.vercel.app/pitch/ (the public site).
The words we say are in [script.md](script.md). Split the slides there and rewrite them in your own voice.

## Presenting

- Right arrow or Space: next step. Left arrow: back. `[click]` in the script means one press.
- N: your lines under the slide. S: the whole script on one page. F: full screen.
- Most screens on the slides are rebuilt live in the page, so they move. Give each slide a second before you click.

## The live ending (rehearse it once)

The deck ends on the close slide and then "forgets" its Q&A slide on purpose. We fix it live in Mesh.

1. Before the pitch: press Push in Mesh so the public site has the whole deck. It has no Q&A slide yet.
2. During the pitch, or a few minutes before: one teammate (the plan is Iris) asks their agent:
   "copy docs/qa-slide.html to pitch/qa.html". That becomes their own change, waiting in the shared draft.
3. At the end, say "Actually, we forgot our Q&A slide. Let's fix that live." Switch to the Mesh room.
4. Show the teammate's change in Changes and in the Preview, then press Push.
5. Refresh the public deck and go to the last slide: Q&A is there. Leave it up while we take questions.

The public site takes about a minute to rebuild after a Push. Fill that time by showing the change in Mesh's own Preview first.

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
| Built in Mesh | "3 different agents": the room lists Claude and Codex agents now; Gemini connected earlier | Iris to confirm, else say 2 |
| The proof | 33 min, 20 messages, 2 keys come from Evelyn's deck | Evelyn to confirm |
| What we'd build next | The desktop plugin, Windows, plain-English collisions and the strict stop are not built | Say "planned, not built" out loud |
| What we track | 5 min, 2 of 3, 80%, 40% are targets we picked, not data | Team to sanity-check |
| The room | Study Sprint and its "12,000 sprints this week" are a made-up demo site | Never present it as a real customer |

## Words to use

Say project, draft, save, preview, Push. Avoid branch, merge, pull request and deploy on slides.
Say Git (not "version control") when describing who the product is for.
