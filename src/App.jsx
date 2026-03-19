import { useState, useRef, useCallback } from "react";

/* ── INFORMATIVE SPEECH rubric ─────────────────────────────────────────── */
const INFORMATIVE_SECTIONS = [
  {
    title: "Overall",
    pts: 20,
    alert: "Persuasive line = −5 pts · Time: −2 pts/min over, −3 pts/min under · Short time usually = lacking depth (affects Content too)",
    glows: [
      "Clearly informative.",
      "Excellent topic depth.",
      "Great audience adaptation.",
      "Perfectly timed.",
      "Good focus/scope.",
    ],
    grows: [
      "Felt persuasive.",
      "Need more depth/detail.",
      "Better audience fit needed.",
      "Too short.",
      "Scope too broad/narrow.",
    ],
    items: [
      {
        main: "Informative; does not cross the line into persuasive",
        subs: ["No explicit calls for a change in attitudes, beliefs, or behavior (−5 if crossed)"],
      },
      { main: "Adapted their message to the audience", subs: [] },
      { main: "Speech built audience's understanding of a detailed topic (depth, context, application)", subs: [] },
      {
        main: "Appropriate length",
        subs: [
          "Within time limits (−2 pts/min over, −3 pts/min under)",
          "If short on time, check Content for lacking depth/support",
        ],
      },
    ],
  },
  {
    title: "Introduction",
    pts: 25,
    alert: "Push for examples, stories, or thought-provoking elements to spice up intros",
    glows: [
      "Strong attention-getter.",
      "Purpose/thesis clear.",
      "Strong credibility stated.",
      "Clear topic relevance.",
      "Smoothly previewed points.",
    ],
    grows: [
      "Opening was flat/weak.",
      "Purpose was vague.",
      "Build speaker credibility.",
      "Why should we care?",
      "Need clearer preview.",
    ],
    items: [
      {
        main: "Attracted audience's attention (unexpected, concrete, emotional)",
        subs: [
          "Launched into attention getter (didn't blandly open with name/topic)",
          "Used creative devices: narrative, impactful stats, people in action, imagery",
          "Moved beyond simple/obvious questions",
          "Attention getter strongly represents the central theme",
          "Used examples, stories, or thought-provoking elements (supervisor note)",
        ],
      },
      {
        main: "Explicitly stated the speech purpose",
        subs: [
          "Central idea is concise, emphasized, and understandable on its own",
          "Ties logically to attention getter, relevance, and credibility",
        ],
      },
      {
        main: "Showed topic is worth the audience's interest/concern",
        subs: [
          "Considered audience's level of power/connection to the topic",
          "Addressed how the topic parallels or affects audience's lives/futures",
        ],
      },
      {
        main: "Showed speaker is a credible source of info for this topic",
        subs: [
          "Described real relationship/involvement with the topic",
          "More than a perfunctory statement; flows naturally with other intro elements",
        ],
      },
      {
        main: "Previewed the main points of the speech",
        subs: ["Gave audience a clear guide to what they are about to hear"],
      },
    ],
  },
  {
    title: "Body Organization",
    pts: 25,
    alert: "Informative speech needs to be tightly organized — signposts and transitions are critical",
    glows: [
      "Clear signposts used.",
      "Smooth transitions.",
      "Logical structure.",
      "Related ideas grouped well.",
    ],
    grows: [
      "Needs stronger signposts.",
      "Transitions felt abrupt.",
      "Confusing structure/flow.",
      "Points felt disconnected.",
    ],
    items: [
      {
        main: "Used noticeable signposts/topic statements for each main point",
        subs: [
          "Didn't rush from one point to the next without pause",
          "Signposts punctuated with volume, pausing, and tone changes",
        ],
      },
      {
        main: "Used appropriate transitions where needed",
        subs: ["Used internal previews and internal summaries"],
      },
      {
        main: "Exhibited structure in appropriate sequence (related ideas together; chronological, topical, spatial)",
        subs: [
          "Stayed consistently on topic within each main point",
          "Picked a pattern of organization and stuck to it",
          "Completed the thought / presented a complete picture for each point",
          "Avoided excessive parentheticals, jumping ahead, or referring back",
        ],
      },
    ],
  },
  {
    title: "Content",
    pts: 30,
    alert: "No oral citations → cap grade at ~90% (180/200) · Min 3 citations, 5–8 recommended · Each piece needs support and examples · If short on time, likely lacking here",
    glows: [
      "Language precise/clear.",
      "Specific evidence used.",
      "Strong source quality.",
      "Clear oral citations.",
      "Minimum # citations met.",
      "Citations add depth and support topic well.",
    ],
    grows: [
      "Language was vague/informal.",
      "Need more specific evidence.",
      "Sources were thin/weak.",
      "Did not meet minimum # of citations.",
      "Need smoother citation delivery, not enough info about source.",
    ],
    items: [
      {
        main: "Used accurate and appropriate language",
        subs: [
          "Adhered to ethical rules, inclusive language, and concise phrasing",
          "Adapted technical words/jargon for a diverse audience",
          "Gave specific definitions of technical or abstract terms",
        ],
      },
      {
        main: "Supported each main point with specific backing/explanation",
        subs: [
          "Evidence clarifies and makes facts/positions vivid for the audience",
          "Used substantive, concrete evidence (not vague or generic)",
          "Balanced evidence across points (not overloaded on one, thin on another)",
          "Assess quality of sources and depth of support (supervisor note)",
        ],
      },
      {
        main: "Orally cited authoritative sources (min 3, 5–8 recommended)",
        subs: [
          "Citations were spoken aloud — slides-only citations are NOT enough",
          "Included date, especially for numeric info and uncertain claims",
          "Source used substantively, not just perfunctorily",
          "Addressed why the source is relevant; detailed use of peer-reviewed sources",
          "If zero oral citations: signal clearly in total grade, cap ~90%",
        ],
      },
    ],
  },
  {
    title: "Conclusion",
    pts: 25,
    alert: "Push for examples, stories, or thought-provoking elements to make conclusions stick",
    glows: [
      "Clear concluding signal/signpost.",
      "Central idea reinforced.",
      "Final thought was powerful and memorable.",
      "Good summary/clincher.",
    ],
    grows: [
      "Need clear concluding signal/signpost.",
      "Reinforce main points more.",
      "Ending felt abrupt/flat.",
      "Avoid new info in conclusion.",
    ],
    items: [
      {
        main: "Signaled/transitioned into conclusion",
        subs: ["Marked with pausing and emphasis; communicated conversationally"],
      },
      {
        main: "Reinforced central idea",
        subs: [
          "Assertively stated why main points led up to the thesis/central claim",
          "Left audience with a concise understanding of what was discussed",
        ],
      },
      {
        main: "Drew audience's attention / made the final thought stick",
        subs: [
          "Used the unexpected, concrete, emotional, and/or audience-relevant material",
          "Made the thesis land and rest in the audience's thoughts",
          "Used examples, stories, or thought-provoking elements (supervisor note)",
        ],
      },
    ],
  },
  {
    title: "Delivery – Vocals",
    pts: 20,
    alert: null,
    glows: [
      "Excellent vocal variety.",
      "Good projection.",
      "Rate intentional/clear.",
      "No awkward pauses.",
    ],
    grows: [
      "Monotone/lacks variety.",
      "Need to project more.",
      "Pace too fast/slow.",
      "Reduce fillers.",
    ],
    items: [
      {
        main: "Used rate intentionally; maintained clarity",
        subs: [
          "If too fast: garbled organization? Lost articulation? Nervousness?",
          "If too slow: decreased enthusiasm? Forgetfulness or lack of motivation?",
          "Weight higher if rate was a major barrier to understanding",
        ],
      },
      { main: "Used volume and articulation intentionally; maintained clarity", subs: [] },
      { main: "Avoided noise from vocalized pauses (um, uh, y'know)", subs: [] },
      { main: "Maintained vocal variety that matched emphasis and emotion", subs: [] },
    ],
  },
  {
    title: "Delivery – Physical",
    pts: 20,
    alert: null,
    glows: [
      "Confident posture/stance.",
      "Consistent eye contact.",
      "Facial expressions good.",
      "Effective gestures/movement used.",
    ],
    grows: [
      "Fidgeting.",
      "Posture not confident.",
      "Need better eye contact.",
      "Facial expression flat/distracting.",
      "Gestures distracting.",
      "Need more engaging gestures/movement.",
    ],
    items: [
      { main: "Confident/comfortable posture, stance, and appropriate attire", subs: [] },
      { main: "Consistent eye contact that matched content and emphasis", subs: [] },
      { main: "Facial expression that matched content and emphasis", subs: [] },
      { main: "Gestures and body movement intentional; clarified and emphasized", subs: [] },
    ],
  },
  {
    title: "Outline & Bibliography",
    pts: 20,
    alert: null,
    glows: [
      "Perfect MLA/APA format.",
      "Outline details strong.",
      "Submitted on time.",
    ],
    grows: [
      "Format errors in bib.",
      "Outline vague/incomplete.",
      "Missing/late submission.",
    ],
    items: [
      { main: "Formatted and submitted according to instructions", subs: [] },
    ],
  },
  {
    title: "Slides Presentation",
    pts: 15,
    alert: "3–5 slides · Complement spoken material · No walls of text, unrelated images, bad contrast, small text, or crowded space",
    glows: [
      "Slides complement speech.",
      "Aesthetically clean/clear.",
      "Perfect image choice.",
      "Used as visual aid only.",
    ],
    grows: [
      "Too much text on slides.",
      "Cluttered/distracting slides.",
      "Need better image quality.",
      "Speaker read the slides.",
    ],
    items: [
      {
        main: "3–5 slides; complementing speech content",
        subs: [
          "Slides complement (not duplicate or replace) spoken material",
          "No walls of text on slides",
          "No unrelated or distracting images",
          "Good contrast between text and background colors",
          "Text large enough to read easily",
          "Slide space is not overcrowded",
        ],
      },
    ],
  },
];

/* ── SYMPOSIUM RESEARCH rubric ─────────────────────────────────────────── */
const SECTIONS = [
  {
    title: "Overall",
    pts: 15,
    items: [
      { main: "Described specific research highlighting topic significance", subs: [] },
      { main: "Described detailed research process", subs: [] },
    ],
  },
  {
    title: "Introduction",
    pts: 20,
    items: [
      {
        main: "Attracted audience's attention (unexpected, concrete, emotional)",
        subs: [
          "Launched into attention getter (didn't blandly open with name/topic)",
          "Used creative devices: narrative, impactful stats, people in action, imagery",
          "Moved beyond simple/obvious questions",
          "Attention getter strongly represents the central theme",
        ],
      },
      {
        main: "Explicitly stated the speech central idea",
        subs: [
          "Central idea is concise, emphasized, and understandable on its own",
          "Ties logically to attention getter, relevance, and credibility",
        ],
      },
      {
        main: "Showed topic is worth the audience's interest/concern",
        subs: [
          "Considered the audience's level of power/connection to the topic",
          "Addressed how the topic parallels or affects the audience's lives/futures",
        ],
      },
      {
        main: "Showed speaker is a credible source of info for this topic",
        subs: [
          "Described real relationship/involvement with the topic",
          "More than a perfunctory statement; flows naturally with other intro elements",
        ],
      },
      {
        main: "Previewed the main points of the speech",
        subs: ["Gave audience a clear guide to what they are about to hear"],
      },
    ],
  },
  {
    title: "Body Organization",
    pts: 20,
    items: [
      {
        main: "Used noticeable signposts/topic statements for each main point",
        subs: [
          "Didn't rush from one point to the next without pause",
          "Signposts punctuated with volume, pausing, and tone changes",
        ],
      },
      {
        main: "Used appropriate transitions where needed",
        subs: ["Used internal previews and internal summaries"],
      },
      {
        main: "Exhibited structure in appropriate sequence (related ideas together)",
        subs: [
          "Stayed consistently on topic within each main point",
          "Picked a pattern of organization and stuck to it",
          "Completed the thought / presented a complete picture for each point",
          "Avoided excessive parentheticals, jumping ahead, or referring back",
        ],
      },
    ],
  },
  {
    title: "Content",
    pts: 20,
    items: [
      {
        main: "Used accurate and appropriate language",
        subs: [
          "Adhered to ethical rules, inclusive language, and concise phrasing",
          "Adapted technical words/jargon for a diverse audience",
          "Gave specific definitions of technical or abstract terms",
        ],
      },
      {
        main: "Supported each main point with specific backing/explanation",
        subs: [
          "Evidence clarifies and makes facts/positions vivid for the audience",
          "Used substantive, concrete evidence (not vague or generic)",
          "Balanced evidence across points (not overloaded on one, thin on another)",
        ],
      },
      {
        main: "Orally cited authoritative sources with context, depth, rationale",
        subs: [
          "Included necessary citation info (especially dates for stats/claims)",
          "Source used substantively, not just perfunctorily",
          "Addressed why the source is relevant; detailed use of peer-reviewed sources",
        ],
      },
    ],
  },
  {
    title: "Conclusion",
    pts: 20,
    items: [
      {
        main: "Signaled/transitioned into conclusion",
        subs: ["Marked with pausing and emphasis; communicated conversationally"],
      },
      {
        main: "Reinforced the central idea",
        subs: [
          "Assertively stated why main points led up to the thesis/central claim",
          "Left audience with a concise understanding of what was discussed",
        ],
      },
      {
        main: "Drew audience's attention / made the final thought stick",
        subs: [
          "Used the unexpected, concrete, emotional, and/or audience-relevant material",
          "Made the thesis land and rest in the audience's thoughts",
        ],
      },
    ],
  },
  {
    title: "Delivery – Vocals",
    pts: 15,
    items: [
      {
        main: "Used rate intentionally; maintained clarity",
        subs: [
          "If too fast: garbled organization? Lost articulation? Nervousness?",
          "If too slow: decreased enthusiasm? Forgetfulness or lack of motivation?",
          "Weight higher if rate was a major barrier to understanding",
        ],
      },
      { main: "Used volume and articulation intentionally; maintained clarity", subs: [] },
      { main: "Avoided noise from vocalized pauses (um, uh, y'know)", subs: [] },
      { main: "Maintained vocal variety that matched emphasis and emotion", subs: [] },
      { main: "Enthusiastic and well-projected", subs: [] },
    ],
  },
  {
    title: "Delivery – Physical",
    pts: 15,
    items: [
      { main: "Confident/comfortable posture, stance, and appropriate attire", subs: [] },
      { main: "Consistent eye contact that matched content and emphasis", subs: [] },
      { main: "Facial expression that matched content and emphasis", subs: [] },
      { main: "Gestures and body movement intentional; clarified and emphasized", subs: [] },
    ],
  },
  {
    title: "Q&A",
    pts: 15,
    items: [
      { main: "Answered questions with fluency and confidence", subs: [] },
      { main: "Descriptions/explanations addressed the questioner's needs", subs: [] },
      { main: "Reinforced central idea; organized answer (intro, body, conclusion)", subs: [] },
      { main: "Responded with honesty about limitations and with enthusiasm", subs: [] },
      { main: "If asking questions, did so constructively and precisely", subs: [] },
    ],
  },
  {
    title: "Group Cohesion",
    pts: 10,
    items: [
      { main: "Showed planning and natural transitions between participants", subs: [] },
      { main: "Positive reports on group effectiveness for practice and support", subs: [] },
    ],
  },
];

