/* =========================
   STORY DATABASE
========================= */
const stories = [

    {
        id: 1,

        title: "The Last Guardian",

        author: "Alex Stone",

        genre: "Fantasy",

        rating: 4.8,

        cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",

        description:
            "A young warrior discovers a forgotten power buried within an ancient kingdom.",

        chapters: [

            {
                title: "Chapter One: The Awakening",

                content: `
The wind moved through the ancient forest.

Kai stood beneath the enormous trees,
staring at the strange light in the distance.

He had heard stories about this forest
since he was a child.

Nobody who entered it ever returned.

Yet tonight, something was calling him.

Kai took a step forward.

Then another.

The forest suddenly became silent.

Something had awakened.
`
            },


            {
                title: "Chapter Two: The Ancient Door",

                content: `
Kai discovered a massive stone door
hidden beneath the roots of an ancient tree.

Strange symbols covered its surface.

When he touched the door,
the symbols began to glow.

A voice echoed through the darkness.

"Guardian..."

Kai stepped backward.

The door began to open.
`
            },


            {
                title: "Chapter Three: The Guardian",

                content: `
The chamber beyond the door
was larger than Kai expected.

At its center stood an enormous statue.

The statue opened its eyes.

"You have returned."

Kai froze.

"I have never been here before."

The guardian smiled.

"Not in this lifetime."
`
            }

        ]

    },


    {
        id: 2,

        title: "Beyond the Stars",

        author: "Maya Rivers",

        genre: "Adventure",

        rating: 4.7,

        cover: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",

        description:
            "A mysterious signal from space changes everything.",

        chapters: [

            {
                title: "Chapter One: The Signal",

                content: `
At exactly 2:17 in the morning,
the radio telescope detected something.

It wasn't noise.

It wasn't a natural signal.

Someone was transmitting from beyond the stars.

And they were sending coordinates.
`
            },


            {
                title: "Chapter Two: The Coordinates",

                content: `
The coordinates pointed toward a region
of space that should have been empty.

Maya stared at the screen.

Then the telescope received another message.

This time there were only three words.

"WE FOUND YOU."
`
            }

        ]

    },


    {
        id: 3,

        title: "Shadow Hunter",

        author: "Daniel Cole",

        genre: "Action",

        rating: 4.9,

        cover: "https://images.unsplash.com/photo-1511497584788-876760111969",

        description:
            "A mysterious hunter protects a city from creatures hiding in the darkness.",

        chapters: [

            {
                title: "Chapter One: The Hunt",

                content: `
The city never truly slept.

Beneath the bright lights,
something else moved through the streets.

Daniel watched from the rooftop.

His target had arrived.

The hunt had begun.
`
            }

        ]

    }

];




/* =========================
   DISPLAY STORIES
========================= */

