# Mesh: product brief for the pitch deck

Source material for whoever builds the deck, person or agent. It is not a script and not a set of
slides. Take what helps and ignore the rest. Everything under "What is built" is live today.
Everything under "Numbers" is honest about what we can and cannot measure yet.

Last updated 2026-11-17.

## 1. Mesh in one paragraph

Mesh is a team room for people who build with coding agents. One project is one GitHub repo. Each
person keeps using their own agent in their own terminal (Claude Code, Codex, Gemini or
Antigravity). Mesh sits between the agents: it saves everyone's work to one shared draft, stops two
agents from editing the same file, tells each agent what teammates changed, shows the draft as a
live page, and publishes when the team is ready. People talk in channels like Slack. Agents talk to
each other through requests their owners approve.

## 2. The problem, in the team's own words

- Three people with three agents on one repo overwrite each other. Nobody sees it until it breaks.
- Nobody knows what a teammate's agent just did, so people paste updates into a group chat.
- Git words (branch, merge, pull request) lose the non-engineers on a student team.
- "Can I see it?" means asking someone to deploy.

This happened to us while building the deck in Mesh: two decks existed, the preview showed the old
one, and we fixed the product the same day. That story is true and can be told.

## 3. How it works for a user

1. **Sign in with GitHub and pick a repo.** That repo becomes the project.
2. **Connect your agent.** Mesh gives you one message to paste into your agent. It sets itself up.
3. **Invite teammates with a link.** Each connects their own agent the same way.
4. **Work as usual.** You prompt your agent in your terminal. At the end of every turn it saves to
   the team's shared draft. At the start of every turn it gets the newest draft and a short list of
   what teammates' agents changed.
5. **See it.** The Preview tab shows the draft as a live page and reloads when a new save is built.
6. **Publish.** One button moves the draft to the real, public version and posts an update.

## 4. What is built (features and buttons)

**Getting in**
- GitHub sign-in, pick a project, invite link.
- Connect an agent by pasting one message. Works with Claude Code, Codex, Gemini and Antigravity.
- A Git check during connecting, with Git's real error if something is missing.

**The room**
- Left side: Preview, Updates, Changes, then channels, people and agents.
- Channels and direct messages with pictures, GIFs, link cards and replies.
- **Changes:** one plain sentence from each agent about what it changed, with the files. A panel on
  the right shows which agents are working (with their task and file) and which are idle.
- **Updates:** one post per publish. A panel on the right lists changes since the last update.
- **Agents list:** every person's agents with a live status: Working, In a file, Idle, Push failed.
- **Name your agent** with the pencil on its row (for example "Felix").

**Agents working together**
- **Same file stop.** If a teammate's agent is in a file, yours stops and tells you who and why,
  then offers choices.
- **Awareness.** Each turn, an agent hears what teammates changed or started since its last turn.
- **Direction.** Before starting something big, an agent posts what it is about to do and why.
- **Questions as a form.** When an agent needs its owner to choose, it asks with two to four options.
- **Requests.** One agent asks a teammate's side for something. The teammate presses **Approve** or
  **Decline**, optionally with a note. Their agent does it on its next turn and the answer comes back.
- **Outbox.** Click your own agent to see everything it sent and where each one stands.

**Preview and Publish**
- **Set Up Preview** hands the job to your own agent, or **Pick a Host**: Vercel, Railway,
  Cloudflare, Netlify, GitHub.
- The Preview reloads by itself after a save, with "Building New Save" then "Updated".
- **Publish** with a list of what is going out, **Undo** on single changes, and a short moment
  (a paper plane and confetti) when it lands.

**Safety**
- A prompt that looks like a password or key is not sent to the room.
- Only your own button presses can start your agent. A teammate's agent can ask, never act.
- The scripts on each computer are signed.

**Not built yet (do not claim these)**
- Agents sharing pictures in a channel. Notifications, reactions, a phone layout.
- Removing a person from a project.
- Starting your agent from a button on Windows or with Codex and Gemini (Mac and Claude Code only).

## 5. Words to use

Say **project, draft, save, preview, publish, update**. Avoid branch, commit, merge, pull request,
deploy and main on slides. The product hides those words on purpose, and that choice is part of
the pitch: it is built for the whole team, not only the engineers.

## 6. Numbers (for a product management audience)

**What we can honestly say today**
- The team built this deck inside Mesh with three people and agents from three different tools.
- Mesh was built in about two weeks, in 75 merged changes, by one non-engineer with agents.
- Mesh has no analytics yet. We do not have usage numbers and the deck should not invent any.

**What we would track, and where it would come from**
The server already records each of these events, so these are measurable without new tracking.

| Stage | Metric | Why it matters |
|---|---|---|
| North star | Projects per week where two or more people's agents saved to one draft | It is the only moment Mesh is worth more than working alone |
| Activation | Time from sign-in to first agent connected. Target: under 5 minutes | Setup is where a non-engineer gives up |
| Activation | Share of invited teammates who connect an agent | A room of one is not a team |
| Collaboration | Same-file stops per project per week | Each one is an overwrite that did not happen |
| Collaboration | Requests sent, share approved, time to answer | Shows agents really coordinate through people |
| Outcome | Publishes per project per week | Work reaching the public version is the result |
| Quality | Saves that failed, share fixed on the next turn | Trust: no work is ever lost |
| Retention | Projects active in week 2 and week 4 | Does a team come back after the first session |

**A slide can say this plainly:** "Here is what we measure and why", with the table cut to four or
five rows. A product management audience usually scores the reasoning, not the size of the numbers.

## 7. What a product management audience tends to look for

A checklist to compare the deck against. Not every deck needs every item.

- **Who it is for.** One clear first user: student teams building with agents.
- **The problem with evidence.** Our own collision is real evidence.
- **Why now.** Coding agents went from one person to whole teams this year.
- **What exists.** Alternatives are Slack plus GitHub, or one shared agent. Say what each misses.
- **The product.** Shown live or as screenshots, not described.
- **Success metrics.** The table above.
- **Risks and what we would test next.** For example: do real agents obey the stop every time.
- **Roadmap.** Three items, in order, each tied to a metric.
- **The ask.** What we want from the judges.

## 8. Facts for an agent

- The live product: Mesh. Repo for the deck: this one. The product's own guide is available to
  any connected agent through the `about_mesh` tool.
- Tone of the product: black and white, calm, few words, big clear buttons.
- If a claim is not in this file or in `about_mesh`, ask before putting it on a slide.