/* ── PERSUASIVE SPEECH rubric (Monroe's Motivated Sequence) ─────────────────────────────────────────── */
const PERSUASIVE_SECTIONS = [
  {
    title: "Attention Step / Introduction",
    pts: 30,
    alert: "Higher quality intros expected now — push for creative, energetic openings per prior feedback",
    glows: [
      "Strong attention-getter.",
      "Purpose/thesis clear and persuasive.",
      "Strong credibility stated.",
      "Clear topic relevance.",
      "Smoothly previewed points.",
      "Engaging, energetic opening.",
    ],
    grows: [
      "Opening was flat/weak.",
      "Purpose was vague.",
      "Build speaker credibility.",
      "Why should we care?",
      "Need clearer preview.",
      "Intro lacked energy/creativity.",
    ],
    items: [
      {
        main: "Attracted audience's attention (unexpected, concrete, emotional)",
        subs: [
          "Launched into attention getter (didn't blandly open with name/topic)",
          "Used creative devices: narrative, impactful stats, people in action, imagery",
          "Moved beyond simple/obvious questions",
          "Attention getter strongly represents the central theme",
        ],
      },
      {
        main: "Explicitly stated the speech purpose",
        subs: [
          "Purpose is clearly persuasive — calls audience to DO something",
          "Central idea is concise, emphasized, and understandable on its own",
        ],
      },
      {
        main: "Showed topic is worth the audience's interest/concern",
        subs: [
          "Considered audience's level of power/connection to the topic",
          "Addressed how the topic affects audience's lives/futures",
        ],
      },
      {
        main: "Showed speaker is a credible source of info for this topic",
        subs: [
          "Described real relationship/involvement with the topic",
          "More than a perfunctory statement; flows naturally",
        ],
      },
      {
        main: "Previewed the main points of the speech",
        subs: ["Gave audience a clear guide to what they are about to hear"],
      },
    ],
  },
  {
    title: "Need Step",
    pts: 30,
    alert: "Common issue: too much Need, not enough Satisfaction — watch for imbalance. Missing Need/Satisfaction entirely → cap at ~85%",
    glows: [
      "Problem clearly communicated.",
      "Strong structure and connectives.",
      "Authoritative sources cited orally.",
      "Ramifications well-explained.",
      "Need feels urgent and significant.",
      "Varied source types used.",
    ],
    grows: [
      "Problem unclear or understated.",
      "Weak structure/connectives.",
      "Need more oral citations for the problem.",
      "Ramifications not addressed.",
      "Need step too long (imbalanced with Satisfaction).",
      "Sources lack authority or variety.",
    ],
    items: [
      {
        main: "Succinctly communicated the problem using clear structure and connectives; made need obvious and significant",
        subs: [
          "Used signposts and transitions within the need step",
          "Problem is stated clearly — audience understands what's wrong",
        ],
      },
      {
        main: "Authoritative and varied sources cited orally to support the claim of the problem (min 7, ~10 recommended)",
        subs: [
          "Citations spoken aloud — slides-only citations are NOT enough",
          "Included date, especially for stats and uncertain claims",
          "Source used substantively, not perfunctorily",
          "At least 2 sources from peer-reviewed journals",
        ],
      },
      {
        main: "Cited ramifications of the problem",
        subs: [
          "Showed what happens if the problem is not addressed",
          "Ramifications feel real and significant to the audience",
        ],
      },
    ],
  },
  {
    title: "Satisfaction Step",
    pts: 30,
    alert: "Common issue: too little Satisfaction vs. Need — watch for imbalance. Must cite and overcome objections/limitations. Missing this step → cap at ~85%",
    glows: [
      "Solution clearly summarized.",
      "Strong theoretical evidence cited.",
      "Empirical evidence/proven payoffs cited.",
      "Objections addressed and rebutted.",
      "Easy to understand.",
      "Good structure and connectives.",
    ],
    grows: [
      "Solution unclear or vague.",
      "Need theoretical evidence for solution.",
      "Need empirical evidence/payoffs.",
      "Objections not addressed.",
      "Satisfaction step too thin (imbalanced).",
      "Rebuttal to objections was weak.",
    ],
    items: [
      {
        main: "Summarized solution with clear structure and connectives; easy to understand",
        subs: [
          "Solution is specific and actionable",
          "Used signposts and transitions within satisfaction step",
        ],
      },
      {
        main: "Described and cited effective theoretical evidence supporting the proposed solution",
        subs: [
          "Research directly addresses the claims, not just the general topic",
          "Facts, testimony, and examples demonstrate credible support",
        ],
      },
      {
        main: "Described effective empirical evidence supporting proposed solution / proven payoffs orally cited",
        subs: [
          "Cited concrete data or examples showing the solution works",
        ],
      },
      {
        main: "Cited and overcame/rebutted objections and limitations for proposed solution",
        subs: [
          "Acknowledged counterpoints seriously — not dismissed offhand",
          "Showed evidence that overcomes concerns",
          "Without addressing objections, it's only opinion",
        ],
      },
    ],
  },
  {
    title: "Visualization Step",
    pts: 30,
    alert: null,
    glows: [
      "Vivid problem visualization.",
      "Vivid solution visualization.",
      "Strong audience-centered appeals.",
      "Emotional imagery effective.",
      "Both positive and negative visualization used.",
    ],
    grows: [
      "Problem visualization weak/missing.",
      "Solution visualization weak/missing.",
      "Needs more audience-centered appeals.",
      "Imagery was vague or generic.",
      "Missing positive or negative visualization.",
    ],
    items: [
      {
        main: "Provided visualization of the problem (imagic examples, cited projections)",
        subs: [
          "Used 'Imagine if...' or similar concrete imagery",
          "Negative visualization: what happens if we DON'T act",
        ],
      },
      {
        main: "Provided visualization of the solution",
        subs: [
          "Positive visualization: what happens if we DO act",
          "Imagery is concrete and vivid, not abstract",
        ],
      },
      {
        main: "Used appeals to audience's perspective, human emotions, and human experience",
        subs: [
          "Appeals feel genuine, not manipulative",
          "Connected emotionally to audience's lived experience",
        ],
      },
    ],
  },
  {
    title: "Action Step / Conclusion",
    pts: 30,
    alert: "No specific call to action → speech should NOT get an A. Must be a proposition of policy — audience must be asked to DO something within their power",
    glows: [
      "Specific call to action stated.",
      "Action is within audience's power.",
      "Main points restated/summarized.",
      "Personal confidence statement included.",
      "Creative finale / paralleled attention getter.",
      "Final thought was powerful.",
    ],
    grows: [
      "No specific call to action.",
      "Action not within audience's power.",
      "Need to restate main points.",
      "Missing personal confidence statement.",
      "Ending felt abrupt/flat.",
      "No creative finale.",
      "Avoid new info in conclusion.",
    ],
    items: [
      {
        main: "Made a specific call to action statement",
        subs: [
          "Stated specific behavior for audience to follow to complete the action",
          "Call to action is within the audience's power",
          "This is a proposition of policy — audience is asked to DO something",
          "Missing call to action → cap below A",
        ],
      },
      {
        main: "Signaled conclusion by restating/summarizing main points and central idea",
        subs: [
          "Marked with pausing and emphasis; communicated conversationally",
        ],
      },
      {
        main: "Included personal statement demonstrating confidence in proposed solution",
        subs: [],
      },
      {
        main: "Included creative finale (e.g. paralleled attention getter; emotion/imagery to make final thought stick)",
        subs: [
          "Higher quality conclusions expected now — push for energy and creativity",
          "Used the unexpected, concrete, emotional, and/or audience-relevant material",
        ],
      },
    ],
  },
  {
    title: "Overall",
    pts: 20,
    alert: "Must maintain persuasive tone throughout. If still informative (no policy proposition), reflect in grade. Conversational/natural — not mechanical or reading from a script",
    glows: [
      "Strong audience adaptation.",
      "Built rapport conversationally.",
      "Maintained persuasive tone throughout.",
      "Perfectly timed (6–8 min).",
      "Natural, conversational delivery.",
    ],
    grows: [
      "Felt informative, not persuasive.",
      "Better audience fit needed.",
      "Tone was mechanical/scripted.",
      "Too short / too long.",
      "Lacked rapport with audience.",
      "Not a proposition of policy.",
    ],
    items: [
      {
        main: "Adapted message to the audience",
        subs: [],
      },
      {
        main: "Worked to build rapport with audience by conversationally addressing their needs",
        subs: [
          "Conversational and natural in tone — not reading from a script",
          "Speaking TO the audience, not AT them",
        ],
      },
      {
        main: "Maintained persuasive tone/purpose throughout",
        subs: [
          "This is persuasion, not just information — reflected in language and framing",
          "If no policy proposition remains, same cap applies",
        ],
      },
      {
        main: "Spoke for the required length (6–8 minutes)",
        subs: [],
      },
    ],
  },
  {
    title: "Outline & Bibliography",
    pts: 20,
    alert: null,
    glows: [
      "Perfect APA/MLA format.",
      "Full sentence outline strong.",
      "Submitted on time as .docx.",
      "Bibliography complete.",
    ],
    grows: [
      "Format errors in bib.",
      "Outline vague/incomplete.",
      "Missing/late submission.",
      "Wrong file type.",
    ],
    items: [
      {
        main: "Formatted and submitted according to instructions (.doc/.docx only)",
        subs: [
          "Full sentence outline following SUSO Ch. 12.3 format",
          "Bibliography in APA or MLA format",
          "At least 7 sources listed (min 2 peer-reviewed)",
        ],
      },
    ],
  },
  {
    title: "Slides Presentation",
    pts: 10,
    alert: "Title slide + 3–8 content slides (.ppt/.pptx only) · Oral citations required — not just text on slides",
    glows: [
      "Slides complement speech.",
      "Aesthetically clean/clear.",
      "Good image choices.",
      "Used as visual aid only.",
      "Title slide with name included.",
    ],
    grows: [
      "Too much text on slides.",
      "Cluttered/distracting slides.",
      "Need better image quality.",
      "Speaker read the slides.",
      "Missing title slide.",
      "Wrong file type.",
    ],
    items: [
      {
        main: "Title slide (with name) and 3–8 slides of content; complementing speech",
        subs: [
          "Slides complement (not duplicate or replace) spoken material",
          "No walls of text on slides",
          "No unrelated or distracting images",
          "Good contrast and readability",
          "Sources cited orally — not just text on slides",
        ],
      },
    ],
  },
  {
    title: "Delivery – Vocals",
    pts: 25,
    alert: "Be sensitive about accents and culturally-informed behaviors. Articulation = hearable volume + slowing down for technical words",
    glows: [
      "Excellent vocal variety.",
      "Good projection.",
      "Rate intentional/clear.",
      "No awkward pauses.",
      "Conversational, natural tone.",
    ],
    grows: [
      "Monotone/lacks variety.",
      "Need to project more.",
      "Pace too fast/slow.",
      "Reduce fillers.",
      "Sounded mechanical/scripted.",
    ],
    items: [
      {
        main: "Used rate intentionally; maintained clarity",
        subs: [
          "If too fast: garbled organization? Lost articulation? Nervousness?",
          "If too slow: decreased enthusiasm? Forgetfulness or lack of motivation?",
          "Weight higher if rate was a major barrier to understanding",
        ],
      },
      { main: "Used volume and articulation intentionally; maintained clarity", subs: [
        "Articulation = hearable volume + slowing for technical words",
        "Be sensitive about accents and culturally-informed behaviors",
      ]},
      { main: "Avoided noise from vocalized pauses (um, uh, y'know)", subs: [] },
      { main: "Maintained vocal variety that matched emphasis and emotion", subs: [] },
    ],
  },
  {
    title: "Delivery – Physical",
    pts: 25,
    alert: "Don't police attire — suggest 'strategic/appropriate' but do not deduct points for it",
    glows: [
      "Confident posture/stance.",
      "Consistent eye contact.",
      "Facial expressions good.",
      "Effective gestures/movement.",
    ],
    grows: [
      "Fidgeting.",
      "Posture not confident.",
      "Need better eye contact.",
      "Facial expression flat/distracting.",
      "Gestures distracting.",
      "Need more engaging movement.",
    ],
    items: [
      {
        main: "Confident/comfortable posture, stance, and appropriate attire",
        subs: [
          "Do NOT deduct for attire — suggest 'strategic' dress only",
        ],
      },
      { main: "Consistent eye contact that matched content and emphasis", subs: [] },
      { main: "Facial expression that matched content and emphasis", subs: [] },
      { main: "Gestures and body movement intentional; clarified and emphasized", subs: [] },
    ],
  },
];

/* ── Per-section visual identity ─────────────────────────────────────────── */
const SECTION_META = [
  { icon: "🏆", color: "#f59e0b", rgb: "245,158,11"  },  // Overall
  { icon: "🎯", color: "#3b82f6", rgb: "59,130,246"  },  // Introduction
  { icon: "📐", color: "#8b5cf6", rgb: "139,92,246"  },  // Body Org
  { icon: "📖", color: "#06b6d4", rgb: "6,182,212"   },  // Content
  { icon: "🎬", color: "#ec4899", rgb: "236,72,153"  },  // Conclusion
  { icon: "🎙️", color: "#10b981", rgb: "16,185,129" },  // Vocals
  { icon: "💪", color: "#f97316", rgb: "249,115,22"  },  // Physical
  { icon: "💬", color: "#a855f7", rgb: "168,85,247"  },  // Q&A
  { icon: "🤝", color: "#14b8a6", rgb: "20,184,166"  },  // Group Cohesion
];

const INFORMATIVE_SECTION_META = [
  { color: "#f59e0b", rgb: "245,158,11"  },  // Overall
  { color: "#3b82f6", rgb: "59,130,246"  },  // Introduction
  { color: "#8b5cf6", rgb: "139,92,246"  },  // Body Organization
  { color: "#06b6d4", rgb: "6,182,212"   },  // Content
  { color: "#ec4899", rgb: "236,72,153"  },  // Conclusion
  { color: "#10b981", rgb: "16,185,129"  },  // Delivery – Vocals
  { color: "#f97316", rgb: "249,115,22"  },  // Delivery – Physical
  { color: "#a855f7", rgb: "168,85,247"  },  // Q&A
  { color: "#14b8a6", rgb: "20,184,166"  },  // Group Cohesion
];

