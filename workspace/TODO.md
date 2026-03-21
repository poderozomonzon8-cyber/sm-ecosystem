<instructions>
This file powers chat suggestion chips. Keep it focused and actionable.

# Be proactive
- Suggest ideas and things the user might want to add *soon*. 
- Important things the user might be overlooking (SEO, more features, bug fixes). 
- Look specifically for bugs and edge cases the user might be missing (e.g., what if no user has logged in).

# Rules
- Each task must be wrapped in a "<todo id="todo-id">" and "</todo>" tag pair.
- Inside each <todo> block:
  - First line: title (required)
  - Second line: description (optional)
- The id must be a short stable identifier for the task and must not change when you rewrite the title or description.
- Only maintain this file when there is meaningful unfinished work left after the current response.
- Add tasks only when there are concrete, project-specific next steps from current progress.
- Do NOT add filler tasks. Skip adding if no meaningful next step exists.
- Keep this list high-signal and concise, usually 1-3 strong tasks.
- If there are already 3 strong open tasks, usually do not add more.
- Remove or rewrite stale tasks when they are completed, obsolete, duplicated, or clearly lower-priority than current work.
- Preserve existing todo ids whenever you edit or reorder tasks.
- If the user dismisses or rejects a task, do not recreate it unless they ask for it again or it becomes truly blocking.
- Re-rank remaining tasks by current impact and urgency.
- Prefer specific wording tied to real project scope/files; avoid vague goals.
</instructions>

<!-- Add tasks here only when there are real next steps. -->

<todo id="router-locked">
Router is now LOCKED
Do not modify App.tsx routing unless explicitly prompted. Add new pages by import + new Route only.
</todo>

<todo id="seed-metrics">
Seed site metrics
Go to Admin → Metrics Editor and click "Seed Defaults" to populate the live metrics displayed across the site.
</todo>

<todo id="seed-data">
Seed billing demo data
Create a few Expenses, Income entries, HourEntry records, and Leads so the Economic Dashboard and Profitability panels render live data instead of empty charts.
</todo>

<todo id="db-roles">
Persist role assignments to DB
Replace localStorage role storage with a DB-backed RolePermission or UserRole entity so role assignments survive across sessions and devices.
</todo>

<todo id="ai-chat-llm">
Connect AI to real LLM
Replace the KB-based bot in AIChatWidget and AdminAIChat with a real API (OpenAI, Anthropic) for more intelligent responses.
</todo>

<todo id="finance-modules">
Build Finance & Ops modules
Implement Economic Dashboard, Lead Management, Employee Hours, and Profitability panels — data models and SDK entities will need to be added first.
</todo>


<todo id="portal-messages-db">
Portal messages persist to DB
The client portal "Messages" section uses local state. Wire it to ChatMessage DB entity so conversations survive page refreshes.
</todo>

<todo id="video-swap">
Swap hero video per active theme
HeroSection should read the active theme's heroVideoHint to display the correct project reel for each ecosystem theme (hardscape timelapse, construction timelapse, maintenance footage).
</todo>

<todo id="section-pages">
Build theme section pages
Implement the concrete page sections described in each theme (e.g. MaterialShowcase, BeforeAfterSlider, ServicePlanCards, ProcessTimeline) as real React components on their respective public pages.
</todo>


