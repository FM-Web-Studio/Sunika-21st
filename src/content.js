// ============================================================
//  EDIT EVERYTHING HERE
// ============================================================
// This is the single source of truth for all the words on the
// site. Change a value below and the page updates — no need to
// touch any component code.
//
// Anything still being decided is marked `tbd: true`, which makes
// the site render a pretty "to be revealed" placeholder instead of
// real text. When you know the answer, fill in `value` and flip
// `tbd` to false.
// ============================================================

export const content = {
  // ---- The headline stuff ----
  hero: {
    eyebrow: "You're invited to",
    name: 'Sunika',
    occasion: "'s 21st",
    title: 'A Starry Night Painting Ball',
    subtitle: '& Adventure',
    blurb:
      'Grab a brush, chase the horizon, and celebrate under a sky full of stars. ' +
      'One night of paint, play and a little bit of magic.',
  },

  // ---- The headline facts (shown as glowing cards) ----
  details: [
    {
      icon: '📅',
      label: 'When',
      value: '',
      tbd: true,
      tbdNote: 'The date is being plotted on the map…',
    },
    {
      icon: '📍',
      label: 'Where',
      value: '',
      tbd: true,
      tbdNote: 'A secret location, soon to be revealed…',
    },
    {
      icon: '🎨',
      label: 'Theme',
      value: 'Starry Night · Painting Ball · Adventure',
      tbd: false,
    },
    {
      icon: '🕯️',
      label: 'Dress Code',
      value: '',
      tbd: true,
      tbdNote: 'Dress to paint, dance & adventure — details soon.',
    },
  ],

  // ---- The story / intro paragraph ----
  story: {
    title: 'The Night Ahead',
    paragraphs: [
      'Imagine swirling skies of blue and gold, canvases waiting for colour, ' +
        'and a night that turns into an adventure.',
      'We’re bringing Van Gogh’s Starry Night to life — part painting party, ' +
        'part ball, part expedition into the unknown. Come as you are, leave ' +
        'with paint on your hands and stories worth telling.',
    ],
  },

  // ---- What we'll get up to (placeholder list — easy to expand) ----
  activities: {
    title: 'The Adventure',
    intro: 'A few of the things waiting for you (more secrets to come)…',
    items: [
      {
        icon: '🖌️',
        title: 'Paint the Stars',
        text: 'Your own Starry Night canvas to take home — no skill required, just vibes.',
      },
      {
        icon: '🧭',
        title: 'The Expedition',
        text: 'An adventure-themed quest woven through the night. Bring your sense of wonder.',
      },
      {
        icon: '✨',
        title: 'Surprises',
        text: 'A few things we can’t reveal just yet. Trust us — they’re worth showing up for.',
      },
    ],
  },

  // ---- RSVP / closing ----
  rsvp: {
    title: 'Save the Stars',
    text:
      'The date and place are still being charted — keep an eye out, and get ready ' +
      'for an unforgettable night.',
    note: 'More details are on their way. ⭐',
  },

  footer: {
    line: 'Made with stars, paint & a little adventure.',
    signoff: '— See you under the night sky',
  },
}
