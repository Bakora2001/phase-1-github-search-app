const form = document.getElementById('github-form');
const userList = document.getElementById('user-list');
const reposList = document.getElementById('repos-list');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchValue = document.getElementById('search').value;
  if (searchValue) {
    const users = await searchUsers(searchValue);
    displayUsers(users);
  }
});

userList.addEventListener('click', async (e) => {
  if (e.target.tagName === 'LI') {
    const username = e.target.dataset.username;
    const repos = await getUserRepos(username);
    displayRepos(repos);
  }
});

async function searchUsers(query) {
  const url = `https://api.github.com/search/users?q=${query}`;
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  const data = await response.json();
  return data.items;
}

async function getUserRepos(username) {
  const url = `https://api.github.com/users/${username}/repos`;
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  const data = await response.json();
  return data;
}

function displayUsers(users) {
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.innerText = user.login;
    li.dataset.username = user.login;
    userList.appendChild(li);
  });
}

function displayRepos(repos) {
  reposList.innerHTML = '';
  repos.forEach(repo => {
    const li = document.createElement('li');
    li.innerText = repo.name;
    reposList.appendChild(li);
  });
}