const PERSUASIVE_SECTION_META = [
  { color: "#3b82f6", rgb: "59,130,246"  },  // Attention Step / Introduction
  { color: "#ef4444", rgb: "239,68,68"   },  // Need Step
  { color: "#10b981", rgb: "16,185,129"  },  // Satisfaction Step
  { color: "#7c3aed", rgb: "124,58,237"  },  // Visualization Step
  { color: "#f97316", rgb: "249,115,22"  },  // Action Step / Conclusion
  { color: "#f59e0b", rgb: "245,158,11"  },  // Overall
  { color: "#06b6d4", rgb: "6,182,212"   },  // Outline & Bibliography
  { color: "#ec4899", rgb: "236,72,153"  },  // Slides Presentation
  { color: "#14b8a6", rgb: "20,184,166"  },  // Delivery – Vocals
  { color: "#f43f5e", rgb: "244,63,94"   },  // Delivery – Physical
];

/* ── Helpers ─────────────────────────────────────────────────────────────── */
const TOTAL_PTS = SECTIONS.reduce((s, sec) => s + sec.pts, 0);
const INFORMATIVE_TOTAL_PTS = INFORMATIVE_SECTIONS.reduce((s, sec) => s + sec.pts, 0);
const PERSUASIVE_TOTAL_PTS = PERSUASIVE_SECTIONS.reduce((s, sec) => s + sec.pts, 0);

function buildItemKeys(sections) {
  const keys = {};
  sections.forEach((sec, si) => {
    sec.items.forEach((item, ii) => {
      keys[`${si}-${ii}`] = null;
      item.subs.forEach((_, subi) => { keys[`${si}-${ii}-${subi}`] = null; });
    });
  });
  return keys;
}

function getItemLabel(sections, key) {
  const parts = key.split("-").map(Number);
  if (parts.length === 3) return sections[parts[0]].items[parts[1]].subs[parts[2]];
  return sections[parts[0]].items[parts[1]].main;
}

function letterGrade(pct) {
  if (pct >= 90) return { letter: "A",  gradePoints: 4.0,  color: "#10b981" };
  if (pct >= 87) return { letter: "B+", gradePoints: 3.33, color: "#3b82f6" };
  if (pct >= 80) return { letter: "B",  gradePoints: 3.0,  color: "#3b82f6" };
  if (pct >= 77) return { letter: "C+", gradePoints: 2.33, color: "#f59e0b" };
  if (pct >= 70) return { letter: "C",  gradePoints: 2.0,  color: "#f59e0b" };
  if (pct >= 67) return { letter: "D+", gradePoints: 1.33, color: "#f97316" };
  if (pct >= 60) return { letter: "D",  gradePoints: 1.0,  color: "#f97316" };
  return               { letter: "E",  gradePoints: 0,    color: "#ef4444" };
}

/* ── INFORMATIVE SPEECH COMPONENTS ─────────────────────────────────────── */
function Chip({ label, active, color, onClick }) {
  const isGlow = color === "glow";
  const bg = active
    ? isGlow ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"
    : "rgba(255,255,255,0.03)";
  const bdr = active
    ? isGlow ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.4)"
    : "rgba(255,255,255,0.07)";
  const tc = active
    ? isGlow ? "#6ee7b7" : "#fca5a5"
    : "#7f8694";
  return (
    <button onClick={onClick} style={{
      padding: "4px 10px", borderRadius: 99, fontSize: 11, fontFamily: "inherit",
      background: bg, border: `1px solid ${bdr}`, color: tc,
      cursor: "pointer", transition: "all 0.15s", fontWeight: active ? 600 : 400,
      lineHeight: 1.4, textAlign: "left",
    }}>
      {label}
    </button>
  );
}

function ToggleBtn({ active, type, size = "normal", onClick }) {
  const isDid = type === "did";
  const dims = size === "small" ? { w: 36, h: 30, fs: 12 } : { w: 40, h: 38, fs: 14 };
  return (
    <button onClick={onClick} title={isDid ? "Did" : "Did Not"} style={{
      width: dims.w, minHeight: dims.h, border: "none",
      borderRight: "1px solid rgba(255,255,255,0.04)", cursor: "pointer", fontFamily: "inherit",
      background: active ? isDid ? "rgba(16,185,129,0.22)" : "rgba(239,68,68,0.22)" : "transparent",
      color: active ? isDid ? "#6ee7b7" : "#fca5a5" : "#3b3f4f",
      fontSize: dims.fs, display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all 0.15s", flexShrink: 0,
    }}>{isDid ? "✓" : "✗"}</button>
  );
}

function Badge({ count, type }) {
  if (!count) return null;
  const isDid = type === "did";
  return (
    <span style={{
      fontSize: 10, padding: "1px 6px", borderRadius: 99, fontWeight: 700,
      fontFamily: "'JetBrains Mono', monospace",
      background: isDid ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
      color: isDid ? "#6ee7b7" : "#fca5a5",
      border: `1px solid ${isDid ? "rgba(16,185,129,0.18)" : "rgba(239,68,68,0.18)"}`,
    }}>{count}{isDid ? "✓" : "✗"}</span>
  );
}

function CitationCounter({ count, setCount }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
      <button
        onClick={() => setCount(n => n + 1)}
        title="Tap to count a citation"
        style={{
          background: "transparent", border: "none", cursor: "pointer", padding: 0,
          color: "#f1f5f9", fontSize: 28, fontWeight: 800,
          fontFamily: "'JetBrains Mono', monospace", lineHeight: 1,
          width: "100%", textAlign: "center", transition: "transform 0.1s",
        }}
        onMouseDown={e => e.currentTarget.style.transform = "scale(0.88)"}
        onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >{count}</button>
      <button onClick={() => setCount(n => Math.max(0, n - 1))} style={{
        background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
        borderRadius: 4, color: "#f87171", fontSize: 10, fontWeight: 700,
        cursor: "pointer", padding: "2px 8px", fontFamily: "inherit", lineHeight: 1.4,
      }}>−1</button>
    </div>
  );
}

