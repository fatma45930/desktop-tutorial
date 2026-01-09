const postsDiv = document.getElementById("posts");
const searchInput = document.getElementById("searchInput");
const tagsElements = document.querySelectorAll(".tags span");

let allPosts = [];

const tagsList = [...tagsElements].map((t) => t.innerText.replace("#", ""));

async function loadPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  let posts = await res.json();

  allPosts = posts.map((post) => ({
    ...post,
    tags: getRandomTags(),
  }));

  displayPosts(allPosts);
}

function getRandomTags() {
  let arr = [];
  while (arr.length < 3) {
    let t = tagsList[Math.floor(Math.random() * tagsList.length)];
    if (!arr.includes(t)) arr.push(t);
  }
  return arr;
}

function displayPosts(posts) {
  postsDiv.innerHTML = "";
  posts.slice(0, 20).forEach((post) => {
    postsDiv.innerHTML += `
      <div class="post">
        <h4>${post.title}</h4>
        <p>${post.body}</p>
      
          👍 ${Math.floor(Math.random() * 500)} &nbsp;
          ❤️ ${Math.floor(Math.random() * 300)} &nbsp;
          💬 ${Math.floor(Math.random() * 50)}
        </div>
      </div>
    `;
  });
}
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  displayPosts(
    allPosts.filter((p) => p.title.includes(value) || p.body.includes(value))
  );
});
tagsElements.forEach((tag) => {
  tag.addEventListener("click", () => {
    const tagName = tag.innerText.replace("#", "");
    displayPosts(allPosts.filter((p) => p.tags.includes(tagName)));
  });
});

loadPosts();