function displayStories(list = stories) {

    const container =
        document.getElementById("storyContainer");

    if (!container) return;


    container.innerHTML = "";


    if (list.length === 0) {

        container.innerHTML =
            "<p>No stories found.</p>";

        return;

    }


    list.forEach(story => {

        const card = document.createElement("div");

        card.className = "story-card";


        card.innerHTML = `

            <div class="story-cover">
                📖
            </div>

            <div class="story-info">

                <h3>
                    ${story.title}
                </h3>

                <p>
                    By ${story.author}
                </p>

                <p>
                    ${story.genre}
                </p>

                <p>
                    ${story.description}
                </p>

                <a
                    class="read-button"
                    href="story-details.html?id=${story.id}"
                >
                    Read Story
                </a>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================
   SEARCH
========================= */

function searchStories() {

    const input =
        document.getElementById("searchInput");

    const query =
        input.value.toLowerCase().trim();


    const results = stories.filter(story =>

        story.title
            .toLowerCase()
            .includes(query)

        ||

        story.author
            .toLowerCase()
            .includes(query)

        ||

        story.genre
            .toLowerCase()
            .includes(query)

    );


    displayStories(results);

}


/* =========================
   GENRE FILTER
========================= */

function filterGenre(genre) {

    if (genre === "All") {

        displayStories();

        return;

    }


    const results =
        stories.filter(story =>
            story.genre === genre
        );


    displayStories(results);

}


/* =========================
   OPEN STORY
========================= */

let currentStory = null;

let currentChapter = 0;




    showChapter();




/* =========================
   SHOW CHAPTER
========================= */

function showChapter() {

    if (!currentStory) return;


    const chapter =
        currentStory.chapters[currentChapter];


    document.getElementById(
        "chapterTitle"
    ).textContent =
        chapter.title;


    document.getElementById(
        "chapterNumber"
    ).textContent =
        `Chapter ${currentChapter + 1}
         of ${currentStory.chapters.length}`;


    document.getElementById(
        "storyContent"
    ).innerHTML =
        chapter.content
            .replace(/\n/g, "<br><br>");


    const progress =
        (
            (currentChapter + 1) /
            currentStory.chapters.length
        ) * 100;


    document.getElementById(
        "progressBar"
    ).style.width =
        progress + "%";

}


/* =========================
   NEXT CHAPTER
========================= */

function nextChapter() {

    if (!currentStory) return;


    if (
        currentChapter <
        currentStory.chapters.length - 1
    ) {

        currentChapter++;

        showChapter();

    } else {

        alert(
            "You have reached the end of this story."
        );

    }

}


/* =========================
   PREVIOUS CHAPTER
========================= */

function previousChapter() {

    if (!currentStory) return;


    if (currentChapter > 0) {

        currentChapter--;

        showChapter();

    }

}


/* =========================
   PUBLISH STORY
========================= */

function publishStory(event) {

    event.preventDefault();


    const title =
        document.getElementById(
            "publishTitle"
        ).value;


    const author =
        document.getElementById(
            "publishAuthor"
        ).value;


    const genre =
        document.getElementById(
            "publishGenre"
        ).value;


    alert(
        `Your story "${title}" has been submitted!`
    );


    console.log({

        title,
        author,
        genre

    });

}


/* =========================
   PAGE INITIALIZATION
========================= */

if (
    document.getElementById(
        "storyContainer"
    )
) {

    displayStories();

}


if (
    document.getElementById(
        "storyTitle"
    )
) {

    loadStory();

}
function loadStoryDetails() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        Number(params.get("id"));


    const story =
        stories.find(
            story => story.id === id
        );


    if (!story) {

        document.body.innerHTML =
            "<h1>Story not found.</h1>";

        return;

    }


    document.getElementById(
        "detailsTitle"
    ).textContent = story.title;


    document.getElementById(
        "detailsAuthor"
    ).textContent =
        "By " + story.author;


    document.getElementById(
        "detailsGenre"
    ).textContent =
        story.genre;


    document.getElementById(
        "detailsDescription"
    ).textContent =
        story.description;


    document.getElementById(
        "chapterCount"
    ).textContent =
        story.chapters.length;


    document.getElementById(
        "storyRating"
    ).textContent =
        story.rating;


    document.getElementById(
        "detailsCover"
    ).style.backgroundImage =
        `url("${story.cover}")`;


    document.getElementById(
        "startReading"
    ).href =
        `story.html?id=${story.id}`;


    const chapterList =
        document.getElementById(
            "chapterList"
        );


    chapterList.innerHTML = "";


    story.chapters.forEach(
        (chapter, index) => {

            const chapterItem =
                document.createElement("div");


            chapterItem.className =
                "chapter-item";


            chapterItem.innerHTML = `

                <a href="story.html?id=${story.id}&chapter=${index}">

                    <span>
                        Chapter ${index + 1}
                    </span>

                    <strong>
                        ${chapter.title}
                    </strong>

                    <span>
                        →
                    </span>

                </a>

            `;


            chapterList.appendChild(
                chapterItem
            );

        }
    );

}
function loadStory() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        Number(params.get("id"));


    currentStory =
        stories.find(
            story => story.id === id
        );


    if (!currentStory) {

        document.getElementById(
            "storyTitle"
        ).textContent =
            "Story not found.";

        return;

    }


    currentChapter =
        Number(params.get("chapter")) || 0;


    if (
        currentChapter < 0 ||
        currentChapter >=
        currentStory.chapters.length
    ) {

        currentChapter = 0;

    }


    document.getElementById(
        "storyTitle"
    ).textContent =
        currentStory.title;


    document.getElementById(
        "storyAuthor"
    ).textContent =
        "By " + currentStory.author;


    document.getElementById(
        "storyGenre"
    ).textContent =
        currentStory.genre;


    showChapter();

}
function bookmarkStory() {

    if (!currentStory) {

        const params =
            new URLSearchParams(
                window.location.search
            );

        const id =
            Number(params.get("id"));

        currentStory =
            stories.find(
                story => story.id === id
            );

    }


    if (!currentStory) return;


    let bookmarks =
        JSON.parse(
            localStorage.getItem(
                "bookmarks"
            )
        ) || [];


    if (
        bookmarks.includes(
            currentStory.id
        )
    ) {

        bookmarks =
            bookmarks.filter(
                id => id !== currentStory.id
            );

        alert("Removed from bookmarks.");

    } else {

        bookmarks.push(
            currentStory.id
        );

        alert("Story bookmarked! 🔖");

    }


    localStorage.setItem(
        "bookmarks",
        JSON.stringify(bookmarks)
    );

}
function downloadStory() {

    if (!currentStory) return;


    let text =
        currentStory.title +
        "\n\n";


    text +=
        "By " +
        currentStory.author +
        "\n\n";


    text +=
        currentStory.description +
        "\n\n";


    currentStory.chapters.forEach(
        chapter => {

            text +=
                "\n\n" +
                chapter.title +
                "\n\n";

            text +=
                chapter.content;

        }
    );


    const blob =
        new Blob(
            [text],
            {
                type: "text/plain"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;


    link.download =
        currentStory.title +
        ".txt";


    link.click();


    URL.revokeObjectURL(url);

}
if (
    document.getElementById(
        "detailsTitle"
    )
) {

    loadStoryDetails();

}