const labelStyle = { fontSize: 10, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 3 };
const inputStyle = { width: "100%", padding: "9px 11px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, color: "#e2e4e9", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box" };

/* ── INFORMATIVE SPEECH GRADER ─────────────────────────────────────────── */
function InformativeSpeechGrader({ onBack }) {
  const [studentName, setStudentName] = useState("");
  const [topic, setTopic] = useState("");
  const [marks, setMarks] = useState(buildItemKeys(INFORMATIVE_SECTIONS));
  const [scores, setScores] = useState({});
  const [notes, setNotes] = useState({});
  const [collapsed, setCollapsed] = useState({});
  const [additionalComments, setAdditionalComments] = useState("");
  const [citationCount, setCitationCount] = useState(0);
  const [selectedGlows, setSelectedGlows] = useState({});
  const [selectedGrows, setSelectedGrows] = useState({});

  const toggle = useCallback((key, value) => {
    setMarks((p) => ({ ...p, [key]: p[key] === value ? null : value }));
  }, []);

  const toggleChip = (setter, si, idx) => {
    setter((p) => {
      const key = `${si}-${idx}`;
      const next = { ...p };
      if (next[key]) delete next[key]; else next[key] = true;
      return next;
    });
  };

  const getSectionMarks = (si) => {
    const dids = [], didNots = [];
    Object.entries(marks).forEach(([key, val]) => {
      if (key.startsWith(`${si}-`)) {
        const label = getItemLabel(INFORMATIVE_SECTIONS, key);
        const isSub = key.split("-").length === 3;
        if (val === "did") dids.push({ label, isSub });
        if (val === "didnot") didNots.push({ label, isSub });
      }
    });
    return { dids, didNots };
  };

  const getSectionGlows = (si) => INFORMATIVE_SECTIONS[si].glows.filter((_, i) => selectedGlows[`${si}-${i}`]);
  const getSectionGrows = (si) => INFORMATIVE_SECTIONS[si].grows.filter((_, i) => selectedGrows[`${si}-${i}`]);

  const totalScore = Object.values(scores).reduce((a, b) => a + (Number(b) || 0), 0);
  const pct = INFORMATIVE_TOTAL_PTS > 0 ? Math.round((totalScore / INFORMATIVE_TOTAL_PTS) * 100) : 0;
  const grade = letterGrade(pct);
  const noCitations = citationCount === 0;
  const lowCitations = citationCount > 0 && citationCount < 3;
  const gradeColor = grade.color;

  const handleReset = () => {
    setMarks(buildItemKeys(INFORMATIVE_SECTIONS)); setScores({}); setNotes({});
    setStudentName(""); setTopic(""); setAdditionalComments("");
    setCitationCount(0); setSelectedGlows({}); setSelectedGrows({});
  };

  const buildSummary = () => {
    let t = `INFORMATIVE SPEECH – GRADING SUMMARY\nStudent: ${studentName || "___"}\nTopic: ${topic || "___"}\n`;
    if (citationCount > 0) t += `Oral citations counted: ${citationCount}\n`;
    t += "\n";
    INFORMATIVE_SECTIONS.forEach((sec, si) => {
      const { dids, didNots } = getSectionMarks(si);
      const glows = getSectionGlows(si);
      const grows = getSectionGrows(si);
      t += `── ${sec.title} (${scores[si] || "___"}/${sec.pts}) ──\n`;
      if (dids.length) t += `  DID:\n${dids.map(item => `${item.isSub ? "      " : "    "}✓ ${item.label}`).join("\n")}\n`;
      if (didNots.length) t += `  DID NOT:\n${didNots.map(item => `${item.isSub ? "      " : "    "}✗ ${item.label}`).join("\n")}\n`;
      if (glows.length) t += `  GLOWS:\n${glows.map(g => `    ☀ ${g}`).join("\n")}\n`;
      if (grows.length) t += `  GROWS:\n${grows.map(g => `    ➜ ${g}`).join("\n")}\n`;
      if (notes[si]) t += `  Notes: ${notes[si]}\n`;
      t += "\n";
    });
    t += `── TOTAL: ${totalScore}/${INFORMATIVE_TOTAL_PTS} (${pct}% · ${grade.letter} · GP ${grade.gradePoints}) ──\n`;
    if (additionalComments) t += `\nAdditional Comments:\n${additionalComments}\n`;
    return t;
  };

  const handleCopy = () => navigator.clipboard.writeText(buildSummary()).then(() => alert("Summary copied!"));

  return (
    <div className="grader-wrap" style={{ fontFamily: "'Outfit', sans-serif", background: "#07090f", minHeight: "100vh", color: "#e2e8f0" }}>

      {/* Header */}
      <header className="no-print" style={{
        background: "rgba(7,9,15,0.92)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 20px",
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #6366f1, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: "0 4px 16px rgba(99,102,241,0.35)", flexShrink: 0 }}>📢</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.025em", color: "#f1f5f9", lineHeight: 1.2 }}>Informative Speech Grader</div>
            <div style={{ fontSize: 11, color: "#475569", marginTop: 1 }}>{INFORMATIVE_TOTAL_PTS} pts · Target avg B+</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={onBack} style={{ background: "rgba(255,255,255,0.04)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "7px 13px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}>🏠 Dashboard</button>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 99, padding: "6px 14px" }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: gradeColor, fontFamily: "'JetBrains Mono', monospace" }}>{totalScore}</span>
            <span style={{ fontSize: 11, color: "#475569", fontFamily: "'JetBrains Mono', monospace" }}>/ {INFORMATIVE_TOTAL_PTS}</span>
            <div style={{ width: 60, height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#6366f1,#a855f7)", borderRadius: 99, transition: "width 0.45s cubic-bezier(0.4,0,0.2,1)" }} />
            </div>
            {totalScore > 0 && <span style={{ fontSize: 11, color: gradeColor, fontWeight: 700 }}>{pct}%</span>}
          </div>
          {[
            { label: "Copy", emoji: "📋", onClick: handleCopy, bg: "rgba(99,102,241,0.12)", bd: "rgba(99,102,241,0.25)", color: "#a5b4fc" },
            { label: "Print", emoji: "🖨️", onClick: () => window.print(), bg: "rgba(255,255,255,0.05)", bd: "rgba(255,255,255,0.08)", color: "#94a3b8" },
            { label: "↺", emoji: "", onClick: handleReset, bg: "rgba(239,68,68,0.1)", bd: "rgba(239,68,68,0.2)", color: "#f87171" },
          ].map(({ label, emoji, onClick, bg, bd, color }) => (
            <button key={label} onClick={onClick} style={{ background: bg, border: `1px solid ${bd}`, color, borderRadius: 8, padding: "7px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4, transition: "opacity 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >{emoji}{emoji && label !== "↺" ? " " : ""}{label}</button>
          ))}
        </div>
      </header>

      <div className="no-print" style={{ maxWidth: 880, margin: "0 auto", padding: "20px 16px 100px" }}>
        {/* Student info */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 96px", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Student", value: studentName, set: setStudentName, ph: "Student name…" },
            { label: "Topic", value: topic, set: setTopic, ph: "Speech topic…" },
          ].map(({ label, value, set, ph }) => (
            <div key={label} style={{ background: "#0d1120", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "12px 14px" }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>{label}</label>
              <input value={value} onChange={e => set(e.target.value)} placeholder={ph} style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 4, color: "#f1f5f9", fontSize: 14, fontWeight: 500, fontFamily: "inherit" }} />
            </div>
          ))}
          <div style={{ background: "#0d1120", border: `1px solid ${noCitations ? "rgba(239,68,68,0.3)" : lowCitations ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.07)"}`, borderRadius: 12, padding: "12px 14px", display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 4 }}>Oral Cites</label>
            <CitationCounter count={citationCount} setCount={setCitationCount} />
          </div>
        </div>

        {noCitations && (
          <div className="anim" style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.15)", borderLeft: "3px solid #ef4444", borderRadius: 8, padding: "8px 12px", marginBottom: 14, fontSize: 11.5, color: "#fca5a5", display: "flex", alignItems: "center", gap: 8, lineHeight: 1.5 }}>
            <span style={{ fontSize: 15, flexShrink: 0 }}>⚠️</span><span><strong>Zero oral citations.</strong> Cap at ~90% (180 pts). Flag in Content and total grade.</span>
          </div>
        )}
        {lowCitations && (
          <div className="anim" style={{ background: "rgba(251,146,60,0.07)", border: "1px solid rgba(251,146,60,0.15)", borderLeft: "3px solid #f97316", borderRadius: 8, padding: "8px 12px", marginBottom: 14, fontSize: 11.5, color: "#fdba74", display: "flex", alignItems: "center", gap: 8, lineHeight: 1.5 }}>
            <span style={{ fontSize: 15, flexShrink: 0 }}>⚠️</span><span><strong>Below minimum citations</strong> (min 3, 5–8 recommended). Deduct in Content.</span>
          </div>
        )}

        {/* Sections */}
        {INFORMATIVE_SECTIONS.map((sec, si) => {
          const { dids, didNots } = getSectionMarks(si);
          const glows = getSectionGlows(si);
          const grows = getSectionGrows(si);
          const isCollapsed = collapsed[si];
          const hasContent = dids.length + didNots.length + glows.length + grows.length;
          const meta = INFORMATIVE_SECTION_META[si] || { color: "#6366f1", rgb: "99,102,241" };
          const scoreVal = Number(scores[si]) || 0;
          const secPct = scores[si] !== undefined && scores[si] !== "" ? Math.min(100, Math.round((scoreVal / sec.pts) * 100)) : 0;

          return (
            <div key={si} className="section-card" style={{ marginBottom: 10, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", background: "#0d1120", borderLeft: `3px solid ${meta.color}` }}>
              {/* Section header */}
              <div onClick={() => setCollapsed(p => ({ ...p, [si]: !p[si] }))} style={{
                padding: "11px 14px", display: "flex", alignItems: "center", justifyContent: "space-between",
                cursor: "pointer", userSelect: "none",
                background: isCollapsed ? "transparent" : `rgba(${meta.rgb},0.05)`,
                transition: "background 0.2s",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 10, color: "#475569", transition: "transform 0.22s cubic-bezier(0.4,0,0.2,1)", transform: isCollapsed ? "rotate(-90deg)" : "rotate(0)", display: "inline-block" }}>▼</span>
                  <span style={{ fontWeight: 700, fontSize: 13.5, color: "#e2e8f0" }}>{sec.title}</span>
                  <span style={{ fontSize: 10, color: "#475569", fontFamily: "'JetBrains Mono', monospace" }}>{sec.pts} pts</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <Badge count={dids.length} type="did" />
                  <Badge count={didNots.length} type="didnot" />
                  {glows.length > 0 && <span style={{ fontSize: 10, color: "#fbbf24", fontWeight: 600 }}>☀ {glows.length}</span>}
                  {grows.length > 0 && <span style={{ fontSize: 10, color: "#a78bfa", fontWeight: 600 }}>➜ {grows.length}</span>}
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }} onClick={e => e.stopPropagation()}>
                    <input value={scores[si] ?? ""} onChange={e => { const v = e.target.value; if (v === "" || (Number(v) >= 0 && Number(v) <= sec.pts)) setScores(p => ({ ...p, [si]: v })); }} placeholder="–" style={{ width: 36, textAlign: "center", padding: "3px 0", background: "rgba(255,255,255,0.06)", border: `1px solid ${meta.color}40`, borderRadius: 6, color: meta.color, fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }} />
                    <span style={{ fontSize: 11, color: "#334155", fontFamily: "'JetBrains Mono', monospace" }}>/{sec.pts}</span>
                  </div>
                </div>
              </div>
              {/* Section progress bar */}
              {secPct > 0 && (
                <div style={{ height: 2, background: "rgba(255,255,255,0.04)" }}>
                  <div style={{ height: "100%", width: `${secPct}%`, background: meta.color, opacity: 0.7, transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)" }} />
                </div>
              )}

              {!isCollapsed && (
                <div className="anim">
                  {sec.alert && (
                    <div style={{ padding: "6px 13px", fontSize: 10.5, color: "#c4b5fd", background: "rgba(99,102,241,0.05)", borderTop: "1px solid rgba(99,102,241,0.08)", display: "flex", alignItems: "flex-start", gap: 5, lineHeight: 1.5 }}>
                      <span style={{ flexShrink: 0, fontSize: 11 }}>💡</span><span>{sec.alert}</span>
                    </div>
                  )}

                  {sec.items.map((item, ii) => {
                    const mainKey = `${si}-${ii}`;
                    const mainMark = marks[mainKey];
                    return (
                      <div key={ii}>
                        <div style={{ display: "flex", alignItems: "stretch", borderTop: "1px solid rgba(255,255,255,0.035)" }}>
                          <ToggleBtn active={mainMark === "did"} type="did" onClick={() => toggle(mainKey, "did")} />
                          <ToggleBtn active={mainMark === "didnot"} type="didnot" onClick={() => toggle(mainKey, "didnot")} />
                          <div style={{ flex: 1, padding: "7px 11px", fontSize: 12, fontWeight: 600, color: "#d1d5db", display: "flex", alignItems: "center", background: mainMark === "did" ? "rgba(16,185,129,0.03)" : mainMark === "didnot" ? "rgba(239,68,68,0.03)" : "transparent", transition: "background 0.15s" }}>
                            {item.main}
                          </div>
                        </div>
                        {item.subs.map((sub, subi) => {
                          const subKey = `${si}-${ii}-${subi}`;
                          const subMark = marks[subKey];
                          const isSup = sub.includes("(supervisor note)") || sub.includes("(−5 if");
                          return (
                            <div key={subi} style={{ display: "flex", alignItems: "stretch", borderTop: "1px solid rgba(255,255,255,0.018)" }}>
                              <ToggleBtn active={subMark === "did"} type="did" size="small" onClick={() => toggle(subKey, "did")} />
                              <ToggleBtn active={subMark === "didnot"} type="didnot" size="small" onClick={() => toggle(subKey, "didnot")} />
                              <div style={{ flex: 1, padding: "5px 11px 5px 26px", fontSize: 11, color: isSup ? "#c4b5fd" : "#6b7280", fontStyle: "italic", display: "flex", alignItems: "center", background: subMark === "did" ? "rgba(16,185,129,0.02)" : subMark === "didnot" ? "rgba(239,68,68,0.02)" : "transparent", transition: "background 0.15s" }}>
                                {isSup && <span style={{ marginRight: 3, fontSize: 9 }}>💡</span>}{sub}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}

                  {/* Glows / Grows */}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "9px 13px", background: "rgba(255,255,255,0.01)" }}>
                    <div style={{ marginBottom: 7 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#fbbf24", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>☀ Glows</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                        {sec.glows.map((g, i) => <Chip key={i} label={g} active={!!selectedGlows[`${si}-${i}`]} color="glow" onClick={() => toggleChip(setSelectedGlows, si, i)} />)}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>➜ Grows</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                        {sec.grows.map((g, i) => <Chip key={i} label={g} active={!!selectedGrows[`${si}-${i}`]} color="grow" onClick={() => toggleChip(setSelectedGrows, si, i)} />)}
                      </div>
                    </div>
                  </div>

                  {/* Cumulative notes */}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.25)", padding: "10px 13px" }}>
                    {hasContent > 0 && (
                      <div className="anim" style={{ marginBottom: 8, fontSize: 11, lineHeight: 1.7 }}>
                        {dids.length > 0 && (
                          <div style={{ marginBottom: 4 }}>
                            <div style={{ fontWeight: 700, color: "#6ee7b7", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 1 }}>DID</div>
                            {dids.map((item, i) => <div key={i} style={{ color: "#a7f3d0", paddingLeft: item.isSub ? 20 : 8, display: "flex", alignItems: "baseline", gap: 4 }}><span style={{ color: "#34d399", fontSize: 8, flexShrink: 0 }}>✓</span>{item.label}</div>)}
                          </div>
                        )}
                        {didNots.length > 0 && (
                          <div style={{ marginBottom: 4 }}>
                            <div style={{ fontWeight: 700, color: "#fca5a5", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 1 }}>DID NOT</div>
                            {didNots.map((item, i) => <div key={i} style={{ color: "#fecaca", paddingLeft: item.isSub ? 20 : 8, display: "flex", alignItems: "baseline", gap: 4 }}><span style={{ color: "#f87171", fontSize: 8, flexShrink: 0 }}>✗</span>{item.label}</div>)}
                          </div>
                        )}
                        {glows.length > 0 && (
                          <div style={{ marginBottom: 4 }}>
                            <div style={{ fontWeight: 700, color: "#fbbf24", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 1 }}>☀ GLOWS</div>
                            {glows.map((g, i) => <div key={i} style={{ color: "#fde68a", paddingLeft: 8, display: "flex", alignItems: "baseline", gap: 4 }}><span style={{ color: "#fbbf24", fontSize: 8, flexShrink: 0 }}>☀</span>{g}</div>)}
                          </div>
                        )}
                        {grows.length > 0 && (
                          <div>
                            <div style={{ fontWeight: 700, color: "#a78bfa", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 1 }}>➜ GROWS</div>
                            {grows.map((g, i) => <div key={i} style={{ color: "#c4b5fd", paddingLeft: 8, display: "flex", alignItems: "baseline", gap: 4 }}><span style={{ color: "#a78bfa", fontSize: 8, flexShrink: 0 }}>➜</span>{g}</div>)}
                          </div>
                        )}
                      </div>
                    )}
                    <textarea value={notes[si] || ""} onChange={e => setNotes(p => ({ ...p, [si]: e.target.value }))} placeholder={`Notes for ${sec.title}...`} rows={2} style={{ width: "100%", padding: "6px 9px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 6, color: "#d1d5db", fontSize: 11.5, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }} />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Total score card */}
        <div style={{
          marginTop: 6,
          background: "linear-gradient(135deg, #0d1a30 0%, #091525 60%, #0d1a30 100%)",
          border: "1px solid rgba(99,102,241,0.18)",
          borderRadius: 16, padding: "22px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
          boxShadow: "0 0 50px rgba(99,102,241,0.06), 0 2px 8px rgba(0,0,0,0.4)",
        }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#475569", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 6 }}>Final Score</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span className="score-num" style={{ fontSize: 52, fontWeight: 800, color: gradeColor, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1, letterSpacing: "-0.04em" }}>{totalScore}</span>
              <span style={{ fontSize: 20, color: "#1e2d45", fontFamily: "'JetBrains Mono', monospace" }}>/ {INFORMATIVE_TOTAL_PTS}</span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Grade</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "flex-end" }}>
              <span style={{ fontSize: 42, fontWeight: 800, color: grade.color, lineHeight: 1, letterSpacing: "-0.03em" }}>{grade.letter}</span>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#cbd5e1", letterSpacing: "-0.02em", marginBottom: 2 }}>{pct}%</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>GP {grade.gradePoints}</div>
                <div style={{ width: 160, height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                  <div className="prog" style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#6366f1 0%,#a855f7 100%)", borderRadius: 99, boxShadow: "0 0 10px rgba(99,102,241,0.4)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scoring guide */}
        <div style={{ borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)", background: "#0d1120", padding: "10px 14px", marginBottom: 10, fontSize: 11, color: "#475569", lineHeight: 1.7 }}>
          <span style={{ fontWeight: 700, color: "#64748b", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Scale: </span>
          <strong style={{ color: "#94a3b8" }}>Full</strong> → <strong style={{ color: "#94a3b8" }}>Mostly</strong> (−1–2) → <strong style={{ color: "#94a3b8" }}>Needs Improvement</strong> (half) → <strong style={{ color: "#94a3b8" }}>Much Improvement</strong> (few) → <strong style={{ color: "#94a3b8" }}>Missing</strong> (0)
          <span style={{ display: "block", marginTop: 2, color: "#374151" }}>💡 = supervisor guidance · ☀ Glows / ➜ Grows = quick feedback tags · Italic sub-items = backstage rubric</span>
        </div>

        {/* Additional comments */}
        <div style={{ background: "#0d1120", borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)", padding: "14px 16px" }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>Overall Feedback / Comments</label>
          <textarea value={additionalComments} onChange={e => setAdditionalComments(e.target.value)} placeholder="Final thoughts, overall impressions, or recommendations for the student…" rows={4} style={{ width: "100%", padding: "10px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, color: "#94a3b8", fontSize: 13, fontFamily: "inherit", resize: "vertical", lineHeight: 1.6, boxSizing: "border-box" }} />
        </div>
      </div>

      {/* ── PRINT-ONLY REPORT ──────────────────────────────────────────── */}
      <div className="print-only" style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "11pt", color: "#000", lineHeight: 1.5 }}>

        {/* Letterhead */}
        <div style={{ borderBottom: "2px solid #000", paddingBottom: 10, marginBottom: 18 }}>
          <div style={{ fontSize: "8pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#555", marginBottom: 3 }}>Public Speaking — Informative Speech</div>
          <div style={{ fontSize: "17pt", fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>Grading Report</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10pt" }}>
            <tbody>
              <tr>
                <td style={{ paddingRight: 24, paddingBottom: 4, verticalAlign: "top" }}>
                  <span style={{ fontSize: "7pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#666", display: "block" }}>Student</span>
                  <strong>{studentName || "___"}</strong>
                </td>
                <td style={{ paddingRight: 24, paddingBottom: 4, verticalAlign: "top" }}>
                  <span style={{ fontSize: "7pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#666", display: "block" }}>Topic</span>
                  <strong>{topic || "___"}</strong>
                </td>
                <td style={{ paddingRight: 24, paddingBottom: 4, verticalAlign: "top" }}>
                  <span style={{ fontSize: "7pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#666", display: "block" }}>Oral Citations</span>
                  <strong>{citationCount > 0 ? citationCount : "—"}</strong>
                </td>
                <td style={{ verticalAlign: "top" }}>
                  <span style={{ fontSize: "7pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#666", display: "block" }}>Date Printed</span>
                  <strong>{new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Sections */}
        {INFORMATIVE_SECTIONS.map((sec, si) => {
          const { dids, didNots } = getSectionMarks(si);
          const glows = getSectionGlows(si);
          const grows = getSectionGrows(si);
          const scored = scores[si] !== undefined && scores[si] !== "";
          const hasContent = dids.length + didNots.length + glows.length + grows.length + (notes[si] ? 1 : 0);
          return (
            <div key={si} className="pr-section" style={{ marginBottom: 14 }}>
              {/* Section header row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #bbb", paddingBottom: 3, marginBottom: 5 }}>
                <span style={{ fontSize: "11pt", fontWeight: 700 }}>{sec.title}</span>
                <span style={{ fontFamily: "Courier New, monospace", fontSize: "12pt", fontWeight: 700 }}>
                  {scored ? `${scores[si]} / ${sec.pts}` : `— / ${sec.pts}`}
                </span>
              </div>
              {/* Did */}
              {dids.length > 0 && (
                <div style={{ marginBottom: 4 }}>
                  <div style={{ fontSize: "7.5pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#14532d", marginBottom: 2 }}>✓ Did</div>
                  {dids.map((item, i) => <div key={i} style={{ paddingLeft: item.isSub ? 28 : 14, fontSize: "9.5pt", marginBottom: 1 }}>{item.isSub ? "◦" : "•"} {item.label}</div>)}
                </div>
              )}
              {/* Did Not */}
              {didNots.length > 0 && (
                <div style={{ marginBottom: 4 }}>
                  <div style={{ fontSize: "7.5pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#7f1d1d", marginBottom: 2 }}>✗ Did Not</div>
                  {didNots.map((item, i) => <div key={i} style={{ paddingLeft: item.isSub ? 28 : 14, fontSize: "9.5pt", marginBottom: 1 }}>{item.isSub ? "◦" : "•"} {item.label}</div>)}
                </div>
              )}
              {/* Glows */}
              {glows.length > 0 && (
                <div style={{ marginBottom: 4 }}>
                  <div style={{ fontSize: "7.5pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#78350f", marginBottom: 2 }}>☀ Glows</div>
                  {glows.map((g, i) => <div key={i} style={{ paddingLeft: 14, fontSize: "9.5pt", marginBottom: 1 }}>• {g}</div>)}
                </div>
              )}
              {/* Grows */}
              {grows.length > 0 && (
                <div style={{ marginBottom: 4 }}>
                  <div style={{ fontSize: "7.5pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#3b0764", marginBottom: 2 }}>➜ Grows</div>
                  {grows.map((g, i) => <div key={i} style={{ paddingLeft: 14, fontSize: "9.5pt", marginBottom: 1 }}>• {g}</div>)}
                </div>
              )}
              {/* Notes */}
              {notes[si] && (
                <div style={{ marginTop: 4, padding: "4px 9px", background: "#f5f5f5", border: "1px solid #ddd", borderRadius: 2, fontSize: "9pt", fontStyle: "italic" }}>
                  <strong style={{ fontStyle: "normal" }}>Notes:</strong> {notes[si]}
                </div>
              )}
              {!hasContent && !scored && (
                <div style={{ fontSize: "9pt", color: "#999", fontStyle: "italic" }}>No items marked.</div>
              )}
            </div>
          );
        })}

        {/* Total */}
        <div style={{ borderTop: "2.5px solid #000", paddingTop: 10, marginTop: 6, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <strong style={{ fontSize: "13pt" }}>Total Score</strong>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <span style={{ fontFamily: "Courier New, monospace", fontSize: "18pt", fontWeight: 700 }}>
              {totalScore} / {INFORMATIVE_TOTAL_PTS}
              <span style={{ fontSize: "12pt", fontWeight: 400, color: "#333", marginLeft: 10 }}>{pct}%</span>
            </span>
            <span style={{ fontSize: "20pt", fontWeight: 800, color: grade.color }}>{grade.letter}</span>
          </div>
        </div>

        {/* Additional comments */}
        {additionalComments && (
          <div className="pr-section" style={{ marginTop: 16, padding: "8px 12px", border: "1px solid #ccc", borderRadius: 3 }}>
            <div style={{ fontSize: "7.5pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#555", marginBottom: 5 }}>Overall Feedback</div>
            <div style={{ fontSize: "10pt", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{additionalComments}</div>
          </div>
        )}
      </div>

    </div>
  );
}

/* ── PERSUASIVE SPEECH GRADER ─────────────────────────────────────────── */
function PersuasiveSpeechGrader({ onBack }) {
  const [studentName, setStudentName] = useState("");
  const [topic, setTopic] = useState("");
  const [marks, setMarks] = useState(buildItemKeys(PERSUASIVE_SECTIONS));
  const [scores, setScores] = useState({});
  const [notes, setNotes] = useState({});
  const [collapsed, setCollapsed] = useState({});
  const [additionalComments, setAdditionalComments] = useState("");
  const [citationCount, setCitationCount] = useState(0);
  const [selectedGlows, setSelectedGlows] = useState({});
  const [selectedGrows, setSelectedGrows] = useState({});

  const toggle = useCallback((key, value) => {
    setMarks((p) => ({ ...p, [key]: p[key] === value ? null : value }));
  }, []);

  const toggleChip = (setter, si, idx) => {
    setter((p) => {
      const key = `${si}-${idx}`;
      const next = { ...p };
      if (next[key]) delete next[key]; else next[key] = true;
      return next;
    });
  };

  const getSectionMarks = (si) => {
    const dids = [], didNots = [];
    Object.entries(marks).forEach(([key, val]) => {
      if (key.startsWith(`${si}-`)) {
        const label = getItemLabel(PERSUASIVE_SECTIONS, key);
        const isSub = key.split("-").length === 3;
        if (val === "did") dids.push({ label, isSub });
        if (val === "didnot") didNots.push({ label, isSub });
      }
    });
    return { dids, didNots };
  };

  const getSectionGlows = (si) => PERSUASIVE_SECTIONS[si].glows.filter((_, i) => selectedGlows[`${si}-${i}`]);
  const getSectionGrows = (si) => PERSUASIVE_SECTIONS[si].grows.filter((_, i) => selectedGrows[`${si}-${i}`]);

  const totalScore = Object.values(scores).reduce((a, b) => a + (Number(b) || 0), 0);
  const pct = PERSUASIVE_TOTAL_PTS > 0 ? Math.round((totalScore / PERSUASIVE_TOTAL_PTS) * 100) : 0;
  const grade = letterGrade(pct);
  const noCitations = citationCount === 0;
  const lowCitations = citationCount > 0 && citationCount < 7;
  const gradeColor = grade.color;

  // Check for call to action (Action Step is section 4, main item 0)
  const noCallToAction = marks["4-0"] === "didnot";
  const noNeed = !Object.entries(marks).some(([k, v]) => k.startsWith("1-") && v === "did");
  const noSatisfaction = !Object.entries(marks).some(([k, v]) => k.startsWith("2-") && v === "did");

  const handleReset = () => {
    setMarks(buildItemKeys(PERSUASIVE_SECTIONS)); setScores({}); setNotes({});
    setStudentName(""); setTopic(""); setAdditionalComments("");
    setCitationCount(0); setSelectedGlows({}); setSelectedGrows({});
  };

  const buildSummary = () => {
    let t = `PERSUASIVE SPEECH – GRADING SUMMARY\nStudent: ${studentName || "___"}\nTopic: ${topic || "___"}\n`;
    if (citationCount > 0) t += `Oral citations counted: ${citationCount}\n`;
    t += "\n";
    PERSUASIVE_SECTIONS.forEach((sec, si) => {
      const { dids, didNots } = getSectionMarks(si);
      const glows = getSectionGlows(si);
      const grows = getSectionGrows(si);
      t += `── ${sec.title} (${scores[si] || "___"}/${sec.pts}) ──\n`;
      if (dids.length) t += `  DID:\n${dids.map(item => `${item.isSub ? "      " : "    "}✓ ${item.label}`).join("\n")}\n`;
      if (didNots.length) t += `  DID NOT:\n${didNots.map(item => `${item.isSub ? "      " : "    "}✗ ${item.label}`).join("\n")}\n`;
      if (glows.length) t += `  GLOWS:\n${glows.map(g => `    ☀ ${g}`).join("\n")}\n`;
      if (grows.length) t += `  GROWS:\n${grows.map(g => `    ➜ ${g}`).join("\n")}\n`;
      if (notes[si]) t += `  Notes: ${notes[si]}\n`;
      t += "\n";
    });
    t += `── TOTAL: ${totalScore}/${PERSUASIVE_TOTAL_PTS} (${pct}% · ${grade.letter} · GP ${grade.gradePoints}) ──\n`;
    if (additionalComments) t += `\nAdditional Comments:\n${additionalComments}\n`;
    return t;
  };

  const handleCopy = () => navigator.clipboard.writeText(buildSummary()).then(() => alert("Summary copied!"));

  return (
    <div className="grader-wrap" style={{ fontFamily: "'Outfit', sans-serif", background: "#07090f", minHeight: "100vh", color: "#e2e8f0" }}>

      {/* Header */}
      <header className="no-print" style={{
        background: "rgba(7,9,15,0.92)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 20px",
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #dc2626, #f97316)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: "0 4px 16px rgba(220,38,38,0.35)", flexShrink: 0 }}>🔥</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.025em", color: "#f1f5f9", lineHeight: 1.2 }}>Persuasive Speech Grader</div>
            <div style={{ fontSize: 11, color: "#475569", marginTop: 1 }}>{PERSUASIVE_TOTAL_PTS} pts · Monroe's Motivated Sequence</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={onBack} style={{ background: "rgba(255,255,255,0.04)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "7px 13px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}>🏠 Dashboard</button>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 99, padding: "6px 14px" }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: gradeColor, fontFamily: "'JetBrains Mono', monospace" }}>{totalScore}</span>
            <span style={{ fontSize: 11, color: "#475569", fontFamily: "'JetBrains Mono', monospace" }}>/ {PERSUASIVE_TOTAL_PTS}</span>
            <div style={{ width: 60, height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#dc2626,#f97316)", borderRadius: 99, transition: "width 0.45s cubic-bezier(0.4,0,0.2,1)" }} />
            </div>
            {totalScore > 0 && <span style={{ fontSize: 11, color: gradeColor, fontWeight: 700 }}>{pct}%</span>}
          </div>
          {[
            { label: "Copy", emoji: "📋", onClick: handleCopy, bg: "rgba(220,38,38,0.12)", bd: "rgba(220,38,38,0.25)", color: "#fca5a5" },
            { label: "Print", emoji: "🖨️", onClick: () => window.print(), bg: "rgba(255,255,255,0.05)", bd: "rgba(255,255,255,0.08)", color: "#94a3b8" },
            { label: "↺", emoji: "", onClick: handleReset, bg: "rgba(239,68,68,0.1)", bd: "rgba(239,68,68,0.2)", color: "#f87171" },
          ].map(({ label, emoji, onClick, bg, bd, color }) => (
            <button key={label} onClick={onClick} style={{ background: bg, border: `1px solid ${bd}`, color, borderRadius: 8, padding: "7px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4, transition: "opacity 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >{emoji}{emoji && label !== "↺" ? " " : ""}{label}</button>
          ))}
        </div>
      </header>

      <div className="no-print" style={{ maxWidth: 880, margin: "0 auto", padding: "20px 16px 100px" }}>
        {/* Student info */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 96px", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Student", value: studentName, set: setStudentName, ph: "Student name…" },
            { label: "Topic", value: topic, set: setTopic, ph: "Speech topic…" },
          ].map(({ label, value, set, ph }) => (
            <div key={label} style={{ background: "#0d1120", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "12px 14px" }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>{label}</label>
              <input value={value} onChange={e => set(e.target.value)} placeholder={ph} style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 4, color: "#f1f5f9", fontSize: 14, fontWeight: 500, fontFamily: "inherit" }} />
            </div>
          ))}
          <div style={{ background: "#0d1120", border: `1px solid ${noCitations ? "rgba(239,68,68,0.3)" : lowCitations ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.07)"}`, borderRadius: 12, padding: "12px 14px", display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 4 }}>Oral Cites</label>
            <CitationCounter count={citationCount} setCount={setCitationCount} />
          </div>
        </div>

        {noCitations && (
          <div className="anim" style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.15)", borderLeft: "3px solid #ef4444", borderRadius: 8, padding: "8px 12px", marginBottom: 14, fontSize: 11.5, color: "#fca5a5", display: "flex", alignItems: "center", gap: 8, lineHeight: 1.5 }}>
            <span style={{ fontSize: 15, flexShrink: 0 }}>⚠️</span><span><strong>Zero oral citations.</strong> Impact Need/Satisfaction heavily.</span>
          </div>
        )}
        {lowCitations && (
          <div className="anim" style={{ background: "rgba(251,146,60,0.07)", border: "1px solid rgba(251,146,60,0.15)", borderLeft: "3px solid #f97316", borderRadius: 8, padding: "8px 12px", marginBottom: 12, fontSize: 11.5, color: "#fdba74", display: "flex", alignItems: "center", gap: 8, lineHeight: 1.5 }}>
            <span style={{ fontSize: 15, flexShrink: 0 }}>⚠️</span><span><strong>Below 7 citations</strong> (min 7, ~10 recommended, 2+ peer-reviewed). Deduct in Need/Satisfaction.</span>
          </div>
        )}
        {noCallToAction && (
          <div className="anim" style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.15)", borderLeft: "3px solid #dc2626", borderRadius: 8, padding: "8px 12px", marginBottom: 12, fontSize: 11.5, color: "#fca5a5", display: "flex", alignItems: "center", gap: 8, lineHeight: 1.5 }}>
            <span style={{ fontSize: 15, flexShrink: 0 }}>🚨</span><span><strong>No call to action.</strong> Speech should NOT receive an A (supervisor policy).</span>
          </div>
        )}
        {(noNeed || noSatisfaction) && (
          <div className="anim" style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.15)", borderLeft: "3px solid #ef4444", borderRadius: 8, padding: "8px 12px", marginBottom: 12, fontSize: 11.5, color: "#fca5a5", display: "flex", alignItems: "center", gap: 8, lineHeight: 1.5 }}>
            <span style={{ fontSize: 15, flexShrink: 0 }}>⚠️</span><span><strong>Missing Need or Satisfaction step.</strong> Cap at ~85% (supervisor policy).</span>
          </div>
        )}

        {/* Sections */}
        {PERSUASIVE_SECTIONS.map((sec, si) => {
          const { dids, didNots } = getSectionMarks(si);
          const glows = getSectionGlows(si);
          const grows = getSectionGrows(si);
          const isCollapsed = collapsed[si];
          const hasContent = dids.length + didNots.length + glows.length + grows.length;
          const meta = PERSUASIVE_SECTION_META[si] || { color: "#ef4444", rgb: "239,68,68" };
          const scoreVal = Number(scores[si]) || 0;
          const secPct = scores[si] !== undefined && scores[si] !== "" ? Math.min(100, Math.round((scoreVal / sec.pts) * 100)) : 0;

          return (
            <div key={si} className="section-card" style={{ marginBottom: 10, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", background: "#0d1120", borderLeft: `3px solid ${meta.color}` }}>
              {/* Section header */}
              <div onClick={() => setCollapsed(p => ({ ...p, [si]: !p[si] }))} style={{
                padding: "11px 14px", display: "flex", alignItems: "center", justifyContent: "space-between",
                cursor: "pointer", userSelect: "none",
                background: isCollapsed ? "transparent" : `rgba(${meta.rgb},0.05)`,
                transition: "background 0.2s",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 10, color: "#475569", transition: "transform 0.22s cubic-bezier(0.4,0,0.2,1)", transform: isCollapsed ? "rotate(-90deg)" : "rotate(0)", display: "inline-block" }}>▼</span>
                  <span style={{ fontWeight: 700, fontSize: 13.5, color: "#e2e8f0" }}>{sec.title}</span>
                  <span style={{ fontSize: 10, color: "#475569", fontFamily: "'JetBrains Mono', monospace" }}>{sec.pts} pts</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <Badge count={dids.length} type="did" />
                  <Badge count={didNots.length} type="didnot" />
                  {glows.length > 0 && <span style={{ fontSize: 10, color: "#fbbf24", fontWeight: 600 }}>☀ {glows.length}</span>}
                  {grows.length > 0 && <span style={{ fontSize: 10, color: "#a78bfa", fontWeight: 600 }}>➜ {grows.length}</span>}
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }} onClick={e => e.stopPropagation()}>
                    <input value={scores[si] ?? ""} onChange={e => { const v = e.target.value; if (v === "" || (Number(v) >= 0 && Number(v) <= sec.pts)) setScores(p => ({ ...p, [si]: v })); }} placeholder="–" style={{ width: 36, textAlign: "center", padding: "3px 0", background: "rgba(255,255,255,0.06)", border: `1px solid ${meta.color}40`, borderRadius: 6, color: meta.color, fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }} />
                    <span style={{ fontSize: 11, color: "#334155", fontFamily: "'JetBrains Mono', monospace" }}>/{sec.pts}</span>
                  </div>
                </div>
              </div>
              {/* Section progress bar */}
              {secPct > 0 && (
                <div style={{ height: 2, background: "rgba(255,255,255,0.04)" }}>
                  <div style={{ height: "100%", width: `${secPct}%`, background: meta.color, opacity: 0.7, transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)" }} />
                </div>
              )}

              {!isCollapsed && (
                <div className="anim">
                  {sec.alert && (
                    <div style={{ padding: "6px 13px", fontSize: 10.5, color: "#fca5a5", background: "rgba(220,38,38,0.04)", borderTop: "1px solid rgba(220,38,38,0.08)", display: "flex", alignItems: "flex-start", gap: 5, lineHeight: 1.5 }}>
                      <span style={{ flexShrink: 0, fontSize: 11 }}>💡</span><span>{sec.alert}</span>
                    </div>
                  )}

                  {sec.items.map((item, ii) => {
                    const mainKey = `${si}-${ii}`;
                    const mainMark = marks[mainKey];
                    return (
                      <div key={ii}>
                        <div style={{ display: "flex", alignItems: "stretch", borderTop: "1px solid rgba(255,255,255,0.035)" }}>
                          <ToggleBtn active={mainMark === "did"} type="did" onClick={() => toggle(mainKey, "did")} />
                          <ToggleBtn active={mainMark === "didnot"} type="didnot" onClick={() => toggle(mainKey, "didnot")} />
                          <div style={{ flex: 1, padding: "7px 11px", fontSize: 12, fontWeight: 600, color: "#d1d5db", display: "flex", alignItems: "center", background: mainMark === "did" ? "rgba(16,185,129,0.03)" : mainMark === "didnot" ? "rgba(239,68,68,0.03)" : "transparent", transition: "background 0.15s" }}>
                            {item.main}
                          </div>
                        </div>
                        {item.subs.map((sub, subi) => {
                          const subKey = `${si}-${ii}-${subi}`;
                          const subMark = marks[subKey];
                          const isSup = sub.includes("(supervisor") || sub.includes("policy)");
                          return (
                            <div key={subi} style={{ display: "flex", alignItems: "stretch", borderTop: "1px solid rgba(255,255,255,0.018)" }}>
                              <ToggleBtn active={subMark === "did"} type="did" size="small" onClick={() => toggle(subKey, "did")} />
                              <ToggleBtn active={subMark === "didnot"} type="didnot" size="small" onClick={() => toggle(subKey, "didnot")} />
                              <div style={{ flex: 1, padding: "5px 11px 5px 26px", fontSize: 11, color: isSup ? "#fca5a5" : "#6b7280", fontStyle: "italic", display: "flex", alignItems: "center", background: subMark === "did" ? "rgba(16,185,129,0.02)" : subMark === "didnot" ? "rgba(239,68,68,0.02)" : "transparent", transition: "background 0.15s" }}>
                                {isSup && <span style={{ marginRight: 3, fontSize: 9 }}>💡</span>}{sub}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}

                  {/* Glows / Grows */}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "9px 13px", background: "rgba(255,255,255,0.01)" }}>
                    <div style={{ marginBottom: 7 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#fbbf24", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>☀ Glows</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                        {sec.glows.map((g, i) => <Chip key={i} label={g} active={!!selectedGlows[`${si}-${i}`]} color="glow" onClick={() => toggleChip(setSelectedGlows, si, i)} />)}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>➜ Grows</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                        {sec.grows.map((g, i) => <Chip key={i} label={g} active={!!selectedGrows[`${si}-${i}`]} color="grow" onClick={() => toggleChip(setSelectedGrows, si, i)} />)}
                      </div>
                    </div>
                  </div>

                  {/* Cumulative notes */}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.25)", padding: "10px 13px" }}>
                    {hasContent > 0 && (
                      <div className="anim" style={{ marginBottom: 8, fontSize: 11, lineHeight: 1.7 }}>
                        {dids.length > 0 && (
                          <div style={{ marginBottom: 4 }}>
                            <div style={{ fontWeight: 700, color: "#6ee7b7", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 1 }}>DID</div>
                            {dids.map((item, i) => <div key={i} style={{ color: "#a7f3d0", paddingLeft: item.isSub ? 20 : 8, display: "flex", alignItems: "baseline", gap: 4 }}><span style={{ color: "#34d399", fontSize: 8, flexShrink: 0 }}>✓</span>{item.label}</div>)}
                          </div>
                        )}
                        {didNots.length > 0 && (
                          <div style={{ marginBottom: 4 }}>
                            <div style={{ fontWeight: 700, color: "#fca5a5", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 1 }}>DID NOT</div>
                            {didNots.map((item, i) => <div key={i} style={{ color: "#fecaca", paddingLeft: item.isSub ? 20 : 8, display: "flex", alignItems: "baseline", gap: 4 }}><span style={{ color: "#f87171", fontSize: 8, flexShrink: 0 }}>✗</span>{item.label}</div>)}
                          </div>
                        )}
                        {glows.length > 0 && (
                          <div style={{ marginBottom: 4 }}>
                            <div style={{ fontWeight: 700, color: "#fbbf24", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 1 }}>☀ GLOWS</div>
                            {glows.map((g, i) => <div key={i} style={{ color: "#fde68a", paddingLeft: 8, display: "flex", alignItems: "baseline", gap: 4 }}><span style={{ color: "#fbbf24", fontSize: 8, flexShrink: 0 }}>☀</span>{g}</div>)}
                          </div>
                        )}
                        {grows.length > 0 && (
                          <div>
                            <div style={{ fontWeight: 700, color: "#a78bfa", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 1 }}>➜ GROWS</div>
                            {grows.map((g, i) => <div key={i} style={{ color: "#c4b5fd", paddingLeft: 8, display: "flex", alignItems: "baseline", gap: 4 }}><span style={{ color: "#a78bfa", fontSize: 8, flexShrink: 0 }}>➜</span>{g}</div>)}
                          </div>
                        )}
                      </div>
                    )}
                    <textarea value={notes[si] || ""} onChange={e => setNotes(p => ({ ...p, [si]: e.target.value }))} placeholder={`Notes for ${sec.title}...`} rows={2} style={{ width: "100%", padding: "6px 9px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 6, color: "#d1d5db", fontSize: 11.5, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }} />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Total score card */}
        <div style={{
          marginTop: 6,
          background: "linear-gradient(135deg, #1a0a0a 0%, #120606 60%, #1a0a0a 100%)",
          border: "1px solid rgba(220,38,38,0.18)",
          borderRadius: 16, padding: "22px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
          boxShadow: "0 0 50px rgba(220,38,38,0.06), 0 2px 8px rgba(0,0,0,0.4)",
        }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#475569", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 6 }}>Final Score</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span className="score-num" style={{ fontSize: 52, fontWeight: 800, color: gradeColor, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1, letterSpacing: "-0.04em" }}>{totalScore}</span>
              <span style={{ fontSize: 20, color: "#2d1515", fontFamily: "'JetBrains Mono', monospace" }}>/ {PERSUASIVE_TOTAL_PTS}</span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Grade</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "flex-end" }}>
              <span style={{ fontSize: 42, fontWeight: 800, color: grade.color, lineHeight: 1, letterSpacing: "-0.03em" }}>{grade.letter}</span>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#cbd5e1", letterSpacing: "-0.02em", marginBottom: 2 }}>{pct}%</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>GP {grade.gradePoints}</div>
                <div style={{ width: 160, height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                  <div className="prog" style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#dc2626 0%,#f97316 100%)", borderRadius: 99, boxShadow: "0 0 10px rgba(220,38,38,0.4)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scoring guide */}
        <div style={{ borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)", background: "#0d1120", padding: "10px 14px", marginBottom: 10, fontSize: 11, color: "#475569", lineHeight: 1.7 }}>
          <span style={{ fontWeight: 700, color: "#64748b", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Scale: </span>
          <strong style={{ color: "#94a3b8" }}>Full</strong> → <strong style={{ color: "#94a3b8" }}>Mostly</strong> (−1–2) → <strong style={{ color: "#94a3b8" }}>Needs Improvement</strong> (half) → <strong style={{ color: "#94a3b8" }}>Much Improvement</strong> (few) → <strong style={{ color: "#94a3b8" }}>Missing</strong> (0)
          <span style={{ display: "block", marginTop: 2, color: "#374151" }}>💡 = supervisor guidance · ☀ Glows / ➜ Grows = quick feedback tags · Monroe's Sequence is the structure</span>
        </div>

        {/* Additional comments */}
        <div style={{ background: "#0d1120", borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)", padding: "14px 16px" }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>Overall Feedback / Comments</label>
          <textarea value={additionalComments} onChange={e => setAdditionalComments(e.target.value)} placeholder="Final thoughts, overall impressions, or recommendations for the student…" rows={4} style={{ width: "100%", padding: "10px 12px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, color: "#94a3b8", fontSize: 13, fontFamily: "inherit", resize: "vertical", lineHeight: 1.6, boxSizing: "border-box" }} />
        </div>
      </div>

      {/* ── PRINT-ONLY REPORT ──────────────────────────────────────────── */}
      <div className="print-only" style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "11pt", color: "#000", lineHeight: 1.5 }}>

        {/* Letterhead */}
        <div style={{ borderBottom: "2px solid #000", paddingBottom: 10, marginBottom: 18 }}>
          <div style={{ fontSize: "8pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#555", marginBottom: 3 }}>Public Speaking — Persuasive Speech (Monroe's Motivated Sequence)</div>
          <div style={{ fontSize: "17pt", fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>Grading Report</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10pt" }}>
            <tbody>
              <tr>
                <td style={{ paddingRight: 24, paddingBottom: 4, verticalAlign: "top" }}>
                  <span style={{ fontSize: "7pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#666", display: "block" }}>Student</span>
                  <strong>{studentName || "___"}</strong>
                </td>
                <td style={{ paddingRight: 24, paddingBottom: 4, verticalAlign: "top" }}>
                  <span style={{ fontSize: "7pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#666", display: "block" }}>Topic</span>
                  <strong>{topic || "___"}</strong>
                </td>
                <td style={{ paddingRight: 24, paddingBottom: 4, verticalAlign: "top" }}>
                  <span style={{ fontSize: "7pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#666", display: "block" }}>Oral Citations</span>
                  <strong>{citationCount > 0 ? citationCount : "—"}</strong>
                </td>
                <td style={{ verticalAlign: "top" }}>
                  <span style={{ fontSize: "7pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#666", display: "block" }}>Date Printed</span>
                  <strong>{new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Sections */}
        {PERSUASIVE_SECTIONS.map((sec, si) => {
          const { dids, didNots } = getSectionMarks(si);
          const glows = getSectionGlows(si);
          const grows = getSectionGrows(si);
          const scored = scores[si] !== undefined && scores[si] !== "";
          const hasContent = dids.length + didNots.length + glows.length + grows.length + (notes[si] ? 1 : 0);
          return (
            <div key={si} className="pr-section" style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #bbb", paddingBottom: 3, marginBottom: 5 }}>
                <span style={{ fontSize: "11pt", fontWeight: 700 }}>{sec.title}</span>
                <span style={{ fontFamily: "Courier New, monospace", fontSize: "12pt", fontWeight: 700 }}>
                  {scored ? `${scores[si]} / ${sec.pts}` : `— / ${sec.pts}`}
                </span>
              </div>
              {dids.length > 0 && (
                <div style={{ marginBottom: 4 }}>
                  <div style={{ fontSize: "7.5pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#14532d", marginBottom: 2 }}>✓ Did</div>
                  {dids.map((item, i) => <div key={i} style={{ paddingLeft: item.isSub ? 28 : 14, fontSize: "9.5pt", marginBottom: 1 }}>{item.isSub ? "◦" : "•"} {item.label}</div>)}
                </div>
              )}
              {didNots.length > 0 && (
                <div style={{ marginBottom: 4 }}>
                  <div style={{ fontSize: "7.5pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#7f1d1d", marginBottom: 2 }}>✗ Did Not</div>
                  {didNots.map((item, i) => <div key={i} style={{ paddingLeft: item.isSub ? 28 : 14, fontSize: "9.5pt", marginBottom: 1 }}>{item.isSub ? "◦" : "•"} {item.label}</div>)}
                </div>
              )}
              {glows.length > 0 && (
                <div style={{ marginBottom: 4 }}>
                  <div style={{ fontSize: "7.5pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#78350f", marginBottom: 2 }}>☀ Glows</div>
                  {glows.map((g, i) => <div key={i} style={{ paddingLeft: 14, fontSize: "9.5pt", marginBottom: 1 }}>• {g}</div>)}
                </div>
              )}
              {grows.length > 0 && (
                <div style={{ marginBottom: 4 }}>
                  <div style={{ fontSize: "7.5pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#3b0764", marginBottom: 2 }}>➜ Grows</div>
                  {grows.map((g, i) => <div key={i} style={{ paddingLeft: 14, fontSize: "9.5pt", marginBottom: 1 }}>• {g}</div>)}
                </div>
              )}
              {notes[si] && (
                <div style={{ marginTop: 4, padding: "4px 9px", background: "#f5f5f5", border: "1px solid #ddd", borderRadius: 2, fontSize: "9pt", fontStyle: "italic" }}>
                  <strong style={{ fontStyle: "normal" }}>Notes:</strong> {notes[si]}
                </div>
              )}
              {!hasContent && !scored && (
                <div style={{ fontSize: "9pt", color: "#999", fontStyle: "italic" }}>No items marked.</div>
              )}
            </div>
          );
        })}

        {/* Total */}
        <div style={{ borderTop: "2.5px solid #000", paddingTop: 10, marginTop: 6, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <strong style={{ fontSize: "13pt" }}>Total Score</strong>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <span style={{ fontFamily: "Courier New, monospace", fontSize: "18pt", fontWeight: 700 }}>
              {totalScore} / {PERSUASIVE_TOTAL_PTS}
              <span style={{ fontSize: "12pt", fontWeight: 400, color: "#333", marginLeft: 10 }}>{pct}%</span>
            </span>
            <span style={{ fontSize: "20pt", fontWeight: 800, color: grade.color }}>{grade.letter}</span>
          </div>
        </div>

        {/* Additional comments */}
        {additionalComments && (
          <div className="pr-section" style={{ marginTop: 16, padding: "8px 12px", border: "1px solid #ccc", borderRadius: 3 }}>
            <div style={{ fontSize: "7.5pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#555", marginBottom: 5 }}>Overall Feedback</div>
            <div style={{ fontSize: "10pt", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{additionalComments}</div>
          </div>
        )}
      </div>

    </div>
  );
}

/* ── ASSIGNMENTS DATA ─────────────────────────────────────────────────────── */
const ASSIGNMENTS = [
  { key: "symposium",    title: "Symposium Research Report", icon: "🎤" },
  { key: "informative",  title: "Informative Speech",        icon: "ℹ️" },
  { key: "persuasive",   title: "Persuasive Speech",         icon: "🔥" },
];

/* ── SYMPOSIUM RESEARCH GRADER ─────────────────────────────────────────── */
function SymposiumGrader({ onBack }) {
  const [studentName,        setStudentName]        = useState("");
  const [groupTopic,         setGroupTopic]          = useState("");
  const [marks,              setMarks]               = useState(() => buildItemKeys(SECTIONS));
  const [scores,             setScores]              = useState({});
  const [notes,              setNotes]               = useState({});
  const [collapsed,          setCollapsed]           = useState({});
  const [additionalComments, setAdditionalComments]  = useState("");
  const [citationCount, setCitationCount] = useState(0);
  const printRef = useRef();

  const toggle = (key, value) =>
    setMarks((prev) => ({ ...prev, [key]: prev[key] === value ? null : value }));

  const getSectionMarks = (si) => {
    const dids = [], didNots = [];
    Object.entries(marks).forEach(([key, val]) => {
      if (!key.startsWith(`${si}-`)) return;
      const label = getItemLabel(SECTIONS, key);
      const isSub = key.split("-").length === 3;
      if (val === "did")    dids.push({ label, isSub });
      if (val === "didnot") didNots.push({ label, isSub });
    });
    return { dids, didNots };
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + (Number(b) || 0), 0);
  const totalPct   = TOTAL_PTS > 0 ? Math.min(100, Math.round((totalScore / TOTAL_PTS) * 100)) : 0;
  const grade      = letterGrade(totalPct);

  const handlePrint = () => window.print();

  const handleReset = () => {
    setMarks(buildItemKeys(SECTIONS));
    setScores({});
    setNotes({});
    setStudentName("");
    setGroupTopic("");
    setAdditionalComments("");
    setCitationCount(0);
  };

  const handleCopySummary = () => {
    let text = "SYMPOSIUM SPEECH – GRADING SUMMARY\n";
    text += `Student: ${studentName || "___"}\nGroup/Topic: ${groupTopic || "___"}\n`;
    if (citationCount > 0) text += `Oral citations counted: ${citationCount}\n`;
    text += "\n";
    SECTIONS.forEach((sec, si) => {
      const { dids, didNots } = getSectionMarks(si);
      text += `━━ ${sec.title} (${scores[si] || "___"}/${sec.pts}) ━━\n`;
      if (dids.length)    text += `  DID:\n${dids.map((item)    => `${item.isSub ? "      " : "    "}✓ ${item.label}`).join("\n")}\n`;
      if (didNots.length) text += `  DID NOT:\n${didNots.map((item) => `${item.isSub ? "      " : "    "}✗ ${item.label}`).join("\n")}\n`;
      if (notes[si])      text += `  Notes: ${notes[si]}\n`;
      text += "\n";
    });
    text += `━━ TOTAL: ${totalScore}/${TOTAL_PTS} (${totalPct}% · ${grade.letter} · GP ${grade.gradePoints}) ━━\n`;
    if (additionalComments) text += `\nAdditional Comments:\n${additionalComments}\n`;
    navigator.clipboard.writeText(text).then(() => alert("Summary copied to clipboard!"));
  };

  /* shared tokens */
  const surface = "#0d1120";
  const border  = "rgba(255,255,255,0.07)";
  const muted   = "#475569";

  return (
    <div className="grader-wrap" style={{ fontFamily: "'Outfit','Segoe UI',sans-serif", background: "#07090f", minHeight: "100vh", color: "#e2e8f0" }}>

      {/* ── Sticky Header ──────────────────────────────────────────────── */}
      <header className="no-print" style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(7,9,15,0.92)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "12px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 12, flexWrap: "wrap",
      }}>
        {/* Logo + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12, flexShrink: 0,
            background: "linear-gradient(135deg,#3b82f6 0%,#8b5cf6 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 19, boxShadow: "0 4px 16px rgba(59,130,246,0.35)",
          }}>🎤</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.025em", color: "#f1f5f9", lineHeight: 1.2 }}>
              Symposium Grader
            </div>
            <div style={{ fontSize: 11, color: muted, marginTop: 1 }}>
              Intro to Public Speaking · {TOTAL_PTS} pts
            </div>
          </div>
        </div>

        {/* Right-side controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Back to dashboard */}
          <button onClick={onBack} style={{ padding: "6px 12px", fontSize: 12, fontWeight: 600,
            background: "rgba(255,255,255,0.04)", border: `1px solid ${border}`,
            borderRadius: 8, color: "#94a3b8", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 4,
          }}>
            🏠 Dashboard
          </button>

          {/* Live score pill */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "rgba(255,255,255,0.04)", border: `1px solid ${border}`,
            borderRadius: 99, padding: "7px 16px",
          }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#f59e0b", fontFamily: "'JetBrains Mono',monospace" }}>
              {totalScore}
            </span>
            <span style={{ fontSize: 11, color: muted, fontFamily: "'JetBrains Mono',monospace" }}>/ {TOTAL_PTS}</span>
            <div style={{ width: 72, height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
              <div className="prog" style={{
                height: "100%", width: `${totalPct}%`,
                background: "linear-gradient(90deg,#3b82f6,#8b5cf6)", borderRadius: 99,
              }} />
            </div>
            <span style={{ fontSize: 11, color: muted }}>{totalPct}%</span>
          </div>

          {/* Action buttons */}
          {[
            { label: "Copy Summary", emoji: "📋", onClick: handleCopySummary,
              bg: "rgba(59,130,246,0.12)", bd: "rgba(59,130,246,0.25)", color: "#60a5fa" },
            { label: "Print",        emoji: "🖨️",  onClick: handlePrint,
              bg: "rgba(255,255,255,0.05)", bd: border, color: "#94a3b8" },
            { label: "Reset",        emoji: "↺",   onClick: handleReset,
              bg: "rgba(239,68,68,0.1)", bd: "rgba(239,68,68,0.2)", color: "#f87171" },
          ].map(({ label, emoji, onClick, bg, bd, color }) => (
            <button key={label} onClick={onClick} style={{
              background: bg, border: `1px solid ${bd}`, color,
              borderRadius: 8, padding: "7px 13px",
              fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
              display: "flex", alignItems: "center", gap: 5,
              transition: "opacity 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >{emoji} {label}</button>
          ))}
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────────────── */}
      <div className="no-print" style={{ maxWidth: 880, margin: "0 auto", padding: "24px 16px 100px" }}>

        {/* Student info */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 110px", gap: 12, marginBottom: 28 }}>
          {[
            { label: "Student Name",  value: studentName, set: setStudentName, ph: "Enter student name…" },
            { label: "Group / Topic", value: groupTopic,  set: setGroupTopic,  ph: "Enter group or topic…" },
          ].map(({ label, value, set, ph }) => (
            <div key={label} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: "14px 16px" }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: muted, textTransform: "uppercase",
                              letterSpacing: "0.1em", display: "block", marginBottom: 8 }}>{label}</label>
              <input
                value={value}
                onChange={(e) => set(e.target.value)}
                placeholder={ph}
                style={{
                  width: "100%", background: "transparent", border: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.12)", paddingBottom: 5,
                  color: "#f1f5f9", fontSize: 15, fontWeight: 500, fontFamily: "inherit",
                }}
              />
            </div>
          ))}
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: "14px 16px", display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: 10, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>Oral Cites</label>
            <CitationCounter count={citationCount} setCount={setCitationCount} />
          </div>
        </div>

        {/* ── Sections ─────────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SECTIONS.map((sec, si) => {
            const { dids, didNots } = getSectionMarks(si);
            const meta        = SECTION_META[si];
            const isCollapsed = !!collapsed[si];
            const scoreVal    = Number(scores[si]) || 0;
            const secPct      = scores[si] ? Math.min(100, (scoreVal / sec.pts) * 100) : 0;

            return (
              <div key={si} className="section-card print-break" style={{
                background: surface,
                border: "1px solid rgba(255,255,255,0.06)",
                borderLeft: `3px solid ${meta.color}`,
                borderRadius: 14, overflow: "hidden",
              }}>

                {/* Section header — clickable */}
                <div
                  onClick={() => setCollapsed((p) => ({ ...p, [si]: !p[si] }))}
                  style={{
                    padding: "12px 16px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    cursor: "pointer", userSelect: "none",
                    background: isCollapsed ? "transparent" : `rgba(${meta.rgb},0.04)`,
                    transition: "background 0.2s",
                  }}
                >
                  {/* Left cluster */}
                  <div style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0, flexWrap: "wrap" }}>
                    <span style={{
                      fontSize: 10, color: muted, flexShrink: 0,
                      transition: "transform 0.22s cubic-bezier(0.4,0,0.2,1)",
                      transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
                      display: "inline-block",
                    }}>▼</span>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{meta.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.015em", whiteSpace: "nowrap" }}>
                      {sec.title}
                    </span>
                    <span style={{
                      fontSize: 11, fontWeight: 600, color: meta.color,
                      background: `rgba(${meta.rgb},0.12)`,
                      padding: "2px 8px", borderRadius: 99, flexShrink: 0,
                    }}>{sec.pts} pts</span>
                    {dids.length > 0 && (
                      <span style={{ fontSize: 10, background: "rgba(16,185,129,0.15)", color: "#34d399",
                                     padding: "2px 7px", borderRadius: 99, fontWeight: 700, flexShrink: 0 }}>
                        {dids.length} ✓
                      </span>
                    )}
                    {didNots.length > 0 && (
                      <span style={{ fontSize: 10, background: "rgba(239,68,68,0.15)", color: "#f87171",
                                     padding: "2px 7px", borderRadius: 99, fontWeight: 700, flexShrink: 0 }}>
                        {didNots.length} ✗
                      </span>
                    )}
                  </div>

                  {/* Right cluster */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, marginLeft: 8 }}>
                    {/* Mini progress bar */}
                    <div style={{ width: 56, height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 99, overflow: "hidden" }}>
                      <div className="prog" style={{
                        height: "100%", width: `${secPct}%`,
                        background: `linear-gradient(90deg,${meta.color}99,${meta.color})`,
                        borderRadius: 99,
                      }} />
                    </div>
                    {/* Score input */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: "flex", alignItems: "center", gap: 3,
                        background: "rgba(255,255,255,0.04)", border: `1px solid ${border}`,
                        borderRadius: 8, padding: "5px 10px",
                      }}
                    >
                      <input
                        type="number" min={0} max={sec.pts}
                        value={scores[si] ?? ""}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (v === "" || (Number(v) >= 0 && Number(v) <= sec.pts))
                            setScores((p) => ({ ...p, [si]: v }));
                        }}
                        placeholder="—"
                        style={{
                          width: 34, textAlign: "center", background: "transparent",
                          border: "none", color: "#f59e0b", fontSize: 15, fontWeight: 700,
                          fontFamily: "'JetBrains Mono',monospace",
                        }}
                      />
                      <span style={{ fontSize: 12, color: muted, fontFamily: "'JetBrains Mono',monospace" }}>
                        /{sec.pts}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items — collapsible */}
                {!isCollapsed && (
                  <div className="section-body">
                    {sec.items.map((item, ii) => {
                      const mainKey  = `${si}-${ii}`;
                      const mainMark = marks[mainKey];
                      return (
                        <div key={ii}>
                          {/* Main item row */}
                          <div style={{
                            display: "flex", alignItems: "stretch",
                            borderTop: "1px solid rgba(255,255,255,0.045)",
                            background: mainMark === "did"    ? `rgba(${meta.rgb},0.06)`
                                      : mainMark === "didnot" ? "rgba(239,68,68,0.06)"
                                      : "transparent",
                            transition: "background 0.18s",
                          }}>
                            <button
                              className="mark-btn"
                              onClick={() => toggle(mainKey, "did")}
                              style={{
                                width: 46, minHeight: 44,
                                borderRight: "1px solid rgba(255,255,255,0.045)",
                                background: mainMark === "did" ? "rgba(16,185,129,0.2)" : "transparent",
                                color: mainMark === "did" ? "#34d399" : "#2d3f55",
                                fontSize: 16,
                              }}
                              title="Demonstrated"
                            >✓</button>
                            <button
                              className="mark-btn"
                              onClick={() => toggle(mainKey, "didnot")}
                              style={{
                                width: 46, minHeight: 44,
                                borderRight: "1px solid rgba(255,255,255,0.045)",
                                background: mainMark === "didnot" ? "rgba(239,68,68,0.2)" : "transparent",
                                color: mainMark === "didnot" ? "#f87171" : "#2d3f55",
                                fontSize: 14,
                              }}
                              title="Did Not Demonstrate"
                            >✗</button>
                            <div style={{
                              flex: 1, padding: "10px 14px", fontSize: 13, fontWeight: 600,
                              lineHeight: 1.5, transition: "color 0.18s",
                              color: mainMark === "did"    ? "#a7f3d0"
                                   : mainMark === "didnot" ? "#fecaca"
                                   : "#cbd5e1",
                            }}>{item.main}</div>
                          </div>

                          {/* Sub items */}
                          {item.subs.map((sub, subi) => {
                            const subKey  = `${si}-${ii}-${subi}`;
                            const subMark = marks[subKey];
                            return (
                              <div key={subi} style={{
                                display: "flex", alignItems: "stretch",
                                borderTop: "1px solid rgba(255,255,255,0.025)",
                                background: subMark === "did"    ? "rgba(16,185,129,0.04)"
                                          : subMark === "didnot" ? "rgba(239,68,68,0.04)"
                                          : "rgba(0,0,0,0.18)",
                                transition: "background 0.18s",
                              }}>
                                <button
                                  className="mark-btn"
                                  onClick={() => toggle(subKey, "did")}
                                  style={{
                                    width: 46, minHeight: 36,
                                    borderRight: "1px solid rgba(255,255,255,0.025)",
                                    background: subMark === "did" ? "rgba(16,185,129,0.15)" : "transparent",
                                    color: subMark === "did" ? "#34d399" : "#1e2d3f",
                                    fontSize: 13,
                                  }}
                                  title="Demonstrated"
                                >✓</button>
                                <button
                                  className="mark-btn"
                                  onClick={() => toggle(subKey, "didnot")}
                                  style={{
                                    width: 46, minHeight: 36,
                                    borderRight: "1px solid rgba(255,255,255,0.025)",
                                    background: subMark === "didnot" ? "rgba(239,68,68,0.15)" : "transparent",
                                    color: subMark === "didnot" ? "#f87171" : "#1e2d3f",
                                    fontSize: 11,
                                  }}
                                  title="Did Not Demonstrate"
                                >✗</button>
                                <div style={{
                                  flex: 1, padding: "8px 14px 8px 28px",
                                  fontSize: 11.5, fontStyle: "italic", lineHeight: 1.5,
                                  transition: "color 0.18s",
                                  color: subMark === "did"    ? "#6ee7b7"
                                       : subMark === "didnot" ? "#fca5a5"
                                       : "#3d526b",
                                }}>↳ {sub}</div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}

                    {/* Section footer: summary chips + notes */}
                    <div style={{
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      background: "rgba(0,0,0,0.28)", padding: "14px 16px",
                    }}>
                      {(dids.length > 0 || didNots.length > 0) && (
                        <div style={{ marginBottom: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                          {dids.length > 0 && (
                            <div>
                              <div style={{ fontSize: 9, fontWeight: 800, color: "#10b981",
                                            textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 5 }}>
                                Demonstrated
                              </div>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                                {dids.map((item, i) => (
                                  <span key={i} style={{
                                    fontSize: 11, background: "rgba(16,185,129,0.1)",
                                    border: "1px solid rgba(16,185,129,0.2)",
                                    color: "#6ee7b7", padding: "3px 9px", borderRadius: 6, lineHeight: 1.5,
                                  }}>✓ {item.label}</span>
                                ))}
                              </div>
                            </div>
                          )}
                          {didNots.length > 0 && (
                            <div>
                              <div style={{ fontSize: 9, fontWeight: 800, color: "#ef4444",
                                            textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 5 }}>
                                Needs Improvement
                              </div>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                                {didNots.map((item, i) => (
                                  <span key={i} style={{
                                    fontSize: 11, background: "rgba(239,68,68,0.1)",
                                    border: "1px solid rgba(239,68,68,0.2)",
                                    color: "#fca5a5", padding: "3px 9px", borderRadius: 6, lineHeight: 1.5,
                                  }}>✗ {item.label}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      <textarea
                        value={notes[si] || ""}
                        onChange={(e) => setNotes((p) => ({ ...p, [si]: e.target.value }))}
                        placeholder={`Add grading notes for ${sec.title}…`}
                        rows={2}
                        style={{
                          width: "100%", padding: "9px 12px",
                          background: "rgba(255,255,255,0.025)", border: `1px solid ${border}`,
                          borderRadius: 8, color: "#94a3b8", fontSize: 12,
                          fontFamily: "inherit", resize: "vertical", lineHeight: 1.6,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Final Score Card ─────────────────────────────────────────── */}
        <div style={{
          marginTop: 18,
          background: "linear-gradient(135deg,#0d1a30 0%,#091525 60%,#0d1a30 100%)",
          border: "1px solid rgba(59,130,246,0.18)",
          borderRadius: 16, padding: "22px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
          boxShadow: "0 0 50px rgba(59,130,246,0.07),0 2px 8px rgba(0,0,0,0.4)",
        }}>
          {/* Left: number */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: muted, textTransform: "uppercase",
                          letterSpacing: "0.14em", marginBottom: 6 }}>Final Score</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span className="score-num" style={{
                fontSize: 56, fontWeight: 800, color: "#f59e0b",
                fontFamily: "'JetBrains Mono',monospace", lineHeight: 1, letterSpacing: "-0.04em",
              }}>{totalScore}</span>
              <span style={{ fontSize: 22, color: "#2d4260", fontFamily: "'JetBrains Mono',monospace" }}>
                / {TOTAL_PTS}
              </span>
            </div>
          </div>

          {/* Right: grade + % + bar */}
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: muted, textTransform: "uppercase",
                          letterSpacing: "0.1em", marginBottom: 6 }}>Grade</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "flex-end" }}>
              <span style={{ fontSize: 44, fontWeight: 800, color: grade.color, lineHeight: 1,
                             letterSpacing: "-0.03em" }}>{grade.letter}</span>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#cbd5e1",
                              letterSpacing: "-0.02em", marginBottom: 2 }}>{totalPct}%</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>GP {grade.gradePoints}</div>
                <div style={{ width: 160, height: 6, background: "rgba(255,255,255,0.07)",
                              borderRadius: 99, overflow: "hidden" }}>
                  <div className="prog" style={{
                    height: "100%", width: `${totalPct}%`,
                    background: "linear-gradient(90deg,#3b82f6 0%,#8b5cf6 100%)",
                    borderRadius: 99, boxShadow: "0 0 10px rgba(59,130,246,0.5)",
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Additional Comments ──────────────────────────────────────── */}
        <div style={{
          marginTop: 12, background: surface, border: `1px solid ${border}`,
          borderRadius: 14, padding: "16px 18px",
        }}>
          <label style={{ fontSize: 10, fontWeight: 800, color: muted, textTransform: "uppercase",
                          letterSpacing: "0.12em", display: "block", marginBottom: 10 }}>
            Overall Feedback / Comments
          </label>
          <textarea
            value={additionalComments}
            onChange={(e) => setAdditionalComments(e.target.value)}
            placeholder="Final thoughts, overall impressions, or recommendations for the student…"
            rows={4}
            style={{
              width: "100%", padding: "10px 12px",
              background: "rgba(0,0,0,0.3)", border: `1px solid ${border}`,
              borderRadius: 8, color: "#94a3b8", fontSize: 13,
              fontFamily: "inherit", resize: "vertical", lineHeight: 1.6,
            }}
          />
        </div>
      </div>

      {/* ── PRINT-ONLY REPORT ──────────────────────────────────────────── */}
      <div className="print-only" style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "11pt", color: "#000", lineHeight: 1.5 }}>

        {/* Letterhead */}
        <div style={{ borderBottom: "2px solid #000", paddingBottom: 10, marginBottom: 18 }}>
          <div style={{ fontSize: "8pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#555", marginBottom: 3 }}>Intro to Public Speaking — Symposium Research Presentation</div>
          <div style={{ fontSize: "17pt", fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>Grading Report</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10pt" }}>
            <tbody>
              <tr>
                <td style={{ paddingRight: 24, paddingBottom: 4, verticalAlign: "top" }}>
                  <span style={{ fontSize: "7pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#666", display: "block" }}>Student</span>
                  <strong>{studentName || "___"}</strong>
                </td>
                <td style={{ paddingRight: 24, paddingBottom: 4, verticalAlign: "top" }}>
                  <span style={{ fontSize: "7pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#666", display: "block" }}>Group / Topic</span>
                  <strong>{groupTopic || "___"}</strong>
                </td>
                <td style={{ paddingRight: 24, paddingBottom: 4, verticalAlign: "top" }}>
                  <span style={{ fontSize: "7pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#666", display: "block" }}>Oral Citations</span>
                  <strong>{citationCount > 0 ? citationCount : "—"}</strong>
                </td>
                <td style={{ verticalAlign: "top" }}>
                  <span style={{ fontSize: "7pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#666", display: "block" }}>Date Printed</span>
                  <strong>{new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Sections */}
        {SECTIONS.map((sec, si) => {
          const { dids, didNots } = getSectionMarks(si);
          const meta = SECTION_META[si];
          const scored = scores[si] !== undefined && scores[si] !== "";
          const hasContent = dids.length + didNots.length + (notes[si] ? 1 : 0);
          return (
            <div key={si} className="pr-section" style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #bbb", paddingBottom: 3, marginBottom: 5 }}>
                <span style={{ fontSize: "11pt", fontWeight: 700 }}>{meta.icon} {sec.title}</span>
                <span style={{ fontFamily: "Courier New, monospace", fontSize: "12pt", fontWeight: 700 }}>
                  {scored ? `${scores[si]} / ${sec.pts}` : `— / ${sec.pts}`}
                </span>
              </div>
              {dids.length > 0 && (
                <div style={{ marginBottom: 4 }}>
                  <div style={{ fontSize: "7.5pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#14532d", marginBottom: 2 }}>✓ Did</div>
                  {dids.map((item, i) => <div key={i} style={{ paddingLeft: item.isSub ? 28 : 14, fontSize: "9.5pt", marginBottom: 1 }}>{item.isSub ? "◦" : "•"} {item.label}</div>)}
                </div>
              )}
              {didNots.length > 0 && (
                <div style={{ marginBottom: 4 }}>
                  <div style={{ fontSize: "7.5pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#7f1d1d", marginBottom: 2 }}>✗ Did Not</div>
                  {didNots.map((item, i) => <div key={i} style={{ paddingLeft: item.isSub ? 28 : 14, fontSize: "9.5pt", marginBottom: 1 }}>{item.isSub ? "◦" : "•"} {item.label}</div>)}
                </div>
              )}
              {notes[si] && (
                <div style={{ marginTop: 4, padding: "4px 9px", background: "#f5f5f5", border: "1px solid #ddd", borderRadius: 2, fontSize: "9pt", fontStyle: "italic" }}>
                  <strong style={{ fontStyle: "normal" }}>Notes:</strong> {notes[si]}
                </div>
              )}
              {!hasContent && !scored && (
                <div style={{ fontSize: "9pt", color: "#999", fontStyle: "italic" }}>No items marked.</div>
              )}
            </div>
          );
        })}

        {/* Total + Grade */}
        <div style={{ borderTop: "2.5px solid #000", paddingTop: 10, marginTop: 6, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <strong style={{ fontSize: "13pt" }}>Total Score</strong>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <span style={{ fontFamily: "Courier New, monospace", fontSize: "18pt", fontWeight: 700 }}>
              {totalScore} / {TOTAL_PTS}
              <span style={{ fontSize: "12pt", fontWeight: 400, color: "#333", marginLeft: 10 }}>{totalPct}%</span>
            </span>
            <span style={{ fontSize: "20pt", fontWeight: 800, color: grade.color }}>{grade.letter} (GP {grade.gradePoints})</span>
          </div>
        </div>

        {/* Additional comments */}
        {additionalComments && (
          <div className="pr-section" style={{ marginTop: 16, padding: "8px 12px", border: "1px solid #ccc", borderRadius: 3 }}>
            <div style={{ fontSize: "7.5pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#555", marginBottom: 5 }}>Overall Feedback</div>
            <div style={{ fontSize: "10pt", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{additionalComments}</div>
          </div>
        )}
      </div>

    </div>
  );
}

/* ── DASHBOARD CARD METADATA ──────────────────────────────────────────── */
const CARD_META = {
  symposium:   {
    gradient: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    glow: "rgba(59,130,246,0.25)",
    pts: TOTAL_PTS,
    desc: "Full rubric · Did/Did Not toggles · Section notes · Auto letter grade",
    tag: "Research Report",
  },
  informative: {
    gradient: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
    glow: "rgba(99,102,241,0.25)",
    pts: INFORMATIVE_TOTAL_PTS,
    desc: "9-section rubric · Glows/Grows chips · Citation tracking · Collapse per section",
    tag: "Informative Speech",
  },
  persuasive: {
    gradient: "linear-gradient(135deg, #dc2626 0%, #f97316 100%)",
    glow: "rgba(220,38,38,0.25)",
    pts: PERSUASIVE_TOTAL_PTS,
    desc: "Monroe's Motivated Sequence · Call-to-action enforcement · Policy check",
    tag: "Persuasive Speech",
  },
};

/* ── MAIN APP WITH DASHBOARD ──────────────────────────────────────────── */
export default function App() {
  const [assignment, setAssignment] = useState("");

  const changeAssignment = (newKey) => {
    setAssignment(newKey);
  };

  if (assignment === "symposium")  return <SymposiumGrader           onBack={() => changeAssignment("")} />;
  if (assignment === "informative") return <InformativeSpeechGrader  onBack={() => changeAssignment("")} />;
  if (assignment === "persuasive")  return <PersuasiveSpeechGrader   onBack={() => changeAssignment("")} />;

  return (
    <div style={{ fontFamily: "'Outfit','Segoe UI',sans-serif", background: "#07090f", minHeight: "100vh", color: "#e2e8f0", position: "relative", overflow: "hidden" }}>
      {/* Ambient glow backdrop */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(99,102,241,0.1) 0%, transparent 65%)",
      }} />

      <div style={{ position: "relative", maxWidth: 940, margin: "0 auto", padding: "72px 20px 100px", display: "flex", flexDirection: "column", alignItems: "center", gap: 52 }}>

        {/* ── Hero ── */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.18)",
            borderRadius: 99, padding: "5px 16px", marginBottom: 28,
          }}>
            <span style={{ fontSize: 13 }}>🎓</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#a5b4fc", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Public Speaking · Intro to Communication
            </span>
          </div>
          <h1 style={{
            fontSize: "clamp(38px, 6vw, 60px)", fontWeight: 800, margin: "0 0 16px",
            letterSpacing: "-0.04em", lineHeight: 1.05,
            background: "linear-gradient(135deg, #f1f5f9 20%, #94a3b8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Dial Center Grader
          </h1>
          <p style={{ fontSize: 16, color: "#64748b", margin: 0, maxWidth: 440, marginInline: "auto", lineHeight: 1.6 }}>
            Choose an assignment type below to begin grading a student's speech.
          </p>
        </div>

        {/* ── Assignment Cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 18, width: "100%" }}>
          {ASSIGNMENTS.map(a => {
            const meta = CARD_META[a.key];
            return (
              <button
                key={a.key}
                onClick={() => changeAssignment(a.key)}
                style={{
                  background: "#0d1120", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 20, padding: 0, cursor: "pointer", textAlign: "left",
                  overflow: "hidden", transition: "transform 0.22s cubic-bezier(0.4,0,0.2,1), box-shadow 0.22s, border-color 0.22s",
                  fontFamily: "inherit",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 24px 60px ${meta.glow}, 0 4px 16px rgba(0,0,0,0.5)`;
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                {/* Gradient top band */}
                <div style={{ height: 4, background: meta.gradient }} />

                <div style={{ padding: "26px 26px 22px" }}>
                  {/* Icon container */}
                  <div style={{
                    width: 54, height: 54, borderRadius: 16,
                    background: meta.gradient,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 26, marginBottom: 18,
                    boxShadow: `0 8px 24px ${meta.glow}`,
                  }}>
                    {a.icon}
                  </div>

                  {/* Tag pill */}
                  <div style={{
                    display: "inline-block", fontSize: 10, fontWeight: 700,
                    color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em",
                    marginBottom: 6,
                  }}>{meta.tag}</div>

                  {/* Title */}
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", marginBottom: 8, letterSpacing: "-0.025em", lineHeight: 1.3 }}>
                    {a.title}
                  </div>

                  {/* Description */}
                  <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.65, marginBottom: 22 }}>
                    {meta.desc}
                  </div>

                  {/* Footer row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{
                      fontSize: 12, fontWeight: 700, color: "#334155",
                      fontFamily: "'JetBrains Mono', monospace",
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 6, padding: "3px 9px",
                    }}>
                      {meta.pts} pts
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#6366f1", display: "flex", alignItems: "center", gap: 4 }}>
                      Begin grading <span style={{ fontSize: 14 }}>→</span>
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
