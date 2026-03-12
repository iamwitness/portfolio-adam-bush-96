"use client";

import React, { useState } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────────

interface Album {
  title: string;
  year: number;
  tracks: string[];
  spotifyId?: string;
}

interface Artist {
  name: string;
  albums: Album[];
}

const MUSIC_LIBRARY: Artist[] = [
  {
    name: "Third Eye Blind",
    albums: [
      {
        title: "Third Eye Blind",
        year: 1997,
        spotifyId: "2gToC0XAblE9h3UZD6aAaQ",
        tracks: [
          "Losing a Whole Year",
          "Narcolepsy",
          "Semi-Charmed Life",
          "Jumper",
          "Graduate",
          "How's It Going to Be",
          "Thanks a Lot",
          "Burning Man",
          "Good for You",
          "London",
          "I Want You",
          "The Background",
          "Motorcycle Drive By",
          "God of Wine",
        ],
      },
      {
        title: "Out of the Vein",
        year: 2003,
        spotifyId: "5Z1mU7iT0rfX9o9qzM1zYf",
        tracks: [
          "Faster",
          "Blinded (When I See You)",
          "Wounded",
          "My Hit and Run",
          "Crystal Baller",
          "Self Righteous",
          "Can't Get Away",
          "Wake for Young Souls",
          "Forget Myself",
          "Misfits",
          "Good Man",
          "Another Life",
          "Palm Reader",
          "Danger",
        ],
      },
    ],
  },
  {
    name: "My Chemical Romance",
    albums: [
      {
        title: "Three Cheers for Sweet Revenge",
        year: 2004,
        spotifyId: "3DuiGV3J09SUhvp8gqNx8h",
        tracks: [
          "Helena",
          "Give 'Em Hell, Kid",
          "To the End",
          "You Know What They Do to Guys Like Us in Prison",
          "I'm Not Okay (I Promise)",
          "The Ghost of You",
          "The Jetset Life Is Gonna Kill You",
          "Interlude",
          "Thank You for the Venom",
          "Hang 'Em High",
          "It's Not a Fashion Statement, It's a Deathwish",
          "Cemetery Drive",
          "I Never Told You What I Do for a Living",
        ],
      },
      {
        title: "The Black Parade",
        year: 2006,
        spotifyId: "0FZK97MXMm5mUQ8mtudjuK",
        tracks: [
          "The End.",
          "Dead!",
          "This Is How I Disappear",
          "The Sharpest Lives",
          "Welcome to the Black Parade",
          "I Don't Love You",
          "House of Wolves",
          "Cancer",
          "Mama",
          "Sleep",
          "Teenagers",
          "Disenchanted",
          "Famous Last Words",
          "Blood",
        ],
      },
    ],
  },
  {
    name: "Good Charlotte",
    albums: [
      {
        title: "Good Charlotte",
        year: 2000,
        spotifyId: "2THd0mnTJFVGv1kAOOkDVE",
        tracks: [
          "Little Things",
          "Waldorf Worldwide",
          "East Coast Anthem",
          "Festival Song",
          "Complicated",
          "Click",
          "Let Me Go",
          "Motivation Proclamation",
          "I Don't Wanna Be in Love",
          "Change",
          "I Heard You",
          "Screamer",
          "Thank You Mom",
        ],
      },
    ],
  },
  {
    name: "Mac Miller",
    albums: [
      {
        title: "Watching Movies with the Sound Off",
        year: 2013,
        spotifyId: "2N2X8SBKy9PS8Q9DnQuxn2",
        tracks: [
          "The Star Room",
          "Avian",
          "I'm Not Real",
          "S.D.S.",
          "Bird Call",
          "Matches",
          "Objects in the Mirror",
          "Red Dot Music",
          "Gees",
          "Watching Movies",
          "Suplexes Inside of Complexes and Duplexes",
          "The End Is Near",
          "Claymation",
          "Someone Like You",
          "Aquarium",
          "Youforia",
        ],
      },
      {
        title: "Faces",
        year: 2014,
        spotifyId: "5SKnXCvB4fcGSZu32o3LRY",
        tracks: [
          "Inside Outside",
          "Here We Go",
          "Friends",
          "Angel Dust",
          "Malibu",
          "What Do You Do",
          "It Just Doesn't Matter",
          "Therapy",
          "Polo Jeans",
          "Happy Birthday",
          "Wedding",
          "Funeral",
          "Diablo",
          "Ave Maria",
          "55",
          "San Francisco",
          "Colors and Shapes",
          "Insomniak",
          "Uber",
          "Rain",
          "Apparition",
          "Thumbalina",
          "New Faces v2",
          "Grand Finale",
          "Yeah",
        ],
      },
    ],
  },
  {
    name: "The Killers",
    albums: [
      {
        title: "Hot Fuss",
        year: 2004,
        spotifyId: "4piJq7R3gjUOxnYs6lDCTg",
        tracks: [
          "Jenny Was a Friend of Mine",
          "Mr. Brightside",
          "Smile Like You Mean It",
          "Somebody Told Me",
          "All These Things That I've Done",
          "Andy, You're a Star",
          "On Top",
          "Change Your Mind",
          "Believe Me Natalie",
          "Midnight Show",
          "Everything Will Be Alright",
        ],
      },
      {
        title: "Sam's Town",
        year: 2006,
        spotifyId: "4o3RJndRhHxkieQzQGhmbw",
        tracks: [
          "Sam's Town",
          "Enterlude",
          "When You Were Young",
          "Bling (Confession of a King)",
          "For Reasons Unknown",
          "Read My Mind",
          "Uncle Jonny",
          "Bones",
          "My List",
          "This River Is Wild",
          "Why Do I Keep Counting?",
          "Exitlude",
        ],
      },
    ],
  },
  {
    name: "Cage the Elephant",
    albums: [
      {
        title: "Cage the Elephant",
        year: 2008,
        spotifyId: "0KcRX7YkMZ4mwOkEiCb9zw",
        tracks: [
          "In One Ear",
          "James Brown",
          "Ain't No Rest for the Wicked",
          "Tiny Little Robots",
          "Lotus",
          "Back Against the Wall",
          "Judas",
          "Free Love",
          "Soil to the Sun",
          "Drones in the Valley",
          "Back Stabbin' Betty",
        ],
      },
      {
        title: "Thank You, Happy Birthday",
        year: 2011,
        spotifyId: "0WizSRN8LuMWhliou9PFlg",
        tracks: [
          "Always Something",
          "Aberdeen",
          "Indy Kidz",
          "2024",
          "Shake Me Down",
          "Rubber Ball",
          "Sell Yourself",
          "Around My Head",
          "Japanese Buffalo",
          "Sabertooth Tiger",
          "Flow",
          "Right Before My Eyes",
        ],
      },
      {
        title: "Melophobia",
        year: 2013,
        spotifyId: "4EK8gtQfdVsmDTji7gBFlz",
        tracks: [
          "Spiderhead",
          "Come a Little Closer",
          "Telescope",
          "It's Just Forever",
          "Take It or Leave It",
          "Halo",
          "Black Widow",
          "Hypocrite",
          "Teeth",
          "Cigarette Daydreams",
        ],
      },
    ],
  },
  {
    name: "Sum 41",
    albums: [
      {
        title: "All Killer No Filler",
        year: 2001,
        spotifyId: "2UCWsnmZEVg9HhnMeKTsim",
        tracks: [
          "Introduction to Destruction",
          "Nothing on My Back",
          "Never Wake Up",
          "Fat Lip",
          "Rhythms",
          "Motivation",
          "In Too Deep",
          "Summer",
          "Handle This",
          "Crazy Amanda Bunkface",
          "All She's Got",
          "Heart Attack",
          "Pain for Pleasure",
        ],
      },
      {
        title: "Chuck",
        year: 2004,
        spotifyId: "1aG8QbhABVtVxNlAkk8VBW",
        tracks: [
          "Intro",
          "No Reason",
          "We're All to Blame",
          "Angels with Dirty Faces",
          "Some Say",
          "The Bitter End",
          "Open Your Eyes",
          "Slipping Away",
          "I'm Not the One",
          "Welcome to Hell",
          "Pieces",
          "Subject to Change",
          "88",
        ],
      },
      {
        title: "Underclass Hero",
        year: 2007,
        spotifyId: "5d7wvjlsCpHxMLC6Xl0tEL",
        tracks: [
          "Underclass Hero",
          "Walking Disaster",
          "Speak of the Devil",
          "Dear Father",
          "Count Your Last Blessings",
          "Ma Poubelle",
          "March of the Dogs",
          "The Jester",
          "With Me",
          "Pull the Curtain",
          "King of Contradiction",
          "Confusion and Frustration in Modern Times",
          "So Long Goodbye",
        ],
      },
    ],
  },
  {
    name: "Red Hot Chili Peppers",
    albums: [
      {
        title: "Stadium Arcadium",
        year: 2006,
        spotifyId: "7xl50xr9NDkd3i2kBbzsNZ",
        tracks: [
          "Dani California",
          "Snow (Hey Oh)",
          "Charlie",
          "Stadium Arcadium",
          "Hump de Bump",
          "She's Only 18",
          "Slow Cheetah",
          "Torture Me",
          "Strip My Mind",
          "Especially in Michigan",
          "Warlocks",
          "C'mon Girl",
          "Wet Sand",
          "Hey",
          "Desecration Smile",
          "Tell Me Baby",
          "Hard to Concentrate",
          "21st Century",
          "She Looks to Me",
          "Readymade",
          "If",
          "Make You Feel Better",
          "Animal Bar",
          "So Much I",
          "Storm in a Teacup",
          "We Believe",
          "Turn It Again",
          "Death of a Martian",
        ],
      },
    ],
  },
  {
    name: "Foo Fighters",
    albums: [
      {
        title: "The Colour and the Shape",
        year: 1997,
        spotifyId: "30ly6F6Xl0TKmyBCU50Khv",
        tracks: [
          "Doll",
          "Monkey Wrench",
          "Hey, Johnny Park!",
          "My Poor Brain",
          "Wind Up",
          "Up in Arms",
          "My Hero",
          "See You",
          "Enough Space",
          "February Stars",
          "Everlong",
          "Walking After You",
          "New Way Home",
        ],
      },
    ],
  },
  {
    name: "Dirty Heads",
    albums: [
      {
        title: "Favorites",
        year: 0,
        tracks: [
          "Lay Me Down",
          "Vacuum",
          "Stand Tall",
          "Spread Too Thin",
          "That's All I Need",
          "Cabin by the Sea",
          "My Sweet Summer",
          "Franco Eyed",
          "Burn Slow",
          "Sloth's Revenge",
        ],
      },
    ],
  },
  {
    name: "Blink-182",
    albums: [
      {
        title: "Favorites",
        year: 0,
        tracks: [
          "I Miss You",
          "Dammit",
          "All the Small Things",
          "What's My Age Again?",
          "The Rock Show",
          "Feeling This",
          "Adam's Song",
          "First Date",
          "Stay Together for the Kids",
          "Always",
        ],
      },
    ],
  },
  {
    name: "Angels & Airwaves",
    albums: [
      {
        title: "Favorites",
        year: 0,
        tracks: [
          "Sirens",
          "The Adventure",
          "Everything's Magic",
          "Hallucinations",
          "Surrender",
          "Young London",
          "Anxiety",
          "Rebel Girl",
          "Kiss & Tell",
          "Euphoria",
        ],
      },
    ],
  },
  {
    name: "Boxcar Racer",
    albums: [
      {
        title: "Boxcar Racer",
        year: 2002,
        spotifyId: "3gODo8aZ2dTVIaOr9SqeRE",
        tracks: [
          "I Feel So",
          "All Systems Go",
          "Watch the World",
          "Tiny Voices",
          "Cat Like Thief",
          "And I",
          "Letters to God",
          "My First Punk Song",
          "Sorrow",
          "There Is",
          "The End with You",
          "Elevator",
          "Instrumental",
        ],
      },
    ],
  },
  {
    name: "Simple Plan",
    albums: [
      {
        title: "Favorites",
        year: 0,
        tracks: [
          "I'm Just a Kid",
          "I'd Do Anything",
          "Welcome to My Life",
          "Perfect",
          "Addicted",
          "Untitled (How Could This Happen to Me)",
          "Shut Up!",
          "Crazy",
          "When I'm Gone",
          "Jet Lag",
        ],
      },
    ],
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export function Music() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playingAlbumId, setPlayingAlbumId] = useState<string | null>(null);
  const artist = MUSIC_LIBRARY[selectedIndex];

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        background: "var(--win95-chrome)",
        fontFamily: "var(--win95-font)",
        fontSize: "var(--win95-font-size)",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Left panel — artist list */}
        <div
          style={{
            width: 200,
            minWidth: 200,
            borderRight: "2px solid var(--win95-border-dark)",
            background: "var(--win95-window-bg)",
            overflowY: "auto",
            borderTop: "1px solid var(--win95-border-darkest)",
            borderLeft: "1px solid var(--win95-border-darkest)",
            borderBottom: "1px solid var(--win95-border-light)",
          }}
        >
          <div
            style={{
              padding: "4px 8px",
              background: "var(--win95-chrome)",
              borderBottom: "1px solid var(--win95-border-dark)",
              fontWeight: 700,
              fontSize: 11,
            }}
          >
            Artists
          </div>
          {MUSIC_LIBRARY.map((a, i) => (
            <div
              key={a.name}
              onClick={() => setSelectedIndex(i)}
              style={{
                padding: "4px 8px",
                cursor: "pointer",
                background:
                  i === selectedIndex
                    ? "var(--win95-titlebar-active)"
                    : "transparent",
                color:
                  i === selectedIndex ? "#fff" : "var(--win95-text)",
                display: "flex",
                alignItems: "center",
                gap: 6,
                userSelect: "none",
              }}
            >
              <span style={{ fontSize: 12 }}>&#9835;</span>
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {a.name}
              </span>
            </div>
          ))}
        </div>

        {/* Right panel — albums & tracks */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            background: "var(--win95-window-bg)",
            padding: 0,
          }}
        >
          {/* Artist header */}
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "2px solid var(--win95-border-dark)",
              background: "var(--win95-chrome)",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 700,
                color: "var(--win95-text)",
              }}
            >
              {artist.name}
            </h2>
            <span
              style={{ fontSize: 11, color: "var(--win95-text-disabled)" }}
            >
              {artist.albums.length} album
              {artist.albums.length !== 1 ? "s" : ""} &middot;{" "}
              {artist.albums.reduce((sum, a) => sum + a.tracks.length, 0)}{" "}
              tracks
            </span>
          </div>

          {/* Albums */}
          {artist.albums.map((album) => (
            <div
              key={album.title}
              style={{ borderBottom: "1px solid var(--win95-border-dark)" }}
            >
              {/* Album header */}
              <div
                style={{
                  padding: "8px 16px",
                  background: "var(--win95-chrome)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ fontWeight: 700, fontSize: 13 }}>
                  &#128191; {album.title}
                </span>
                {album.year > 0 && (
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--win95-text-disabled)",
                    }}
                  >
                    ({album.year})
                  </span>
                )}
                {album.spotifyId && (
                  <button
                    onClick={() =>
                      setPlayingAlbumId(
                        playingAlbumId === album.spotifyId
                          ? null
                          : album.spotifyId!
                      )
                    }
                    style={{
                      marginLeft: "auto",
                      background:
                        playingAlbumId === album.spotifyId
                          ? "#1DB954"
                          : "var(--win95-chrome)",
                      color:
                        playingAlbumId === album.spotifyId
                          ? "#fff"
                          : "var(--win95-text)",
                      border:
                        playingAlbumId === album.spotifyId
                          ? "none"
                          : "2px outset var(--win95-border-light)",
                      padding: "2px 8px",
                      fontSize: 11,
                      cursor: "pointer",
                      fontFamily: "var(--win95-font)",
                      borderRadius: 0,
                    }}
                  >
                    {playingAlbumId === album.spotifyId
                      ? "&#9632; Stop"
                      : "&#9654; Play"}
                  </button>
                )}
              </div>

              {/* Track list */}
              <div style={{ padding: "4px 0" }}>
                {album.tracks.map((track, j) => (
                  <div
                    key={j}
                    style={{
                      padding: "2px 16px 2px 24px",
                      display: "flex",
                      gap: 8,
                      fontSize: 12,
                      lineHeight: "20px",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--win95-text-disabled)",
                        minWidth: 20,
                        textAlign: "right",
                      }}
                    >
                      {j + 1}.
                    </span>
                    <span style={{ color: "var(--win95-text)" }}>
                      {track}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spotify player bar */}
      {playingAlbumId && (
        <div
          style={{
            borderTop: "2px solid var(--win95-border-dark)",
            background: "var(--win95-chrome)",
            flexShrink: 0,
          }}
        >
          <iframe
            src={`https://open.spotify.com/embed/album/${playingAlbumId}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ display: "block" }}
          />
        </div>
      )}
    </div>
  );
}
